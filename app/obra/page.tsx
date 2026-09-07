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
const HIDDEN_KEY = "disponibles-hidden-v1";

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

  // Provisionally hidden pieces (the "×" on a card). Separate from the
  // order so removing a piece never disturbs the arrangement.
  const [hidden, setHidden] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HIDDEN_KEY);
      if (raw) setHidden(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  const hideArtwork = (id: string) => {
    setHidden((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(HIDDEN_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };
  const restoreHidden = () => {
    try {
      localStorage.removeItem(HIDDEN_KEY);
    } catch {
      /* ignore */
    }
    setHidden([]);
  };

  const [savedOrder, setSavedOrder] = useState<string[] | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      if (raw) setSavedOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  // `visibleIds` is the new order of the *visible* cards only. Merge it
  // back into the full list without moving the hidden pieces, so hiding a
  // piece never disturbs the arrangement (and it lands back in place if
  // restored).
  const saveOrder = (visibleIds: string[]) => {
    const full = applyOrder(availableExtra, savedOrder).map((a) => a.id);
    const hiddenSet = new Set(hidden);
    let vi = 0;
    const merged = full.map((id) =>
      hiddenSet.has(id) ? id : visibleIds[vi++] ?? id
    );
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(merged));
    } catch {
      /* ignore */
    }
    setSavedOrder(merged);
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
  const visibleExtra = useMemo(
    () => orderedExtra.filter((a) => !hidden.includes(a.id)),
    [orderedExtra, hidden]
  );
  // /obra              -> full catalogue (masonry, links to detail pages)
  // /obra?disponibles=1 -> only the available pieces (masonry, tap = spec
  //                        modal; they have no detail route)
  // /obra?disponibles=1&orden=1 -> the PROVISIONAL drag tool to reorder /
  //                        add / remove those pieces (see DisponiblesReorder
  //                        + PROYECTO.md). Its result is pasted back and
  //                        baked into data/availableExtra.ts, which is
  //                        already in the owner's curated order.
  const params = useSearchParams();
  const onlyAvailable = params.get("disponibles") === "1";
  const reorderMode = onlyAvailable && params.get("orden") === "1";

  if (reorderMode) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">
          {t.catalog.eyebrow}
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
          {t.hero.ctaTertiary}
        </h1>
        <DisponiblesReorder
          items={visibleExtra}
          onChange={saveOrder}
          onReset={resetOrder}
          onOpen={setSpecArtwork}
          onHide={hideArtwork}
          hiddenCount={hidden.length}
          onRestoreHidden={restoreHidden}
        />
        <AvailableSpecModal
          artwork={specArtwork}
          onClose={() => setSpecArtwork(null)}
        />
      </main>
    );
  }

  const items = onlyAvailable ? availableExtra : realArtworks;

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <p className="text-xs uppercase tracking-widest text-muted">{t.catalog.eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
        {onlyAvailable ? t.hero.ctaTertiary : t.catalog.title}
      </h1>

      {/* CSS-columns masonry: every piece keeps its own aspect ratio
          (ArtworkCard reserves a box from data/imageDimensions.ts) and
          packs under the shortest column — nothing is cropped to a
          uniform cell. The array order is rendered as-is (columns fill
          top-to-bottom, left column first). */}
      <div className="mt-8 columns-1 gap-8 sm:mt-12 sm:columns-2 lg:columns-3">
        {items.map((artwork) =>
          artwork.noDetailPage ? (
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
