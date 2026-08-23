"use client";

import Link from "next/link";
import type { Artwork } from "@/data/types";
import { artist } from "@/data/artist";
import { useLanguage } from "@/hooks/useLanguage";

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  const { t, pick } = useLanguage();
  const gallery = [artwork.image, ...(artwork.additionalImages ?? [])];
  const title = pick(artwork.title);

  return (
    <article className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <Link
        href="/obra"
        className="text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        {t.detail.back}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        {/* Imagen — proporción natural respetada, sin recorte forzado. */}
        <div className="flex flex-col gap-3">
          {gallery.map((src, i) => (
            <div key={src} className="relative overflow-hidden rounded-2xl bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={i === 0 ? title : `${title} — ${t.detail.detailAltSuffix} ${i + 1}`}
                draggable={false}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            {t.detail.statusEyebrow[artwork.status]}
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h1>

          {/* Ficha técnica */}
          <dl className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{t.detail.year}</dt>
              <dd>{artwork.year}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{t.detail.technique}</dt>
              <dd className="text-right">{pick(artwork.medium)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{t.detail.dimensions}</dt>
              <dd className="text-right">{pick(artwork.dimensions)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{t.detail.status}</dt>
              <dd>{t.status[artwork.status]}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${artist.email}?subject=${encodeURIComponent(
                `${t.detail.inquireSubjectPrefix} "${title}"`
              )}`}
              className="inline-block border border-ink px-6 py-3 text-xs uppercase tracking-widest hover:bg-ink hover:text-background"
            >
              {t.detail.inquireCta}
            </a>
            {artwork.realDimensionsCm && (
              <Link
                href={`/obra/${artwork.id}/simulador`}
                className="inline-block border border-line px-6 py-3 text-xs uppercase tracking-widest hover:border-ink"
              >
                {t.simulator.cta}
              </Link>
            )}
          </div>

          {/* Comentarios de críticos */}
          {artwork.criticReviews && artwork.criticReviews.length > 0 && (
            <div className="mt-10 space-y-6 border-t border-line pt-6">
              <p className="text-xs uppercase tracking-widest text-muted">
                {t.detail.criticEyebrow}
              </p>
              {artwork.criticReviews.map((review, i) => (
                <blockquote key={i}>
                  <p className="font-serif text-lg leading-relaxed">
                    “{pick(review.quote)}”
                  </p>
                  <footer className="mt-2 text-xs uppercase tracking-widest text-muted">
                    {pick(review.critic)} — {pick(review.role)}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
