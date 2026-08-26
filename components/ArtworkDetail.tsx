"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Artwork } from "@/data/types";
import { artist } from "@/data/artist";
import { useLanguage } from "@/hooks/useLanguage";

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  const { t, pick } = useLanguage();
  const gallery = [artwork.image, ...(artwork.additionalImages ?? [])];
  const title = pick(artwork.title);

  // Fullscreen lightbox — holds the src currently being viewed full-screen,
  // or null when closed. Escape closes it; body scroll is locked while open
  // so the page behind doesn't scroll under the overlay.
  const [fullscreenSrc, setFullscreenSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!fullscreenSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenSrc(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [fullscreenSrc]);

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
            <div key={src} className="group relative overflow-hidden rounded-2xl bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={i === 0 ? title : `${title} — ${t.detail.detailAltSuffix} ${i + 1}`}
                draggable={false}
                className="h-auto w-full cursor-zoom-in"
                onClick={() => setFullscreenSrc(src)}
              />
              <button
                type="button"
                aria-label={t.detail.viewFullscreenAria}
                onClick={() => setFullscreenSrc(src)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-ink opacity-0 shadow-md backdrop-blur-md transition hover:bg-white/50 focus-visible:opacity-100 group-hover:opacity-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                  <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
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

      {/* Fullscreen lightbox — full-viewport overlay, not the native
          Fullscreen API (that needs a permission prompt on some browsers
          and behaves inconsistently on mobile); this fills the screen the
          same way everywhere. Click the backdrop, the × button, or press
          Escape to close. */}
      {fullscreenSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4 sm:p-8"
          onClick={() => setFullscreenSrc(null)}
        >
          <button
            type="button"
            aria-label={t.detail.closeFullscreenAria}
            onClick={() => setFullscreenSrc(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ink/5 text-ink shadow-md backdrop-blur-md transition hover:bg-ink/10 sm:right-6 sm:top-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fullscreenSrc}
            alt={title}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </article>
  );
}
