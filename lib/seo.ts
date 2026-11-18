// Single source of truth for the site's public URL — used by
// app/layout.tsx (metadataBase), app/sitemap.ts, app/robots.ts, and any
// page building absolute/canonical URLs or Open Graph image paths.
// Custom domain (segundoplanes.com) — the *.vercel.app address must never
// be the canonical one, or Google treats it as the "official" site.
export const SITE_URL = "https://segundoplanes.com";
