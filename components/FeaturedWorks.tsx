"use client";

import FeaturedCarousel from "@/components/FeaturedCarousel";
import { artworks } from "@/data/artworks";
import { useLanguage } from "@/hooks/useLanguage";

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
  const featured = artworks.filter((artwork) => !artwork.image.includes("placeholder"));

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
      <p className="text-xs uppercase tracking-widest text-muted">{t.featured.eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{t.featured.title}</h2>

      <div className="mt-8 sm:mt-12">
        <FeaturedCarousel artworks={featured} />
      </div>
    </section>
  );
}
