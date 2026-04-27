/**
 * Lighthouse audit runner for the local production build.
 *
 * Builds the site, spins up `astro preview` on a free port, runs
 * Lighthouse against that origin in mobile emulation (the harshest
 * preset and the one Google ranks against), then writes:
 *
 *   lighthouse-report.html  — human-readable report
 *   lighthouse-report.json  — raw report for diffing
 *
 * Both files are gitignored. The script also prints a one-line
 * summary of the four category scores to stdout so CI / agents
 * can read them without parsing the JSON.
 *
 * Usage:
 *   npm run audit
 *   npm run audit -- --url=https://oscarmarin.dev   # remote target
 */
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { setTimeout as wait } from "node:timers/promises";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const explicitUrl = process.argv
  .slice(2)
  .find((a) => a.startsWith("--url="))
  ?.slice("--url=".length);

const PREVIEW_PORT = 4327;
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`;
const TARGET_URL = explicitUrl ?? PREVIEW_URL;

/* When the user passes --url=... we skip the local preview. */
const usingLocalPreview = !explicitUrl;

/** Spawn `astro preview` in the background and resolve once it's
 *  serving requests. Astro v6 uses Vite under the hood; the
 *  "ready in" line only appears on the dev server, not preview, so
 *  we poll the port instead. */
function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      "npx",
      ["astro", "preview", "--port", String(PREVIEW_PORT), "--host", "127.0.0.1"],
      { stdio: ["ignore", "pipe", "pipe"], env: process.env },
    );
    let resolved = false;
    proc.stdout.on("data", (chunk) => {
      if (resolved) return;
      const text = chunk.toString();
      if (text.includes(String(PREVIEW_PORT))) {
        resolved = true;
        resolve(proc);
      }
    });
    proc.on("exit", (code) => {
      if (!resolved) reject(new Error(`astro preview exited early (${code})`));
    });
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(proc);
      }
    }, 4000);
  });
}

async function waitUntilReady(url, attempts = 20) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not yet */
    }
    await wait(250);
  }
  throw new Error(`Preview did not become ready at ${url}`);
}

async function run() {
  let preview;
  if (usingLocalPreview) {
    console.log(`▸ Starting astro preview on ${PREVIEW_URL}`);
    preview = await startPreview();
    await waitUntilReady(PREVIEW_URL);
  }

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });

  try {
    console.log(`▸ Auditing ${TARGET_URL} (mobile, simulated 4G throttling)`);
    const result = await lighthouse(TARGET_URL, {
      port: chrome.port,
      output: ["html", "json"],
      onlyCategories: [
        "performance",
        "accessibility",
        "best-practices",
        "seo",
      ],
      logLevel: "error",
    });

    const [html, json] = result.report;
    await writeFile("lighthouse-report.html", html);
    await writeFile("lighthouse-report.json", json);

    const lhr = result.lhr;
    const scores = {
      performance: lhr.categories.performance.score,
      accessibility: lhr.categories.accessibility.score,
      bestPractices: lhr.categories["best-practices"].score,
      seo: lhr.categories.seo.score,
    };
    const fmt = (n) => (n === null ? "—" : Math.round(n * 100));
    console.log(
      `\n  Performance:    ${fmt(scores.performance)}` +
        `\n  Accessibility:  ${fmt(scores.accessibility)}` +
        `\n  Best practices: ${fmt(scores.bestPractices)}` +
        `\n  SEO:            ${fmt(scores.seo)}\n`,
    );
    console.log("▸ Wrote lighthouse-report.html and lighthouse-report.json");
  } finally {
    await chrome.kill();
    if (preview) preview.kill("SIGTERM");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
