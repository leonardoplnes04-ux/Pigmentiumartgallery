"use client";

import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";
import Watermark from "@/components/Watermark";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const { t, pick } = useLanguage();

  // Respect each piece's own proportions instead of forcing a uniform
  // crop: when the real physical dimensions are on file, the card's
  // aspect ratio matches the actual artwork (object-cover trims only the
  // photo's own framing slack, not the piece); otherwise there's no
  // reliable real-world ratio to use, so the photo renders at its native
  // aspect ratio uncropped. Either way, cards in the grid end up
  // different heights on purpose — see components/ArtworkCard.tsx usage
  // in app/obra/page.tsx, which sets align-items: start on the grid so
  // rows don't stretch shorter cards to match taller neighbors.
  const ratio = artwork.realDimensionsCm
    ? `${artwork.realDimensionsCm.width} / ${artwork.realDimensionsCm.height}`
    : undefined;

  return (
    <article className="group">
      <div
        className="relative overflow-hidden bg-line"
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artwork.image}
          alt={pick(artwork.title)}
          draggable={false}
          className={
            ratio
              ? "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              : "h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
          }
        />
        <Watermark />
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <h3 className="font-serif text-lg">{pick(artwork.title)}</h3>
          <p className="text-sm text-muted">
            {pick(artwork.medium)}, {artwork.year}
          </p>
        </div>
        <span className="text-xs uppercase tracking-widest text-muted">
          {t.status[artwork.status]}
        </span>
      </div>
    </article>
  );
}
