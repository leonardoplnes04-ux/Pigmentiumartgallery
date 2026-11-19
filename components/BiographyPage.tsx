"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { artist } from "@/data/artist";
import { faq, faqHeading } from "@/data/faq";
import { useLanguage } from "@/hooks/useLanguage";

export default function BiographyPage() {
  const { t, pick } = useLanguage();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[320px_1fr] md:items-end md:gap-12">
          <figure className="w-full max-w-xs md:max-w-none">
            <div className="aspect-[4/5] overflow-hidden bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artist.portraitImage}
                alt={`${t.statement.portraitAltPrefix} ${artist.name}`}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            {artist.portraitCredit && (
              <figcaption className="mt-2 text-xs text-muted">{artist.portraitCredit}</figcaption>
            )}
          </figure>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">{t.nav.sobreMi}</p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{artist.name}</h1>
            <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed sm:text-2xl">
              {pick(artist.shortBio)}
            </p>
          </div>
        </div>

        <div className="mt-10 divide-y divide-line border-t border-line sm:mt-14">
          {artist.biography.map((section, i) => (
            <section
              key={i}
              className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10"
            >
              <h2 className="text-xs uppercase tracking-widest text-muted">
                {section.heading ? pick(section.heading) : ""}
              </h2>
              <div className="max-w-3xl space-y-4 leading-relaxed">
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j}>{pick(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}

          {/* Preguntas frecuentes — mismo texto que lee el JSON-LD FAQPage de
              app/sobre-mi/page.tsx. */}
          <section className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10">
            <h2 className="text-xs uppercase tracking-widest text-muted">
              {pick(faqHeading)}
            </h2>
            <dl className="max-w-3xl space-y-6">
              {faq.map((item, i) => (
                <div key={i}>
                  <dt className="font-serif text-lg">{pick(item.q)}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">{pick(item.a)}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
