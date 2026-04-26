# Oscar Marín — Portfolio

Personal portfolio website of **Oscar Marín** — Full Stack Engineer with 4+ years shipping production software.

> The full project plan lives in a private local document. This README documents only how to run and develop the codebase.

---

## Stack

- **[Astro](https://astro.build/)** — main framework, static output, zero JS by default
- **[Tailwind CSS v4](https://tailwindcss.com/)** — utility-first styles with CSS-first configuration via `@theme`
- **TypeScript** — type safety across content data files
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** — automatic sitemap generation
- **Vercel** — static hosting with deploys triggered from GitHub

## Project structure

```
.
├── public/                    # Static assets (CV, OG image, favicon, robots.txt)
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── sections/         # Hero, About, Work, Experience, Contact
│   │   └── ui/               # ProjectCard, SkillTag, TimelineItem, LangToggle, Localized
│   ├── data/
│   │   ├── i18n.ts           # UI strings EN/ES + personal info + stack
│   │   ├── projects.ts       # Bilingual project data
│   │   └── experience.ts     # Bilingual experience data
│   ├── layouts/
│   │   └── BaseLayout.astro  # Meta tags, Open Graph, fonts, scroll-reveal
│   ├── pages/
│   │   └── index.astro       # Single page — mounts every section
│   └── styles/
│       └── global.css        # Tailwind v4 + design tokens (@theme)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

**Principle:** All textual content lives in `src/data/`. To update the portfolio (new project, bio change, translation tweak) you edit those files only — no component changes required.

> Note: the original plan refers to `src/content/`. We renamed it to `src/data/` because `src/content/` collides with the Astro Content Collections convention (which we don't use here — these are plain TS modules, not collections).

## Development

Requires Node.js 20+ (22 recommended — see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output in ./dist
npm run preview      # serve the local build
npm run check        # type-check with astro check
```

## Required public assets

Anything inside `public/` is copied verbatim to the site root at build time. The following files must exist before launch:

| File | Purpose |
|---|---|
| `cv-oscar-marin-en.pdf` | English CV — downloaded from Hero / Contact when the active language is EN |
| `cv-oscar-marin-es.pdf` | Spanish CV — downloaded from Hero / Contact when the active language is ES |
| `og-image.png` | Open Graph preview (1200×630) — used in LinkedIn / Twitter shares |
| `favicon.svg` | Site favicon (placeholder included — replace with the final design) |

`robots.txt` is already in place and references the auto-generated `sitemap-index.xml`.

## i18n EN / ES

The portfolio renders both languages as static HTML. An attribute on `<html data-lang="...">` controls which one is visible via CSS:

```css
html[data-lang="en"] [data-l="es"],
html[data-lang="es"] [data-l="en"] { display: none !important; }
```

`LangToggle` flips that attribute, persists the choice in `localStorage`, and dispatches a `lang:change` event so dynamic elements (e.g. the CV download `href`) can react. No component hydration involved.

To add or edit text:

- **UI strings** → `src/data/i18n.ts`
- **Projects** → `src/data/projects.ts`
- **Work experience** → `src/data/experience.ts`

## Design tokens

Defined in `src/styles/global.css` via Tailwind v4's `@theme` directive — neutral palette, two type weights (Geist 400 / 500), card radius, shadows, and animations.

## Deploy

Vercel auto-detects the Astro project:

1. Connect the repository on [vercel.com](https://vercel.com).
2. Framework Preset → **Astro**.
3. Build command: `npm run build` (default).
4. Output directory: `dist` (default).
5. Connect the custom domain (`oscarmarin.dev` planned).

## Roadmap

This base completes **Phase 1** (setup, structure, content, i18n, layouts, and skeleton sections). Next: polish styles, add animations, and ship real assets (CV PDFs + OG image).

## Contact

- 📧 [marinmolinao@gmail.com](mailto:marinmolinao@gmail.com)
- 💼 [linkedin.com/in/oscar-marin-molina](https://www.linkedin.com/in/oscar-marin-molina)
- 🐙 [github.com/marin1321](https://github.com/marin1321)
