"use client";

import Link from "next/link";
import { artist } from "@/data/artist";
import { useLanguage } from "@/hooks/useLanguage";

export default function Hero() {
  const { t, pick } = useLanguage();

  return (
    // Container matches the artwork's own aspect ratio (7:4) instead of a
    // fixed 90vh, and min-h keeps the title/tagline/button block from
    // feeling cramped on phones, where the 7:4 aspect alone would make the
    // section quite short. object-cover fills the section edge-to-edge
    // (no side letterboxing) — the photo's own ratio (~3:2) is close
    // enough to 7:4 that the top/bottom crop this introduces is minor.
    <section className="relative flex aspect-[7/4] max-h-[85vh] min-h-[380px] w-full items-end overflow-hidden bg-background">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.heroImage}
        alt={`${t.hero.altPrefix} ${artist.name}`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-8 text-background sm:px-6 sm:pb-12 md:pb-16">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="font-serif text-3xl leading-tight sm:text-5xl md:text-7xl">
            {artist.name}
          </h1>
          <p className="text-[10px] uppercase tracking-widest sm:text-xs">{pick(artist.tagline)}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
          <Link
            href="/obra"
            className="inline-block border border-background px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-background hover:text-ink sm:px-6 sm:py-3"
          >
            {t.hero.cta}
          </Link>
          <Link
            href="/exposiciones"
            className="inline-block border border-background/60 px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-background hover:text-ink sm:px-6 sm:py-3"
          >
            {t.hero.ctaSecondary}
          </Link>
          <Link
            href="/obra?disponibles=1"
            className="inline-block border border-background/60 px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-background hover:text-ink sm:px-6 sm:py-3"
          >
            {t.hero.ctaTertiary}
          </Link>
          <Link
            href="/videos"
            className="inline-block border border-background/60 px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-background hover:text-ink sm:px-6 sm:py-3"
          >
            {t.hero.ctaVideos}
          </Link>
          <Link
            href="/performance"
            className="inline-block border border-background/60 px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-background hover:text-ink sm:px-6 sm:py-3"
          >
            {t.hero.ctaPerformance}
          </Link>
        </div>
      </div>
    </section>
  );
}
