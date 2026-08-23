"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import type { Artwork } from "@/data/types";
import { useLanguage } from "@/hooks/useLanguage";

const AUTOPLAY_DELAY_MS = 4200;

interface ItemLayout {
  left: number;
  width: number;
}

export default function FeaturedCarousel({ artworks }: { artworks: Artwork[] }) {
  // viewportRef clips the draggable track so dragging never expands the
  // page's layout; trackRef/itemRefs measure real (variable) card widths
  // so the active card can be centered — leaving its neighbors peeking in.
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const { t, pick } = useLanguage();
  const statusLabels: Record<Artwork["status"], string> = t.status;

  const [index, setIndex] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [layout, setLayout] = useState<ItemLayout[]>([]);
  const [paused, setPaused] = useState(false);

  const count = artworks.length;

  const measure = useCallback(() => {
    if (!viewportRef.current || !trackRef.current) return;
    const viewportWidth = viewportRef.current.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;
    setMaxDrag(Math.max(trackWidth - viewportWidth, 0));
    setLayout(
      itemRefs.current.map((el) => ({
        left: el?.offsetLeft ?? 0,
        width: el?.offsetWidth ?? 0,
      }))
    );
  }, []);

  useEffect(() => {
    measure();
    // Cards keep each artwork's own aspect ratio, so their real width is
    // only known once the image loads — re-measure on any layout change,
    // not just window resize.
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, count]);

  // Target x that centers item `i` in the viewport, clamped to the track's
  // real bounds — this is what makes the previous/next card peek in from
  // the sides instead of the active card sitting flush against the edge.
  const centerTarget = useCallback(
    (i: number) => {
      const item = layout[i];
      if (!viewportRef.current || !item) return 0;
      const viewportWidth = viewportRef.current.offsetWidth;
      const raw = item.left + item.width / 2 - viewportWidth / 2;
      return -Math.max(0, Math.min(raw, maxDrag));
    },
    [layout, maxDrag]
  );

  const goTo = useCallback(
    (next: number, stiffness = 260, damping = 32) => {
      const clamped = Math.max(0, Math.min(next, count - 1));
      setIndex(clamped);
      controls.start({
        x: centerTarget(clamped),
        transition: { type: "spring", stiffness, damping, mass: 0.6 },
      });
    },
    [controls, count, centerTarget]
  );

  // Autoplay — advances exactly one artwork at a time, pauses on
  // hover/drag or before layout is measured.
  useEffect(() => {
    if (paused || layout.length === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1 >= count ? 0 : prev + 1;
        controls.start({
          x: centerTarget(next),
          transition: { type: "spring", stiffness: 220, damping: 30, mass: 0.7 },
        });
        return next;
      });
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(id);
  }, [paused, layout, count, controls, centerTarget]);

  const handleDragEnd = () => {
    if (!viewportRef.current || layout.length === 0) return;
    const viewportWidth = viewportRef.current.offsetWidth;
    // The track-space point currently sitting at the viewport's center.
    const focalPoint = viewportWidth / 2 - x.get();
    let nearest = 0;
    let smallestDiff = Infinity;
    layout.forEach((item, i) => {
      const diff = Math.abs(item.left + item.width / 2 - focalPoint);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        nearest = i;
      }
    });
    goTo(nearest, 200, 26);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[420px] sm:max-w-[560px] lg:max-w-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* edge fades hint that the neighboring pieces peek in from here */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent sm:w-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent sm:w-10" />

      {/* overflow-hidden viewport: clips the drag so it never pushes the
          rest of the page sideways, even mid-elastic-overshoot */}
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex cursor-grab gap-6 active:cursor-grabbing"
          drag="x"
          style={{ x, touchAction: "pan-y" }}
          animate={controls}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.25, timeConstant: 220 }}
          onDragStart={() => setPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {artworks.map((artwork, i) => (
            <div
              key={artwork.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="shrink-0 select-none"
            >
              <Link href={`/obra/${artwork.id}`} className="block" draggable={false}>
                <motion.article
                  animate={{
                    scale: i === index ? 1 : 0.88,
                    opacity: i === index ? 1 : 0.45,
                  }}
                  whileHover={i === index ? { y: -6 } : undefined}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group relative h-[300px] overflow-hidden rounded-2xl bg-line shadow-lg shadow-ink/10 sm:h-[380px] lg:h-[460px]"
                >
                  {/* Natural aspect ratio kept per artwork — fixed height,
                      width auto, so portrait and landscape pieces don't get
                      stretched or cropped to match each other. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artwork.image}
                    alt={pick(artwork.title)}
                    draggable={false}
                    onLoad={measure}
                    className="h-full w-auto max-w-[80vw] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />

                  {/* glassmorphism caption panel */}
                  <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/25 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-md backdrop-saturate-150">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-lg text-white">
                          {pick(artwork.title)}
                        </h3>
                        <p className="truncate text-xs text-white/80">
                          {pick(artwork.medium)}, {artwork.year}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white">
                        {statusLabels[artwork.status]}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* prev/next glass controls */}
      <button
        type="button"
        aria-label={t.carousel.prevAria}
        onClick={() => goTo(index - 1)}
        className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-lg text-ink shadow-md backdrop-blur-md transition hover:bg-white/50"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={t.carousel.nextAria}
        onClick={() => goTo(index + 1)}
        className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-lg text-ink shadow-md backdrop-blur-md transition hover:bg-white/50"
      >
        ›
      </button>

      {/* progress dots */}
      <div className="mt-6 flex justify-center gap-2">
        {artworks.map((artwork, i) => (
          <button
            key={artwork.id}
            type="button"
            aria-label={`${t.carousel.goToAriaPrefix} ${pick(artwork.title)}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
