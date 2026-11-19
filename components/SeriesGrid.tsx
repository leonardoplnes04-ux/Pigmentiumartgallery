"use client";

import { seriesList } from "@/data/series";
import ArrowLink from "@/components/ArrowLink";
import { useLanguage } from "@/hooks/useLanguage";

export default function SeriesGrid() {
  const { t, pick, href } = useLanguage();

  return (
    <section className="border-y border-line bg-line/10 px-5 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">{t.series.eyebrow}</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{t.series.title}</h2>
          </div>
          <ArrowLink href={href("/obra")}>{t.series.viewAll}</ArrowLink>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2">
          {seriesList.map((series) => (
            <article key={series.id} className="group">
              <div className="relative aspect-[16/10] overflow-hidden bg-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={series.coverImage}
                  alt={pick(series.name)}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-serif text-xl">{pick(series.name)}</h3>
              <p className="mt-1 text-sm text-muted">{pick(series.description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
