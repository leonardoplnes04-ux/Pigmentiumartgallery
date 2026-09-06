"use client";

import { useEffect, useState } from "react";
import type { Artwork } from "@/data/types";
import { artist } from "@/data/artist";
import { useLanguage } from "@/hooks/useLanguage";

// Spec sheet ("ficha técnica") for an "Obras disponibles" piece. These
// works have no /obra/[id] route (see data/availableExtra.ts), so instead
// of navigating, app/obra/page.tsx opens this modal in place. Closes on
// Escape, on a scrim click, or the × button; body scroll is locked while
// open (same pattern as components/ArtworkDetail.tsx).
export default function AvailableSpecModal({
  artwork,
  onClose,
}: {
  artwork: Artwork | null;
  onClose: () => void;
}) {
  const { t, pick } = useLanguage();

  // Which image of the piece is shown large. Reset whenever a different
  // piece opens the modal.
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => setActiveImg(0), [artwork]);

  useEffect(() => {
    if (!artwork) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  const title = pick(artwork.title);
  const images = [artwork.image, ...(artwork.additionalImages ?? [])];
  const hasMultiple = images.length > 1;
  const current = images[Math.min(activeImg, images.length - 1)];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-background text-ink shadow-2xl"
      >
        <button
          type="button"
          aria-label={t.menu.close}
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-lg text-neutral-900 shadow-md backdrop-blur-md transition hover:bg-white/50"
        >
          ×
        </button>

        <div className="grid grid-cols-1 gap-6 p-5 sm:p-8 md:grid-cols-[1.3fr_1fr] md:gap-10">
          <div>
            <div className="relative flex items-center justify-center bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current}
                alt={
                  activeImg === 0
                    ? title
                    : `${title} — ${t.detail.detailAltSuffix} ${activeImg + 1}`
                }
                draggable={false}
                decoding="async"
                className="max-h-[70vh] w-full object-contain"
              />
              {hasMultiple && (
                <button
                  type="button"
                  aria-label={t.carousel.nextAria}
                  onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/25 text-xl text-neutral-900 shadow-md backdrop-blur-md transition hover:bg-white/60"
                >
                  ›
                </button>
              )}
            </div>

            {/* Thumbnails — lets the client see the piece has more than one
                photo (a full view + detail shots). */}
            {hasMultiple && (
              <div className="mt-3 flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`${t.carousel.goToAriaPrefix} ${i + 1}`}
                    aria-current={i === activeImg}
                    onClick={() => setActiveImg(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-line transition ${
                      i === activeImg
                        ? "border-ink opacity-100"
                        : "border-line opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              {t.detail.statusEyebrow[artwork.status]}
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{title}</h2>

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
                <dd>{t.status[artwork.status]}</dd>
              </div>
            </dl>

            <a
              href={`mailto:${artist.email}?subject=${encodeURIComponent(
                `${t.detail.inquireSubjectPrefix} "${title}"`
              )}`}
              className="mt-8 inline-block border border-ink px-6 py-3 text-xs uppercase tracking-widest hover:bg-ink hover:text-background"
            >
              {t.detail.inquireCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
