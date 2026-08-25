"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { performances } from "@/data/performances";
import { performanceGalleries } from "@/data/performanceGalleries";
import { useLanguage } from "@/hooks/useLanguage";

export default function PerformancePage() {
  const { t, pick } = useLanguage();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">{t.performances.eyebrow}</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{t.performances.title}</h1>

        <ul className="mt-8 divide-y divide-line sm:mt-12">
          {performances.map((item) => {
            const gallery = performanceGalleries[item.id];
            const cover = gallery?.[0];
            return (
              <li
                key={item.id}
                className={`grid grid-cols-1 gap-4 py-5 sm:py-6 ${
                  cover ? "md:grid-cols-[120px_1fr_180px]" : "md:grid-cols-[120px_1fr]"
                }`}
              >
                <p className="text-xs uppercase tracking-widest text-muted">{item.year}</p>
                <div>
                  <Link
                    href={`/performance/${item.id}`}
                    className="font-serif text-lg underline underline-offset-4"
                  >
                    {item.title}
                  </Link>
                  {item.venue && <p className="text-sm text-muted">{item.venue}</p>}
                  <p className="mt-1 text-sm">{pick(item.description)}</p>
                </div>
                {cover && (
                  <Link
                    href={`/performance/${item.id}`}
                    className="block h-32 w-full overflow-hidden bg-line sm:h-40 md:h-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover.src}
                      alt={pick(cover.alt)}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}
