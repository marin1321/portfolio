/**
 * scripts/build-assets.mjs
 *
 * Generates the project's raster icon and Open Graph PNGs from the SVG
 * sources in `src/assets/`. Designed to be run on demand (not during
 * `astro build`) — re-run only when the source SVGs change.
 *
 * Outputs:
 *   public/apple-touch-icon.png  180x180   — iOS home screen
 *   public/icon-192.png          192x192   — PWA manifest
 *   public/icon-512.png          512x512   — PWA manifest (largest)
 *   public/icon-mask.png         512x512   — Maskable PWA icon (with safe area)
 *   public/og-image.png          1200x630  — Open Graph / Twitter card image
 *
 * Run with: `npm run build:assets`
 */
import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const assetsDir = resolve(projectRoot, "src/assets");
const publicDir = resolve(projectRoot, "public");

/** Renders an SVG buffer at a given square size and writes it as PNG. */
async function renderIcon(svg, size, outFile) {
  const out = resolve(publicDir, outFile);
  await sharp(svg, { density: Math.ceil((size / 32) * 96) })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✓ ${outFile} (${size}x${size})`);
}

/** Renders the OG image at its native 1200x630 ratio. */
async function renderOg(svg) {
  const out = resolve(publicDir, "og-image.png");
  await sharp(svg, { density: 96 })
    .resize(1200, 630, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✓ og-image.png (1200x630)`);
}

/** Wraps an SVG in a maskable safe area (centers the icon at 80% scale). */
function buildMaskableSvg(rawSvg) {
  const inner = rawSvg.toString().replace(/<\?xml[^?]*\?>/, "").trim();
  return Buffer.from(
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#18181b" />
  <g transform="translate(51.2, 51.2) scale(0.8)">${inner}</g>
</svg>`,
    "utf-8",
  );
}

await mkdir(publicDir, { recursive: true });

const iconSvg = await readFile(resolve(assetsDir, "icon-source.svg"));
const ogSvg = await readFile(resolve(assetsDir, "og-source.svg"));

await renderIcon(iconSvg, 180, "apple-touch-icon.png");
await renderIcon(iconSvg, 192, "icon-192.png");
await renderIcon(iconSvg, 512, "icon-512.png");
await renderIcon(buildMaskableSvg(iconSvg), 512, "icon-mask.png");
await renderOg(ogSvg);

console.log("\nDone. Assets written to public/.");
