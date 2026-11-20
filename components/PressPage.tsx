"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LinkedText from "@/components/LinkedText";
import { artist } from "@/data/artist";
import { exhibitions } from "@/data/exhibitions";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { pressPage } from "@/data/topicPages";
import { useLanguage } from "@/hooks/useLanguage";
import { ARTIST_BOOK } from "@/lib/structuredData";

const BOOK_URL = ARTIST_BOOK.url;

// /prensa and /en/press. Book, external references and the solo exhibitions
// documented on the site. Critic quotes are NOT shown: the ones in the data
// have no confirmed author, publication or year (see docs/seo/REPORTE-2026-11.md).
// Typography follows components/BiographyPage.tsx.
export default function PressPage() {
  const { t, pick, href } = useLanguage();
  const sources = [
    artist.socials.cubanArtResources && { label: "Cuban Art Resources", url: artist.socials.cubanArtResources },
    artist.socials.askart && { label: "askART", url: artist.socials.askart },
    artist.socials.mocaa && {
      label: "MOCAA — Museum of Contemporary Art of the Americas",
      url: artist.socials.mocaa,
    },
  ].filter((source): source is { label: string; url: string } => Boolean(source));
  const shows = exhibitions.filter((exhibition) => exhibition.artistId === "segundo-planes");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">{pick(pressPage.eyebrow)}</p>
        <h1 className="mt-2 max-w-4xl font-serif text-3xl sm:text-4xl">{pick(pressPage.h1)}</h1>
        <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed sm:text-2xl">
          <LinkedText text={pick(pressPage.lead)} />
        </p>

        <div className="mt-10 divide-y divide-line border-t border-line sm:mt-14">
          <section className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10">
            <h2 className="text-xs uppercase tracking-widest text-muted">{pick(pressPage.bookHeading)}</h2>
            <div className="max-w-3xl space-y-3 leading-relaxed">
              <p className="font-serif text-lg">{pick(pressPage.bookText)}</p>
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener"
                data-cta="press-book"
                className="inline-block text-sm underline underline-offset-4 hover:text-muted"
              >
                {pick(pressPage.bookLink)}
              </a>
            </div>
          </section>

          {sources.length > 0 && (
            <section className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10">
              <h2 className="text-xs uppercase tracking-widest text-muted">{pick(pressPage.sourcesHeading)}</h2>
              <ul className="max-w-3xl space-y-2 leading-relaxed">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener"
                      className="underline underline-offset-4 hover:text-muted"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10">
            <h2 className="text-xs uppercase tracking-widest text-muted">{pick(pressPage.exhibitionsHeading)}</h2>
            <div className="max-w-3xl">
              <ul className="divide-y divide-line border-y border-line">
                {shows.map((show) => (
                  <li key={show.id} className="grid grid-cols-[72px_1fr] gap-4 py-3">
                    <span className="text-xs uppercase tracking-widest text-muted">{show.date}</span>
                    <span>
                      {exhibitionGalleries[show.id] ? (
                        <Link
                          href={href(`/exposiciones/${show.id}`)}
                          className="font-serif text-lg underline underline-offset-4 hover:text-muted"
                        >
                          {pick(show.title)}
                        </Link>
                      ) : (
                        <span className="font-serif text-lg">{pick(show.title)}</span>
                      )}
                      <span className="block text-sm text-muted">{show.venue}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <LinkedText text={pick(pressPage.exhibitionsNote)} />
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <Link
            href={href("/contacto")}
            data-cta="press-contact"
            className="inline-block bg-ink px-7 py-3.5 text-xs uppercase tracking-widest text-background transition hover:opacity-85"
          >
            {t.nav.contacto}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
