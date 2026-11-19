import { artist } from "@/data/artist";
import { seriesList } from "@/data/series";
import type { Artwork } from "@/data/types";
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
