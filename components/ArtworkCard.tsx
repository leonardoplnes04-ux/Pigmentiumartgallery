"use client";

import type { Artwork } from "@/data/types";
import { aspectRatioOf } from "@/data/imageDimensions";
import { useLanguage } from "@/hooks/useLanguage";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const { t, pick } = useLanguage();

  // Reserve the card's height BEFORE the image loads so the CSS-columns
  // masonry in /obra doesn't reflow as each photo arrives (big CLS win on
  // mobile). Prefer the real physical proportions when on file (object-cover
  // then trims only the photo's framing slack, not the piece); otherwise
  // fall back to the photo's own pixel ratio from the generated
  // data/imageDimensions.ts map. Only when neither is known do we let the
  // image define its own height (old behavior).
  const ratio = artwork.realDimensionsCm
    ? `${artwork.realDimensionsCm.width} / ${artwork.realDimensionsCm.height}`
    : aspectRatioOf(artwork.image);

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
          loading="lazy"
          decoding="async"
          className={
            ratio
              ? "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              : "h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
          }
        />
      </div>
      {/* Muted on purpose: the artwork photo is the focal point, this
          caption block is reference info, not a competing headline —
          text-ink/70 instead of the page's default full-contrast ink,
          and the secondary lines drop further to /60 so the image stays
          the loudest thing on the card. */}
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <h3 className="font-serif text-lg text-ink/70">{pick(artwork.title)}</h3>
          <p className="text-sm text-muted/60">
            {pick(artwork.medium)}
            {artwork.year ? `, ${artwork.year}` : ""}
          </p>
        </div>
        <span className="text-xs uppercase tracking-widest text-muted/60">
          {t.status[artwork.status]}
        </span>
      </div>
    </article>
  );
}
