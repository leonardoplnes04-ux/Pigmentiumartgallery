import type { Metadata } from "next";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { seoText, type SectionKey } from "@/data/seoText";
import type { Artwork, Exhibition, Performance } from "@/data/types";
import { SITE_URL } from "@/lib/seo";
import { toLang, type Language } from "@/lib/routes";

// Metadata builders shared by the Spanish routes (app/(es)) and their English
// mirror (app/(en)/en). Server-rendered metadata is fixed per route tree
// ("/" is Spanish, "/en" is English) instead of depending on the browser.

const OG_LOCALE: Record<Language, string> = { es: "es_ES", en: "en_US" };

function ogLocales(lang: Language) {
  const other: Language = lang === "es" ? "en" : "es";
  return { locale: OG_LOCALE[lang], alternateLocale: OG_LOCALE[other] };
}

// Self-referencing canonical plus the reciprocal hreflang pair. "x-default"
// is the Spanish page, the site's original and canonical language.
export function pageAlternates(esPath: string, lang: Language): NonNullable<Metadata["alternates"]> {
  return {
    canonical: toLang(esPath, lang),
    languages: {
      es: toLang(esPath, "es"),
      en: toLang(esPath, "en"),
      "x-default": toLang(esPath, "es"),
    },
  };
}

// Site-wide base metadata for one language. Pages override title/description
// and set their own `alternates`; this carries metadataBase, keywords, the
// default Open Graph/Twitter image and robots.
export function rootMetadata(lang: Language): Metadata {
  const title = seoText.home.title[lang];
  const description = seoText.home.description[lang];

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
      ...ogLocales(lang),
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

const SECTION_PATH: Record<SectionKey, string> = {
  home: "/",
  works: "/obra",
  about: "/sobre-mi",
  exhibitions: "/exposiciones",
  performance: "/performance",
  videos: "/videos",
  contact: "/contacto",
};

// Metadata of a section page. The home inherits its title and description from
// the root layout, so it only declares its alternates.
export function sectionMetadata(key: SectionKey, lang: Language): Metadata {
  const alternates = pageAlternates(SECTION_PATH[key], lang);
  if (key === "home") return { alternates };
  return {
    title: seoText[key].title[lang],
    description: seoText[key].description[lang],
    alternates,
  };
}

function detailMetadata(
  esPath: string,
  lang: Language,
  title: string,
  description: string,
  image: string | undefined
): Metadata {
  return {
    title,
    description,
    alternates: pageAlternates(esPath, lang),
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      ...ogLocales(lang),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function artworkMetadata(artwork: Artwork, lang: Language): Metadata {
  const description = artwork.year
    ? `${artwork.medium[lang]}, ${artwork.year}.`
    : `${artwork.medium[lang]}.`;
  return detailMetadata(
    `/obra/${artwork.id}`,
    lang,
    `${artwork.title[lang]} — ${artist.name}`,
    description,
    artwork.image
  );
}

export function exhibitionMetadata(
  exhibition: Exhibition,
  image: string | undefined,
  lang: Language
): Metadata {
  return detailMetadata(
    `/exposiciones/${exhibition.id}`,
    lang,
    `${exhibition.title[lang]} — ${artist.name}`,
    `${exhibition.venue}, ${exhibition.date}.`,
    image
  );
}

export function performanceMetadata(
  performance: Performance,
  image: string | undefined,
  lang: Language
): Metadata {
  return detailMetadata(
    `/performance/${performance.id}`,
    lang,
    `${performance.title} — ${artist.name}`,
    performance.venue ? `${performance.venue}, ${performance.year}.` : performance.year,
    image
  );
}
