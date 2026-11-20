import { artist } from "@/data/artist";
import { seriesList } from "@/data/series";
import type { Artwork, Exhibition, ExhibitionVideo } from "@/data/types";
import type { FaqItem } from "@/data/faq";
import { SITE_URL } from "@/lib/seo";
import { toLang, type Language } from "@/lib/routes";
import { isConfirmed } from "@/lib/artworkText";

// schema.org structured data (JSON-LD). Search engines and AI assistants read
// this to know *what* each page is without guessing from the layout: who made
// a work, in what medium, how big, and whether it can be acquired.
//
// Facts here come only from data/artist.ts and data/artworks.ts — never
// invent values. There is deliberately NO price anywhere: works are quoted
// personally, so availability points to the contact form instead.
//
// Every builder takes the page language: names, descriptions, `inLanguage` and
// URLs follow it (the Spanish output is the canonical one and stays as is).

export const ARTIST_ID = `${SITE_URL}/#artista`;

const abs = (path: string) => `${SITE_URL}${path}`;

// Many catalogue pieces still carry the placeholder "Técnica por confirmar" /
// "por confirmar" (see PROYECTO.md). Never publish that as a fact in the
// structured data: an unconfirmed field is simply left out. (Shared helper in
// lib/artworkText.ts so alt text and meta descriptions follow the same rule.)

export const WEBSITE_ID = `${SITE_URL}/#sitio`;

// The 2010 monograph on the artist (UANL / Fondo Editorial de Nuevo León).
export const ARTIST_BOOK = {
  "@type": "Book",
  name: "Segundo Planes",
  datePublished: "2010",
  publisher: [
    { "@type": "Organization", name: "Universidad Autónoma de Nuevo León" },
    { "@type": "Organization", name: "Fondo Editorial de Nuevo León" },
  ],
  url: "https://fondoeditorialnl.gob.mx/newsite2023/pdfs/planessegundo.pdf",
} as const;

// JSON-LD sits inside a <script>; escape "<" so a title can never close it.
export const toJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const other = (lang: Language): Language => (lang === "es" ? "en" : "es");

// Site-wide identity of the artist. Birth data and schooling are taken
// verbatim from the biography in data/artist.ts. One @id in both languages.
export function artistJsonLd(lang: Language) {
  const es = lang === "es";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ARTIST_ID,
    name: artist.name,
    url: SITE_URL,
    jobTitle: es ? "Artista plástico" : "Visual artist",
    description: artist.shortBio[lang],
    image: abs(artist.heroImage),
    birthDate: "1965-01-18",
    birthPlace: {
      "@type": "Place",
      name: "Pinar del Río, Cuba",
    },
    nationality: { "@type": "Country", name: "Cuba" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: es ? "Instituto Superior de Arte (La Habana)" : "Instituto Superior de Arte (Havana)",
    },
    knowsAbout: es
      ? ["Pintura", "Performance", "Arte contemporáneo cubano"]
      : ["Painting", "Performance", "Contemporary Cuban art"],
    sameAs: Object.values(artist.socials).filter(Boolean),
    subjectOf: ARTIST_BOOK,
  };
}

// The site itself, published by the artist. Injected site-wide next to Person.
export function websiteJsonLd(lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: artist.name,
    url: lang === "es" ? SITE_URL : abs("/en"),
    inLanguage: lang,
    publisher: { "@id": ARTIST_ID },
  };
}

// /sobre-mi and /en/about: the page is ABOUT the artist (Person above).
export function profilePageJsonLd(lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: abs(toLang("/sobre-mi", lang)),
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": ARTIST_ID },
  };
}

// A content page about the artist (press, thematic pages).
export function aboutArtistPageJsonLd(
  type: "CollectionPage" | "WebPage",
  esPath: string,
  name: string,
  description: string,
  lang: Language
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: abs(toLang(esPath, lang)),
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ARTIST_ID },
  };
}

