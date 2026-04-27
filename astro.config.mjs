// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/** @param {string} p */
const r = (p) => fileURLToPath(new URL(p, import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://oscarmarin.dev",
  output: "static",
  integrations: [
    sitemap({
      // Single-page portfolio: keep refresh hints conservative and give
      // the home page full priority. The same URL serves both languages
      // via the client-side toggle, so no per-locale entries are needed.
      changefreq: "monthly",
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],
  vite: {
    // Cast: Vite types from Astro and the root resolution disagree.
    plugins: [/** @type {any} */ (tailwindcss())],
    server: {
      // Allow ngrok tunnels (and similar) when previewing the dev server
      // on an external host. Leading dot acts as a wildcard for subdomains.
      allowedHosts: [".ngrok-free.app", ".ngrok.io", ".ngrok.app"],
    },
    resolve: /** @type {any} */ ({
      // `tsconfigPaths: false` works around a current bug between
      // @tailwindcss/vite and Rolldown's resolver ("Missing field
      // `tsconfigPaths`"). Once the Tailwind fix (PR #19803) lands we
      // can drop this. Meanwhile we mirror the tsconfig paths as
      // explicit Vite aliases below.
      tsconfigPaths: false,
      alias: {
        "@": r("./src"),
        "@components": r("./src/components"),
        "@data": r("./src/data"),
        "@layouts": r("./src/layouts"),
        "@styles": r("./src/styles"),
      },
    }),
  },
  build: {
    // Inline the CSS bundle into the HTML head to eliminate the
    // render-blocking <link rel="stylesheet"> request. The bundle is
    // ~35 KB raw / 7 KB gzip — small enough that the round-trip cost
    // outweighs the second-visit cache benefit, and Lighthouse flags
    // it as the only render-blocking resource on the page.
    inlineStylesheets: "always",
  },
  compressHTML: true,
});
