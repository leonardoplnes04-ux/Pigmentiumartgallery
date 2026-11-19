"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos } from "@/data/videos";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { useLanguage } from "@/hooks/useLanguage";

// Same list rhythm as /exposiciones (year · title/venue · image) so every
// video fits on the first screen. Rows show a still + duration; the actual
// <video> only loads when one is opened in the lightbox player.
export default function VideosPage() {
  const { t, pick } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function open(index: number, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }

  const close = useCallback(() => {
    setOpenIndex(null);
    // Return focus to whatever opened the player.
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">{t.videos.eyebrow}</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{t.videos.title}</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">{t.videos.intro}</p>

        <ul className="mt-8 divide-y divide-line border-y border-line sm:mt-10">
          {videos.map((item, index) => {
            const hasGallery = Boolean(item.exhibitionId && exhibitionGalleries[item.exhibitionId]);
            const title = pick(item.title);
            return (
              <li
                key={item.id}
                className="grid grid-cols-1 gap-4 py-5 sm:py-6 md:grid-cols-[120px_1fr_240px] md:items-center md:gap-6"
              >
                <p className="text-xs uppercase tracking-widest text-muted md:self-start md:pt-1.5">
                  {item.date}
                </p>

                <div className="md:self-start">
                  {hasGallery ? (
                    <Link
                      href={`/exposiciones/${item.exhibitionId}`}
                      className="font-serif text-lg underline underline-offset-4"
                    >
                      {title}
                    </Link>
                  ) : (
                    <p className="font-serif text-lg">{title}</p>
                  )}
                  <p className="text-sm text-muted">{item.venue}</p>
                  <button
                    type="button"
                    onClick={(e) => open(index, e.currentTarget)}
                    className="mt-3 hidden items-center gap-2 text-xs uppercase tracking-widest text-ink hover:text-muted md:inline-flex"
                  >
                    <PlayIcon className="h-3 w-3" />
                    {t.videos.watch}
                    {item.duration && <span className="text-muted">· {item.duration}</span>}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={(e) => open(index, e.currentTarget)}
                  aria-label={`${t.videos.playAriaPrefix} ${title}`}
                  className="group relative block aspect-video w-full overflow-hidden bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {item.poster && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.poster}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-80"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <PlayIcon className="ml-0.5 h-4 w-4" />
                    </span>
                  </span>
                  {item.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 text-[11px] tabular-nums text-white">
                      {item.duration}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />

      {openIndex !== null && (
        <VideoLightbox
          index={openIndex}
          onNavigate={setOpenIndex}
          onClose={close}
        />
      )}
    </>
  );
}

function VideoLightbox({
  index,
  onNavigate,
  onClose,
}: {
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const { t, pick } = useLanguage();
  const item = videos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const hasPrev = index > 0;
  const hasNext = index < videos.length - 1;

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(index - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, hasPrev, hasNext, onClose, onNavigate]);

  const title = pick(item.title);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[70] flex flex-col bg-black text-white"
      onClick={onClose}
    >
      <div
        className="flex items-start justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-white/60">
            {item.date} · {index + 1}/{videos.length}
          </p>
          <p className="mt-1 truncate font-serif text-lg sm:text-xl">{title}</p>
          <p className="truncate text-sm text-white/60">{item.venue}</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.videos.close}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20 sm:pb-10">
        <video
          key={item.id}
          src={item.src}
          poster={item.poster}
          controls
          autoPlay
          playsInline
          onClick={(e) => e.stopPropagation()}
          className={`max-h-full bg-black ${item.vertical ? "h-full w-auto" : "w-full max-w-5xl"}`}
        >
          {title}
        </video>

        {hasPrev && (
          <NavButton side="left" label={t.videos.prevAria} onClick={() => onNavigate(index - 1)} />
        )}
        {hasNext && (
          <NavButton side="right" label={t.videos.nextAria} onClick={() => onNavigate(index + 1)} />
        )}
      </div>
    </div>
  );
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:flex ${
        side === "left" ? "left-5" : "right-5"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
        <path d={side === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
    </svg>
  );
}
