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
  integrations: [sitemap()],
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
    inlineStylesheets: "auto",
  },
  compressHTML: true,
});
