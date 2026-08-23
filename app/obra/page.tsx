"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { realArtworks } from "@/lib/artworks";
import { useLanguage } from "@/hooks/useLanguage";

function ObraGrid() {
  const { t } = useLanguage();
  // "Obras disponibles" (Hero) links here with ?disponibles=1 to show only
  // artworks still for sale, instead of duplicating /obra as a new route.
  // useSearchParams needs a Suspense boundary (see wrapper below) or Next's
  // build fails on this page.
  const onlyAvailable = useSearchParams().get("disponibles") === "1";
  const artworks = onlyAvailable
    ? realArtworks.filter((artwork) => artwork.status === "available")
    : realArtworks;

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <p className="text-xs uppercase tracking-widest text-muted">{t.catalog.eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
        {onlyAvailable ? t.hero.ctaTertiary : t.catalog.title}
      </h1>

      {/* CSS-columns masonry instead of a grid: each artwork keeps its own
          aspect ratio (components/ArtworkCard.tsx) and the column layout
          packs the next card right under the shortest column instead of
          leaving a row-height gap under it, like a grid would with mixed
          card heights. break-inside-avoid keeps a card from splitting
          across two columns. This only changes how the *same* array is
          laid out visually — `artworks` itself is never re-sorted, so the
          chosen order (see data/artworks.ts) is preserved: CSS columns
          fill top-to-bottom within each column, left column first, which
          keeps consecutive array items visually close together without
          reordering the underlying data. */}
      {/* Capped at 3 columns (was 4 up to xl) so each piece renders bigger
          and more detail is visible, per the user's request. */}
      <div className="mt-8 columns-1 gap-8 sm:mt-12 sm:columns-2 lg:columns-3">
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/obra/${artwork.id}`}
            className="mb-8 block break-inside-avoid"
          >
            <ArtworkCard artwork={artwork} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default function ObraPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <ObraGrid />
      </Suspense>
      <Footer />
    </>
  );
}
