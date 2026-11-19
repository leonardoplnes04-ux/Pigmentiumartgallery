import { artist } from "@/data/artist";
import { seriesList } from "@/data/series";
import type { Artwork, Exhibition, ExhibitionVideo } from "@/data/types";
import type { FaqItem } from "@/data/faq";
import { SITE_URL } from "@/lib/seo";

// schema.org structured data (JSON-LD). Search engines and AI assistants read
// this to know *what* each page is without guessing from the layout: who made
// a work, in what medium, how big, and whether it can be acquired.
//
// Facts here come only from data/artist.ts and data/artworks.ts — never
// invent values. There is deliberately NO price anywhere: works are quoted
// personally, so availability points to the contact form instead.

export const ARTIST_ID = `${SITE_URL}/#artista`;

const abs = (path: string) => `${SITE_URL}${path}`;

// Many catalogue pieces still carry the placeholder "Técnica por confirmar" /
// "por confirmar" (see PROYECTO.md). Never publish that as a fact in the
// structured data: an unconfirmed field is simply left out.
const isConfirmed = (text: string) => !/por confirmar|to be confirmed/i.test(text);

// JSON-LD sits inside a <script>; escape "<" so a title can never close it.
export const toJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

// Site-wide identity of the artist. Birth data and schooling are taken
// verbatim from the biography in data/artist.ts.
export function artistJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ARTIST_ID,
    name: artist.name,
    url: SITE_URL,
    jobTitle: "Artista plástico",
    description: artist.shortBio.es,
    image: abs(artist.heroImage),
    birthDate: "1965-01-18",
    birthPlace: {
      "@type": "Place",
      name: "Pinar del Río, Cuba",
    },
    nationality: { "@type": "Country", name: "Cuba" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Instituto Superior de Arte (La Habana)",
    },
    knowsAbout: ["Pintura", "Performance", "Arte contemporáneo cubano"],
    sameAs: Object.values(artist.socials).filter(Boolean),
  };
}

// One artwork page. `creator` points at the Person above by @id so the work
// and the artist are linked as a single entity graph.
export function artworkJsonLd(artwork: Artwork) {
  const series = seriesList.find((s) => s.id === artwork.seriesId);
  const url = abs(`/obra/${artwork.id}`);
  const images = [artwork.image, ...(artwork.additionalImages ?? [])].map(abs);
  const dims = artwork.realDimensionsCm;
  const mediumKnown = isConfirmed(artwork.medium.es);
  const dimensionsKnown = isConfirmed(artwork.dimensions.es);

  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "@id": `${url}#obra`,
    name: artwork.title.es,
    alternateName: artwork.title.en !== artwork.title.es ? artwork.title.en : undefined,
    url,
    image: images,
    creator: { "@id": ARTIST_ID },
    dateCreated: artwork.year ? String(artwork.year) : undefined,
    artMedium: mediumKnown ? artwork.medium.es : undefined,
    artform: mediumKnown ? "Pintura" : undefined,
    width: dims
      ? { "@type": "QuantitativeValue", value: dims.width, unitCode: "CMT" }
      : undefined,
    height: dims
      ? { "@type": "QuantitativeValue", value: dims.height, unitCode: "CMT" }
      : undefined,
    description:
      [
        mediumKnown ? artwork.medium.es : null,
        artwork.year ? String(artwork.year) : null,
        dimensionsKnown ? artwork.dimensions.es : null,
      ]
        .filter(Boolean)
        .join(", ") || undefined,
    isPartOf: series
      ? { "@type": "CreativeWorkSeries", name: series.name.es }
      : undefined,
    inLanguage: "es",
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
            url: `${SITE_URL}/contacto`,
          },
  };
}

// Breadcrumb trail shown by Google under the result: Inicio › Obra › <title>.
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
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q.es,
      acceptedAnswer: { "@type": "Answer", text: item.a.es },
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
export function exhibitionJsonLd(exhibition: Exhibition, image?: string) {
  const url = abs(`/exposiciones/${exhibition.id}`);
  return {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "@id": `${url}#exposicion`,
    name: exhibition.title.es,
    description: exhibition.description.es,
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
    inLanguage: "es",
  };
}

// The /videos list as an ItemList of VideoObjects. `uploadDate` is left out on
// purpose: the data only records the year of the show, not when the file was
// published, and we never publish a guessed date.
export function videosJsonLd(items: ExhibitionVideo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((video, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: video.title.es,
        description: `${video.title.es}. ${video.venue}, ${video.date}.`,
        thumbnailUrl: video.poster ? abs(video.poster) : undefined,
        contentUrl: abs(video.src),
        duration: video.duration ? isoDuration(video.duration) : undefined,
        dateCreated: video.date,
        creator: { "@id": ARTIST_ID },
        inLanguage: "es",
      },
    })),
  };
}
