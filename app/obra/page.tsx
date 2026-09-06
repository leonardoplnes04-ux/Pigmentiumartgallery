"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
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

// Per-viewer, PROVISIONAL custom order for the "Obras disponibles" view.
// Stored only in that browser; never affects the published order until
// it's baked into data/availableExtra.ts by hand.
const ORDER_KEY = "disponibles-order-v1";

// The draggable grid used for /obra?disponibles=1. Lazy + ssr:false so its
// framer-motion dependency never touches the main /obra catalogue bundle.
const DisponiblesReorder = dynamic(
  () => import("@/components/DisponiblesReorder"),
  { ssr: false }
);

function applyOrder(base: Artwork[], ids: string[] | null): Artwork[] {
  if (!ids || ids.length === 0) return base;
  const byId = new Map(base.map((a) => [a.id, a]));
  const seen = new Set<string>();
  const out: Artwork[] = [];
  for (const id of ids) {
    const a = byId.get(id);
    if (a && !seen.has(id)) {
      out.push(a);
      seen.add(id);
    }
  }
  for (const a of base) if (!seen.has(a.id)) out.push(a); // any not in the saved list
  return out;
}

function ObraGrid() {
  const { t } = useLanguage();
  // The "Obras disponibles" pieces have no detail route; clicking one opens
  // its spec sheet in a modal instead (see components/AvailableSpecModal).
  const [specArtwork, setSpecArtwork] = useState<Artwork | null>(null);

  const [savedOrder, setSavedOrder] = useState<string[] | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      if (raw) setSavedOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  const saveOrder = (ids: string[]) => {
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
    setSavedOrder(ids);
  };
  const resetOrder = () => {
    try {
      localStorage.removeItem(ORDER_KEY);
    } catch {
      /* ignore */
    }
    setSavedOrder(null);
  };
  const orderedExtra = useMemo(
    () => applyOrder(availableExtra, savedOrder),
    [savedOrder]
  );
  // "Obras disponibles" (Hero) links here with ?disponibles=1 to show only
  // artworks still for sale, instead of duplicating /obra as a new route.
  // useSearchParams needs a Suspense boundary (see wrapper below) or Next's
  // build fails on this page.
  //
  // The available view also gets `availableExtra` (data/availableExtra.ts)
  // appended AFTER the catalogue's available works — those pieces live
  // only here, never in the full /obra grid, the carousel, or a detail
  // page, and the folder order they came in is kept as-is.
  const params = useSearchParams();
  const onlyAvailable = params.get("disponibles") === "1";

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <p className="text-xs uppercase tracking-widest text-muted">{t.catalog.eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
        {onlyAvailable ? t.hero.ctaTertiary : t.catalog.title}
      </h1>

      {onlyAvailable ? (
        // Provisional: the "Obras disponibles" grid is drag-to-reorder in
        // place. A tap opens the spec modal; a drag rearranges (saved
        // per-browser only).
        <DisponiblesReorder
          items={orderedExtra}
          onChange={saveOrder}
          onReset={resetOrder}
          onOpen={setSpecArtwork}
        />
      ) : (
        // CSS-columns masonry: each piece keeps its own aspect ratio and
        // packs under the shortest column. Order in data/artworks.ts is
        // preserved (columns fill top-to-bottom, left column first).
        <div className="mt-8 columns-1 gap-8 sm:mt-12 sm:columns-2 lg:columns-3">
          {realArtworks.map((artwork) => (
            <Link
              key={artwork.id}
              href={`/obra/${artwork.id}`}
              className="mb-8 block break-inside-avoid"
            >
              <ArtworkCard artwork={artwork} />
            </Link>
          ))}
        </div>
      )}

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
