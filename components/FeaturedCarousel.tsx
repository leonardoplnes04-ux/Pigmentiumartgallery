"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import type { Artwork } from "@/data/types";

const statusLabels: Record<Artwork["status"], string> = {
  available: "Disponible",
  sold: "Vendida",
  inquire: "Consultar",
};

const AUTOPLAY_DELAY_MS = 4200;
const GAP_PX = 24; // must match the track's gap-6

export default function FeaturedCarousel({ artworks }: { artworks: Artwork[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const controls = useAnimationControls();

  const [index, setIndex] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [itemStep, setItemStep] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = artworks.length;

  const measure = useCallback(() => {
    if (!containerRef.current || !trackRef.current || !itemRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;
    setMaxDrag(Math.max(trackWidth - containerWidth, 0));
    setItemStep(itemRef.current.offsetWidth + GAP_PX);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = useCallback(
    (next: number, stiffness = 260, damping = 32) => {
      const clamped = Math.max(0, Math.min(next, count - 1));
      const target = -Math.min(clamped * itemStep, maxDrag);
      setIndex(clamped);
      controls.start({
        x: target,
        transition: { type: "spring", stiffness, damping, mass: 0.6 },
      });
    },
    [controls, count, itemStep, maxDrag]
  );

  // Autoplay — pauses on hover, drag, or before layout is measured.
  useEffect(() => {
    if (paused || itemStep === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1 >= count ? 0 : prev + 1;
        const target = -Math.min(next * itemStep, maxDrag);
        controls.start({
          x: target,
          transition: { type: "spring", stiffness: 220, damping: 30, mass: 0.7 },
        });
        return next;
      });
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(id);
  }, [paused, itemStep, maxDrag, count, controls]);

  const handleDragEnd = () => {
    const nearest = Math.round(-x.get() / (itemStep || 1));
    goTo(nearest, 200, 26);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* edge fades hint that the carousel scrolls further */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-16" />

      <motion.div
        ref={trackRef}
        className="flex cursor-grab gap-6 active:cursor-grabbing"
        drag="x"
        style={{ x }}
        animate={controls}
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.14}
        dragTransition={{ power: 0.25, timeConstant: 220 }}
        onDragStart={() => setPaused(true)}
        onDragEnd={handleDragEnd}
      >
        {artworks.map((artwork, i) => (
          <div
            key={artwork.id}
            ref={i === 0 ? itemRef : undefined}
            className="w-[78vw] shrink-0 select-none sm:w-[46vw] lg:w-[30vw]"
          >
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-line shadow-lg shadow-ink/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artwork.image}
                alt={artwork.title}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />

              {/* glassmorphism caption panel */}
              <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/25 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-md backdrop-saturate-150">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-serif text-lg text-white">
                      {artwork.title}
                    </h3>
                    <p className="truncate text-xs text-white/80">
                      {artwork.medium}, {artwork.year}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white">
                    {statusLabels[artwork.status]}
                  </span>
                </div>
              </div>
            </motion.article>
          </div>
        ))}
      </motion.div>

      {/* prev/next glass controls */}
      <button
        type="button"
        aria-label="Obra anterior"
        onClick={() => goTo(index - 1)}
        className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-lg text-ink shadow-md backdrop-blur-md transition hover:bg-white/50 sm:flex"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Obra siguiente"
        onClick={() => goTo(index + 1)}
        className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-lg text-ink shadow-md backdrop-blur-md transition hover:bg-white/50 sm:flex"
      >
        ›
      </button>

      {/* progress dots */}
      <div className="mt-6 flex justify-center gap-2">
        {artworks.map((artwork, i) => (
          <button
            key={artwork.id}
            type="button"
            aria-label={`Ir a ${artwork.title}`}
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
