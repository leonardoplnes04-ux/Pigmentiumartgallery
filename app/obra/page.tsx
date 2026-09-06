"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import AvailableSpecModal from "@/components/AvailableSpecModal";
import { realArtworks } from "@/lib/artworks";
import { availableExtra } from "@/data/availableExtra";
import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

function ObraGrid() {
  const { t } = useLanguage();
  // The "Obras disponibles" pieces have no detail route; clicking one opens
  // its spec sheet in a modal instead (see components/AvailableSpecModal).
  const [specArtwork, setSpecArtwork] = useState<Artwork | null>(null);
  // "Obras disponibles" (Hero) links here with ?disponibles=1 to show only
  // artworks still for sale, instead of duplicating /obra as a new route.
  // useSearchParams needs a Suspense boundary (see wrapper below) or Next's
  // build fails on this page.
  //
  // The available view also gets `availableExtra` (data/availableExtra.ts)
  // appended AFTER the catalogue's available works — those pieces live
  // only here, never in the full /obra grid, the carousel, or a detail
  // page, and the folder order they came in is kept as-is.
  const onlyAvailable = useSearchParams().get("disponibles") === "1";
  const artworks = onlyAvailable
    ? [
        ...realArtworks.filter((artwork) => artwork.status === "available"),
        ...availableExtra,
      ]
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
        {artworks.map((artwork) =>
          artwork.noDetailPage ? (
            // Available-only piece: no /obra/[id] route — clicking opens its
            // spec sheet in a modal on this same page.
            <button
              key={artwork.id}
              type="button"
              onClick={() => setSpecArtwork(artwork)}
              className="mb-8 block w-full break-inside-avoid text-left"
            >
              <ArtworkCard artwork={artwork} />
            </button>
          ) : (
            <Link
              key={artwork.id}
              href={`/obra/${artwork.id}`}
              className="mb-8 block break-inside-avoid"
            >
              <ArtworkCard artwork={artwork} />
            </Link>
          )
        )}
      </div>

      <AvailableSpecModal
        artwork={specArtwork}
        onClose={() => setSpecArtwork(null)}
      />
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