// One artwork page. `creator` points at the Person above by @id so the work
// and the artist are linked as a single entity graph.
// `visualDescription`: the approved description of the piece, passed ONLY when
// the page also shows it as visible text (preview flag on).
export function artworkJsonLd(artwork: Artwork, lang: Language, visualDescription?: string) {
  const series = seriesList.find((s) => s.id === artwork.seriesId);
  const url = abs(toLang(`/obra/${artwork.id}`, lang));
  const images = [artwork.image, ...(artwork.additionalImages ?? [])].map(abs);
  const dims = artwork.realDimensionsCm;
  const mediumKnown = isConfirmed(artwork.medium[lang]);
  const dimensionsKnown = isConfirmed(artwork.dimensions[lang]);
  const otherTitle = artwork.title[other(lang)];

  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "@id": `${url}#obra`,
    name: artwork.title[lang],
    alternateName: otherTitle !== artwork.title[lang] ? otherTitle : undefined,
    url,
    image: images,
    creator: { "@id": ARTIST_ID },
    dateCreated: artwork.year ? String(artwork.year) : undefined,
    artMedium: mediumKnown ? artwork.medium[lang] : undefined,
    artform: mediumKnown ? (lang === "es" ? "Pintura" : "Painting") : undefined,
    width: dims
      ? { "@type": "QuantitativeValue", value: dims.width, unitCode: "CMT" }
      : undefined,
    height: dims
      ? { "@type": "QuantitativeValue", value: dims.height, unitCode: "CMT" }
      : undefined,
    description:
      visualDescription ||
      [
        mediumKnown ? artwork.medium[lang] : null,
        artwork.year ? String(artwork.year) : null,
        dimensionsKnown ? artwork.dimensions[lang] : null,
      ]
        .filter(Boolean)
        .join(", ") || undefined,
    isPartOf: series
      ? { "@type": "CreativeWorkSeries", name: series.name[lang] }
      : undefined,
    inLanguage: lang,
    // No price on purpose: acquisition goes through the contact form.
    offers:
      artwork.status === "sold"
        ? {
            "@type": "Offer",
            availability: "https://schema.org/SoldOut",
          }
        : {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: abs(toLang("/contacto", lang)),
          },
  };
}

// Breadcrumb trail shown by Google under the result: Inicio › Obra › <title>.
// The caller passes names and paths already in the page's language.
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

// Preguntas y respuestas de /sobre-mi. Debe coincidir 1:1 con el texto visible
// de la página (data/faq.ts), o Google lo ignora.
export function faqJsonLd(items: FaqItem[], lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q[lang],
      acceptedAnswer: { "@type": "Answer", text: item.a[lang] },
    })),
  };
}

// "2:12" / "1:02:03" -> ISO 8601 duration ("PT2M12S") as schema.org expects.
function isoDuration(text: string): string | undefined {
  const parts = text.split(":").map(Number);
  if (parts.some((n) => Number.isNaN(n)) || parts.length < 2 || parts.length > 3) {
    return undefined;
  }
  const [h, m, sec] = parts.length === 3 ? parts : [0, parts[0], parts[1]];
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${sec ? `${sec}S` : ""}` || undefined;
}

// One exhibition page. Dates in the data are years only ("2024"), which is a
// valid partial ISO date, so startDate is published exactly as recorded — no
// invented day or month. The venue string is used verbatim as the place.
export function exhibitionJsonLd(exhibition: Exhibition, image: string | undefined, lang: Language) {
  const url = abs(toLang(`/exposiciones/${exhibition.id}`, lang));
  return {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "@id": `${url}#exposicion`,
    name: exhibition.title[lang],
    description: exhibition.description[lang],
    url,
    startDate: exhibition.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: exhibition.venue,
      address: exhibition.venue,
    },
    image: image ? abs(image) : undefined,
    performer: { "@id": ARTIST_ID },
    organizer: { "@id": ARTIST_ID },
    inLanguage: lang,
  };
}

// The /videos list as an ItemList of VideoObjects. `uploadDate` is left out on
// purpose: the data only records the year of the show, not when the file was
// published, and we never publish a guessed date.
export function videosJsonLd(items: ExhibitionVideo[], lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((video, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: video.title[lang],
        description: `${video.title[lang]}. ${video.venue}, ${video.date}.`,
        thumbnailUrl: video.poster ? abs(video.poster) : undefined,
        contentUrl: abs(video.src),
        duration: video.duration ? isoDuration(video.duration) : undefined,
        dateCreated: video.date,
        creator: { "@id": ARTIST_ID },
        inLanguage: lang,
      },
    })),
  };
}
