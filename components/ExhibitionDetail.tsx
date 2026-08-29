"use client";

import Link from "next/link";
import type { Exhibition, ExhibitionGalleryImage } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

export default function ExhibitionDetail({
  exhibition,
  gallery,
}: {
  exhibition: Exhibition;
  gallery: ExhibitionGalleryImage[];
}) {
  const { t, pick } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <Link
        href="/exposiciones"
        className="text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        {t.exhibitionDetail.back}
      </Link>

      <p className="mt-6 text-xs uppercase tracking-widest text-muted sm:mt-8">
        {exhibition.date}
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{pick(exhibition.title)}</h1>
      <p className="mt-2 text-sm text-muted">{exhibition.venue}</p>
      <p className="mt-4 text-sm leading-relaxed">{pick(exhibition.description)}</p>

      {/* Fotos de la muestra, en el orden numerado por el propio artista.
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
            {(image.dimensions || image.technique || image.year) && (
              <p className="mt-1 text-xs text-muted/70">
                {[
                  image.dimensions && pick(image.dimensions),
                  image.technique && pick(image.technique),
                  image.year,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </figure>
        ))}
      </div>
    </article>
  );
}
