"use client";

import Link from "next/link";
import { exhibitions } from "@/data/exhibitions";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { useLanguage } from "@/hooks/useLanguage";

export default function ExhibitionsPress() {
  const { t, pick } = useLanguage();

  return (
    <section className="border-t border-line px-5 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-widest text-muted">{t.exhibitions.eyebrow}</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{t.exhibitions.title}</h2>

        <ul className="mt-8 divide-y divide-line sm:mt-12">
          {exhibitions.map((item) => {
            const hasGallery = Boolean(exhibitionGalleries[item.id]);
            return (
              <li
                key={item.id}
                className={`grid grid-cols-1 gap-4 py-5 sm:py-6 ${
                  item.image ? "md:grid-cols-[120px_1fr_180px]" : "md:grid-cols-[120px_1fr]"
                }`}
              >
                <p className="text-xs uppercase tracking-widest text-muted">{item.date}</p>
                <div>
                  {hasGallery ? (
                    <Link
                      href={`/exposiciones/${item.id}`}
                      className="font-serif text-lg underline underline-offset-4"
                    >
                      {pick(item.title)}
                    </Link>
                  ) : item.link ? (
                    <a
                      href={item.link}
                      className="font-serif text-lg underline underline-offset-4"
                    >
                      {pick(item.title)}
                    </a>
                  ) : (
                    <p className="font-serif text-lg">{pick(item.title)}</p>
                  )}
                  <p className="text-sm text-muted">{item.venue}</p>
                  <p className="mt-1 text-sm">{pick(item.description)}</p>
                </div>
                {item.image &&
                  (hasGallery ? (
                    <Link
                      href={`/exposiciones/${item.id}`}
                      className="block h-32 w-full overflow-hidden bg-line sm:h-40 md:h-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={pick(item.title)}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <div className="h-32 w-full overflow-hidden bg-line sm:h-40 md:h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={pick(item.title)}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
