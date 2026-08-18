"use client";

import FeaturedCarousel from "@/components/FeaturedCarousel";
import { artworks } from "@/data/artworks";
import { useLanguage } from "@/hooks/useLanguage";

export default function FeaturedWorks() {
  const { t } = useLanguage();
  // Featured spotlights real artwork photography; placeholder pieces stay
  // out of the curated carousel (they still appear in the full catalog).
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
