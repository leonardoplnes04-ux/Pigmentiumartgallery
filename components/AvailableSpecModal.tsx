"use client";

import { useEffect } from "react";
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
          <div className="flex items-center justify-center bg-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artwork.image}
              alt={title}
              draggable={false}
              decoding="async"
              className="max-h-[70vh] w-full object-contain"
            />
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
