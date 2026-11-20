// Preview flag for the SEO/AI work (branch seo-ia-2026-11). Everything that
// changes what a visitor SEES (new paragraphs, buttons, footer links, new
// pages) is gated behind it, so with the flag off the site looks exactly as
// before. Invisible improvements (metadata, JSON-LD, alt, sitemap, robots)
// don't use it.
//
// Turn it on locally with NEXT_PUBLIC_SEO_PREVIEW=1 in .env.local. It is a
// NEXT_PUBLIC_ variable, so it is inlined at build time on server and client.
export const SEO_PREVIEW = process.env.NEXT_PUBLIC_SEO_PREVIEW === "1";

// `next dev` (not `next build`/`next start`).
export const IS_DEV = process.env.NODE_ENV !== "production";
