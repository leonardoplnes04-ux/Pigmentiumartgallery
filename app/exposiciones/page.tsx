"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { exhibitions } from "@/data/exhibitions";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { galleryArtists } from "@/data/galleryArtists";
import { useLanguage } from "@/hooks/useLanguage";

const ALL = "all";

export default function ExposicionesPage() {
  const { t, pick } = useLanguage();
  const [selectedArtist, setSelectedArtist] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      selectedArtist === ALL
        ? exhibitions
        : exhibitions.filter((item) => item.artistId === selectedArtist),
    [selectedArtist]
  );

  // The filter only earns its place once there's more than one artist to
  // choose between — with a single artist it would just be a no-op control.
  const showArtistFilter = galleryArtists.length > 1;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">{t.exhibitions.eyebrow}</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{t.exhibitions.title}</h1>

        {showArtistFilter && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 sm:mt-8">
            <button
              type="button"
              onClick={() => setSelectedArtist(ALL)}
              className={`text-xs uppercase tracking-widest ${
                selectedArtist === ALL ? "text-ink underline underline-offset-4" : "text-muted"
              }`}
            >
              {t.exhibitions.filterAll}
            </button>
            {galleryArtists.map((artist) => (
              <button
                key={artist.id}
                type="button"
                onClick={() => setSelectedArtist(artist.id)}
                className={`text-xs uppercase tracking-widest ${
                  selectedArtist === artist.id ? "text-ink underline underline-offset-4" : "text-muted"
                }`}
              >
                {artist.name}
              </button>
            ))}
          </div>
        )}

        <ul className="mt-8 divide-y divide-line sm:mt-12">
          {filtered.map((item) => {
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
                    <a href={item.link} className="font-serif text-lg underline underline-offset-4">
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
      </main>
      <Footer />
    </>
  );
}
