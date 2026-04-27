/**
 * Accessibility audit runner — axe-core against the local production
 * build.
 *
 * Boots `astro preview` on a free port, opens each target URL in a
 * headless Chrome (reusing the system binary via `chrome-launcher`,
 * already a dev dependency for the Lighthouse audit), runs axe-core
 * via @axe-core/puppeteer, and exits non-zero on any violation rated
 * "serious" or "critical".
 *
 * Lower-severity findings ("minor" / "moderate") are reported but do
 * not fail the build — they're typically false positives on
 * decorative SVGs or theme tokens, and would otherwise force noisy
 * exemption lists in CI.
 *
 * Usage:
 *   npm run audit:a11y
 *   node scripts/a11y.mjs --url=https://oscarmarin.dev   # remote target
 */
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";
import puppeteer from "puppeteer-core";
import { AxePuppeteer } from "@axe-core/puppeteer";
import * as chromeLauncher from "chrome-launcher";

const explicitUrl = process.argv
  .slice(2)
  .find((a) => a.startsWith("--url="))
  ?.slice("--url=".length);

const PREVIEW_PORT = 4328;
const PREVIEW_URL = `http://127.0.0.1:${PREVIEW_PORT}`;
const BASE_URL = explicitUrl ?? PREVIEW_URL;
const usingLocalPreview = !explicitUrl;

/** URLs to audit. Each one renders a distinct template surface — the
 *  home page covers the bulk of the site (hero, about, work, contact),
 *  and the 404 page covers the standalone error template. */
const TARGETS = [
  { name: "home", path: "/" },
  { name: "404", path: "/this-route-does-not-exist" },
];

const FAIL_IMPACTS = new Set(["serious", "critical"]);

function startPreview() {
  return new Promise((resolve, reject) => {
    /* `detached: true` makes the spawned process the leader of a new
     * process group so we can SIGTERM the whole tree later. Without
     * this the npx wrapper swallows the signal and the actual astro/
     * vite child keeps the event loop alive — that's what hung the
     * a11y job on the first CI run. */
    const proc = spawn(
      "npx",
      [
        "astro",
        "preview",
        "--port",
        String(PREVIEW_PORT),
        "--host",
        "127.0.0.1",
      ],
      {
        stdio: ["ignore", "pipe", "pipe"],
        env: process.env,
        detached: true,
      },
    );
    let resolved = false;
    proc.stdout.on("data", (chunk) => {
      if (resolved) return;
      if (chunk.toString().includes(String(PREVIEW_PORT))) {
        resolved = true;
        resolve(proc);
      }
    });
    proc.on("exit", (code) => {
      if (!resolved)
        reject(new Error(`astro preview exited early (${code ?? "?"})`));
    });
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(proc);
      }
    }, 4000);
  });
}

/** Kill the preview's entire process group so the npx wrapper, the
 *  astro CLI and any vite children all go down together. Plain
 *  `proc.kill()` only signals the wrapper. */
function killPreviewTree(proc) {
  if (!proc?.pid) return;
  try {
    process.kill(-proc.pid, "SIGTERM");
  } catch {
    /* group may already be gone */
  }
}

async function waitUntilReady(url, attempts = 30) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      /* Any non-5xx response means the server is up. The 404 path
       * deliberately returns 404, so we treat sub-500 as ready. */
      if (res.status < 500) return;
    } catch {
      /* not yet */
    }
    await wait(250);
  }
  throw new Error(`Preview did not become ready at ${url}`);
}

function formatViolation(v) {
  const lines = [
    `  [${v.impact}] ${v.id} — ${v.help}`,
    `    ${v.helpUrl}`,
  ];
  for (const node of v.nodes) {
    lines.push(`    • ${node.target.join(", ")}`);
    if (node.failureSummary) {
      const indented = node.failureSummary.replace(/\n/g, "\n      ");
      lines.push(`      ${indented}`);
    }
  }
  return lines.join("\n");
}

async function run() {
  let preview;
  if (usingLocalPreview) {
    console.log(`▸ Starting astro preview on ${PREVIEW_URL}`);
    preview = await startPreview();
    await waitUntilReady(PREVIEW_URL);
  }

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`,
    defaultViewport: { width: 1280, height: 800 },
  });

  let blockingTotal = 0;
  let minorTotal = 0;
  const summary = [];

  try {
    for (const target of TARGETS) {
      const url = `${BASE_URL}${target.path}`;
      const page = await browser.newPage();
      try {
        /* Force reduced motion before navigation. The hero's fade-up
         * animation runs for ~700 ms and was confusing axe-core's
         * color-contrast check — at networkidle0, opacity was still
         * ~0.95, blending the foreground with the white background
         * and producing a phantom contrast failure. With reduce-
         * motion the keyframes collapse to ~0 ms (see global.css)
         * and axe samples the final, fully-rendered colors. */
        await page.emulateMediaFeatures([
          { name: "prefers-reduced-motion", value: "reduce" },
        ]);
        console.log(`\n▸ Auditing ${target.name} — ${url}`);
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30_000 });

        /* WCAG 2.1 AA + axe "best-practice" rules — same bar applied
         * everywhere else in the project. */
        const results = await new AxePuppeteer(page)
          .withTags([
            "wcag2a",
            "wcag2aa",
            "wcag21a",
            "wcag21aa",
            "best-practice",
          ])
          .analyze();

        const blocking = results.violations.filter((v) =>
          FAIL_IMPACTS.has(v.impact),
        );
        const minor = results.violations.length - blocking.length;
        blockingTotal += blocking.length;
        minorTotal += minor;

        if (blocking.length === 0 && minor === 0) {
          console.log(`  ✓ no violations`);
        } else {
          for (const v of blocking) console.log(formatViolation(v));
          if (minor > 0) {
            console.log(
              `  ⚠ ${minor} non-blocking finding(s) (minor / moderate):`,
            );
            for (const v of results.violations.filter(
              (vv) => !FAIL_IMPACTS.has(vv.impact),
            )) {
              console.log(formatViolation(v));
            }
          }
        }
        summary.push({ name: target.name, blocking: blocking.length, minor });
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.disconnect();
    await chrome.kill();
    killPreviewTree(preview);
  }

  console.log("\n──────── summary ────────");
  for (const s of summary) {
    console.log(
      `  ${s.name.padEnd(8)} blocking=${s.blocking}  minor=${s.minor}`,
    );
  }
  console.log("─────────────────────────");

  if (blockingTotal > 0) {
    console.error(
      `\n✗ ${blockingTotal} blocking a11y violation(s) — failing build.`,
    );
    process.exit(1);
  }
  console.log(
    `✓ All audited pages pass — 0 blocking, ${minorTotal} non-blocking.`,
  );
}

/* Force exit on success so any leftover handles (chrome-launcher's
 * internal child, the preview process group, the puppeteer
 * connection) don't keep Node alive past the audit. The runner's
 * "Complete job" step reaps any actual orphans. */
run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
