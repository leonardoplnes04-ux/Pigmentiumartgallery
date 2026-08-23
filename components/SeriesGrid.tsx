"use client";

import { seriesList } from "@/data/series";
import { useLanguage } from "@/hooks/useLanguage";
import Watermark from "@/components/Watermark";

export default function SeriesGrid() {
  const { t, pick } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
      <p className="text-xs uppercase tracking-widest text-muted">{t.series.eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{t.series.title}</h2>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2">
        {seriesList.map((series) => (
          <article key={series.id} className="group">
            <div className="relative aspect-[16/10] overflow-hidden bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={series.coverImage}
                alt={pick(series.name)}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Watermark />
            </div>
            <h3 className="mt-4 font-serif text-xl">{pick(series.name)}</h3>
            <p className="mt-1 text-sm text-muted">{pick(series.description)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
