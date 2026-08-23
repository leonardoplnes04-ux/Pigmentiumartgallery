"use client";

import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";
import Watermark from "@/components/Watermark";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const { t, pick } = useLanguage();

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artwork.image}
          alt={pick(artwork.title)}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
