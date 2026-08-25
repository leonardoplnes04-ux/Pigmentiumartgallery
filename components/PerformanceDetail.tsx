"use client";

import Link from "next/link";
import type { Performance, PerformanceGalleryImage } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

export default function PerformanceDetail({
  performance,
  gallery,
}: {
  performance: Performance;
  gallery: PerformanceGalleryImage[];
}) {
  const { t, pick } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <Link
        href="/performance"
        className="text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        {t.performanceDetail.back}
      </Link>

      <p className="mt-6 text-xs uppercase tracking-widest text-muted sm:mt-8">
        {performance.year}
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{performance.title}</h1>
      {performance.venue && <p className="mt-2 text-sm text-muted">{performance.venue}</p>}
      <p className="mt-4 text-sm leading-relaxed">{pick(performance.description)}</p>

      {/* Fotos de la performance, en el orden numerado por el propio artista.
          Sin recorte forzado (h-auto + w-full) para respetar cada imagen. */}
      <div className="mt-10 flex flex-col gap-8 border-t border-line pt-10 sm:mt-12 sm:pt-12">
        {gallery.map((image, i) => (
          <figure key={image.src}>
            <div className="overflow-hidden rounded-2xl bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={pick(image.alt)} className="h-auto w-full" />
            </div>
            <figcaption className="mt-2 text-xs uppercase tracking-widest text-muted">
              {String(i + 1).padStart(2, "0")} — {pick(image.alt)}
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
