"use client";

import { artist } from "@/data/artist";
import ArrowLink from "@/components/ArrowLink";
import { useLanguage } from "@/hooks/useLanguage";

export default function ArtistStatement() {
  const { t, pick, href } = useLanguage();

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-16 sm:gap-12 sm:px-6 sm:py-20 md:grid-cols-2 md:items-center md:py-24">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.portraitImage}
          alt={`${t.statement.portraitAltPrefix} ${artist.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted">{t.statement.eyebrow}</p>
        <p className="mt-4 font-serif text-2xl leading-relaxed sm:text-3xl">{pick(artist.shortBio)}</p>
        <ArrowLink href={href("/sobre-mi")} className="mt-6">
          {t.statement.readMore}
        </ArrowLink>
      </div>
    </section>
  );
}
