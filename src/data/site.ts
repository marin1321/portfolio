/**
 * Site-level configuration sourced from environment variables.
 *
 * Build-time only — Astro inlines `import.meta.env.PUBLIC_*` values
 * into the static bundle, so anything declared here ends up in the
 * shipped JS. That's fine for the values below (Formspree
 * endpoints are public by design); never put secrets in this file.
 */

/**
 * Formspree endpoint URL for the contact form (RF-11).
 *
 * When unset, the form gracefully degrades to a `mailto:` action so
 * the section is functional even before a real endpoint is wired —
 * useful for local development and for the first deploy. Configure
 * it via `PUBLIC_FORMSPREE_ENDPOINT` in `.env` or the deploy
 * platform (e.g. Vercel project settings → Environment variables).
 *
 * Example: `PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcd1234`
 */
const rawEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;
export const formspreeEndpoint: string | null =
  typeof rawEndpoint === "string" && rawEndpoint.trim().length > 0
    ? rawEndpoint.trim()
    : null;
