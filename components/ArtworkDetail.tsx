"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";
import InquireBlock from "@/components/InquireBlock";
import Magnifier from "@/components/zoom/Magnifier";
import ZoomViewer from "@/components/zoom/ZoomViewer";
import { artworkAlt, artworkDescription, isConfirmed } from "@/lib/artworkText";
import { FEATURED_SECTION_ID, readFeaturedReturn } from "@/lib/featuredReturn";
import { SEO_PREVIEW } from "@/lib/seoPreview";
import { seoCopy } from "@/data/seoCopy";

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  const { t, pick, href, language } = useLanguage();
  const gallery = [artwork.image, ...(artwork.additionalImages ?? [])];
  const title = pick(artwork.title);
  // Descriptive alt from confirmed data (or the approved visual description).
  const alt = artworkAlt(artwork, language);
  const description = artworkDescription(artwork, language);
  // Only critic quotes with a real, named critic. The Aviario series carries
  // placeholder quotes (critic "Por confirmar") kept in data/artworks.ts until
  // real ones arrive; they are not shown (owner, 2026-11-24 — filler quotes
  // read as fake and hurt trust/E-E-A-T).
  const criticReviews = (artwork.criticReviews ?? []).filter((review) =>
    isConfirmed(review.critic.es)
  );

  // Fullscreen lightbox — holds the src currently being viewed full-screen,
  // or null when closed. Escape closes it; body scroll is locked while open
  // so the page behind doesn't scroll under the overlay.
  const [fullscreenSrc, setFullscreenSrc] = useState<string | null>(null);

  // Opened from the home "Obra destacada" carousel? Then "back" returns to
  // that carousel (same card) instead of the /obra catalogue. Read after
  // mount: the server render always shows the normal link.
  const [fromFeatured, setFromFeatured] = useState(false);
  useEffect(() => {
    setFromFeatured(readFeaturedReturn()?.artworkId === artwork.id);
  }, [artwork.id]);

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
        href={fromFeatured ? `${href("/")}#${FEATURED_SECTION_ID}` : href("/obra")}
        className="text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        {fromFeatured ? t.detail.backToFeatured : t.detail.back}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        {/* Imagen — proporción natural respetada, sin recorte forzado. */}
        <div className="flex flex-col gap-3">
          {gallery.map((src, i) => (
            <div key={src} className="group relative overflow-hidden rounded-2xl bg-line">
              <Magnifier
                src={src}
                alt={i === 0 ? alt : `${title} — ${t.detail.detailAltSuffix} ${i + 1}`}
                loading={i === 0 ? undefined : "lazy"}
                className="h-auto w-full cursor-zoom-in"
                onOpen={() => setFullscreenSrc(src)}
              />
              <button
                type="button"
                aria-label={t.detail.viewFullscreenAria}
                onClick={() => setFullscreenSrc(src)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-neutral-900 opacity-0 shadow-md backdrop-blur-md transition hover:bg-white/50 focus-visible:opacity-100 group-hover:opacity-100"
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
              <dd>{artwork.year ?? t.detail.yearTBD}</dd>
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
              <dd>{t.detail.statusEyebrow[artwork.status]}</dd>
            </div>
            {artwork.status !== "sold" && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t.detail.priceLabel}</dt>
                <dd>{t.detail.priceOnRequest}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            <InquireBlock artwork={artwork} title={title} />
            {artwork.realDimensionsCm && (
              <Link
                href={href(`/obra/${artwork.id}/simulador`)}
                className="mt-4 inline-block text-xs uppercase tracking-widest text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                {t.simulator.cta}
              </Link>
            )}
          </div>

          {/* Comentarios de críticos */}
          {criticReviews.length > 0 && (
            <div className="mt-10 space-y-6 border-t border-line pt-6">
              <p className="text-xs uppercase tracking-widest text-muted">
                {t.detail.criticEyebrow}
              </p>
              {criticReviews.map((review, i) => (
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

          {/* Sobre la obra — visual description (data/artworkDescriptions.ts),
              only with the SEO preview flag on. In `next dev` drafts show too,
              marked "Borrador". Last element of the column on purpose (owner,
              2026-11-24: published for SEO before he verifies them, so they
              must be discreet). A closed <details> disclosure: one quiet line,
              the text opens on click. It is in the HTML and visible on demand,
              so search engines index it — never hide it with display:none or
              similar (Google treats that as hidden-text spam). */}
          {SEO_PREVIEW && description && (
            <details className="group mt-10 border-t border-line pt-4">
              <summary className="flex cursor-pointer list-none items-center gap-3 text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                {pick(seoCopy.aboutWork)}
                {description.draft && (
                  <span className="border border-line px-1.5 py-0.5 text-[10px] tracking-widest">
                    {pick(seoCopy.draftBadge)}
                  </span>
                )}
                <span aria-hidden="true" className="ml-auto text-base leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{description.text}</p>
            </details>
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
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ink/5 text-ink shadow-md backdrop-blur-md transition hover:bg-ink/10 sm:right-6 sm:top-6"
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
          <ZoomViewer key={fullscreenSrc} src={fullscreenSrc} alt={alt} onClose={() => setFullscreenSrc(null)} />
        </div>
      )}
    </article>
  );
}
