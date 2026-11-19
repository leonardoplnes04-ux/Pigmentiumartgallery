import type { Metadata } from "next";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/seo";
import type { Language } from "@/lib/routes";

// Site-wide metadata for one language. Pages override title/description and
// set their own `alternates` (canonical + hreflang); this is only the base:
// metadataBase, keywords, default Open Graph/Twitter image and robots.
//
// Server-rendered metadata is now fixed per route tree (/ is Spanish, /en is
// English) instead of depending on the visitor's browser.
export function rootMetadata(lang: Language): Metadata {
  const title =
    lang === "es"
      ? `${artist.name} — Artista plástico cubano`
      : `${artist.name} — Cuban visual artist`;
  const description = `${artist.shortBio[lang]} ${artist.tagline[lang]}.`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    // "Segundo Planes" is the name people will actually search — keep it
    // as the first, most specific keyword.
    keywords:
      lang === "es"
        ? [
            artist.name,
            "Segundo Planes artista",
            "Segundo Planes pintor",
            site.name,
            "arte contemporáneo",
            "galería de arte",
          ]
        : [
            artist.name,
            "Segundo Planes artist",
            "Segundo Planes painter",
            site.name,
            "contemporary art",
            "Cuban art",
            "art gallery",
          ],
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: site.name,
      title,
      description,
      images: [{ url: artist.heroImage }],
      locale: lang === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [artist.heroImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
