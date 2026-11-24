"use client";

import type { CSSProperties } from "react";
import type { Artwork } from "@/data/types";
import { aspectRatioOf } from "@/data/imageDimensions";
import { useLanguage } from "@/hooks/useLanguage";
import { artworkAlt } from "@/lib/artworkText";

export default function ArtworkCard({
  artwork,
  hideCaption = false,
}: {
  artwork: Artwork;
  // Drop the title/medium/status line under the image (used in the
  // "Obras disponibles" grid, where the spec appears on click instead).
  hideCaption?: boolean;
}) {
  const { t, pick, language } = useLanguage();

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
  // Width/height as a number, so phones can cap a tall piece to the screen
  // height and narrow it to match (whole piece visible, centred).
  const ratioNumber = ratio
    ? (([w, h]) => w / h)(ratio.split("/").map((n) => Number(n.trim())))
    : undefined;

  return (
    <article className="group">
      <div
        className="relative overflow-hidden bg-line max-sm:mx-auto max-sm:w-[min(100%,calc((100svh_-_10rem)*var(--ar)))]"
        style={
          ratio
            ? ({ aspectRatio: ratio, "--ar": ratioNumber } as CSSProperties)
            : undefined
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artwork.image}
          alt={artworkAlt(artwork, language)}
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
      {!hideCaption && (
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
      )}
    </article>
  );
}
