"use client";

import FeaturedCarousel from "@/components/FeaturedCarousel";
import { artworks } from "@/data/artworks";
import { featuredExtra } from "@/data/featuredExtra";
import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

// Lead card of the carousel: the full-room shot of the 2015 "Ecua-error"
// polyptych (the four panels obra-51..54 hung together, with the artist in
// frame). It is NOT a catalogue piece — `featuredOnly` makes the carousel
// render it as a plain, non-clickable figure and keeps it out of /obra.
// Photo source: data/exhibitionGalleries.ts["exp-10"] item 02. Added
// 2026-09-06 at the user's request to open the carousel more strikingly.
const POLYPTYCH_LEAD: Artwork = {
  id: "featured-ecua-error-politico",
  title: { es: "Ecua-error (políptico)", en: "Ecua-error (polyptych)" },
  year: 2015,
  medium: { es: "Acrílico y óleo sobre lienzo", en: "Acrylic and oil on canvas" },
  dimensions: { es: "300 × 1460 cm", en: "300 × 1460 cm" },
  image: "/images/featured/ecua-error-politico.jpg",
  seriesId: "serie-obras-2008-2015",
  status: "inquire",
  featuredOnly: true,
};

// The four polyptych panels, pulled to the front of the carousel in this
// exact order. This ordering lives ONLY here — data/artworks.ts keeps its
// original order so the /obra catalogue mosaic is unaffected (per the
// user's 2026-09-06 correction).
const LEAD_PANEL_IDS = ["obra-51", "obra-52", "obra-53", "obra-54"];

export default function FeaturedWorks() {
  const { t } = useLanguage();
  // Featured spotlights all real artwork photography; placeholder pieces
  // (Interiores/Derivas SVGs) stay out of the curated carousel — they still
  // appear in the full catalog at /obra. This used to break drag/click
  // navigation once the catalog grew past ~120 real pieces, because each
  // card resized itself the instant its image finished loading, shifting
  // the layout under the cursor mid-click. Fixed in FeaturedCarousel by
  // giving every card a fixed-size box (object-contain) so nothing moves
  // once the page has rendered, regardless of how many cards there are.
  //
  // Carousel order: polyptych room-shot, then the four panels in
  // LEAD_PANEL_IDS order, then every other real artwork in catalogue
  // order, then the E:\adicional batch (data/featuredExtra.ts, already in
  // its final reversed order). Reordering happens here so data/artworks.ts
  // (and the /obra mosaic that reads it) stays in its original order, and
  // featuredExtra is carousel-only.
  const realArtworks = artworks.filter((artwork) => !artwork.image.includes("placeholder"));
  const leadPanels = LEAD_PANEL_IDS.map((id) =>
    realArtworks.find((artwork) => artwork.id === id)
  ).filter((artwork): artwork is Artwork => Boolean(artwork));
  const rest = realArtworks.filter((artwork) => !LEAD_PANEL_IDS.includes(artwork.id));
  const featured = [POLYPTYCH_LEAD, ...leadPanels, ...rest, ...featuredExtra];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
      <p className="text-xs uppercase tracking-widest text-muted">{t.featured.eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{t.featured.title}</h2>

      {/* Modest gap here — the carousel's own viewport now carries generous
          vertical padding (see FeaturedCarousel) so the focused card can
          scale up without its top reaching the "Obra destacada" heading or
          being clipped. */}
      <div className="mt-6 sm:mt-10">
        <FeaturedCarousel artworks={featured} />
      </div>
    </section>
  );
}
