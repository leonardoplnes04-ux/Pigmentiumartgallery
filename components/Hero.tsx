"use client";

import Link from "next/link";
import { artist } from "@/data/artist";
import { useLanguage } from "@/hooks/useLanguage";

export default function Hero() {
  const { t, pick } = useLanguage();

  return (
    // Container matches the artwork's own aspect ratio (7:4) instead of a
    // fixed 90vh — that mismatch was forcing object-cover to crop hard on
    // narrow screens. object-contain below is a second guarantee: the full
    // photo always stays visible, never cropped, even on the rare screen
    // where max-h clamps in. min-h keeps the title/tagline/button block
    // from feeling cramped on phones, where the 7:4 aspect alone would
    // make the section quite short.
    <section className="relative flex aspect-[7/4] max-h-[85vh] min-h-[380px] w-full items-end overflow-hidden bg-background">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.heroImage}
        alt={`${t.hero.altPrefix} ${artist.name}`}
        className="absolute inset-0 h-full w-full object-contain"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-8 text-background sm:px-6 sm:pb-12 md:pb-16">
        <p className="text-[10px] uppercase tracking-widest sm:text-xs">{pick(artist.tagline)}</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-5xl md:text-7xl">
          {artist.name}
        </h1>
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
        </div>
      </div>
    </section>
  );
}
