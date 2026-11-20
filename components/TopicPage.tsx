"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LinkedText from "@/components/LinkedText";
import { topicPages, type TopicPageContent } from "@/data/topicPages";
import { findRealArtwork } from "@/lib/artworks";
import { isConfirmed } from "@/lib/artworkText";
import { useLanguage } from "@/hooks/useLanguage";

// Thematic page (/arte-cubano-generacion-80, /como-adquirir-obra). Same
// typography as the biography (components/BiographyPage.tsx): a header block
// with eyebrow + H1 + serif lead, then sections in a two-column grid with the
// heading on the left. No new images; artworks are linked by title.
export default function TopicPage({ topic }: { topic: keyof typeof topicPages }) {
  const { t, pick, href } = useLanguage();
  const page: TopicPageContent = topicPages[topic];
  const works = (page.works?.ids ?? [])
    .map((id) => findRealArtwork(id))
    .filter((artwork) => artwork && !artwork.noDetailPage && !artwork.featuredOnly);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">{pick(page.eyebrow)}</p>
        <h1 className="mt-2 max-w-4xl font-serif text-3xl sm:text-4xl">{pick(page.h1)}</h1>
        <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed sm:text-2xl">
          <LinkedText text={pick(page.lead)} />
        </p>

        <div className="mt-10 divide-y divide-line border-t border-line sm:mt-14">
          {page.sections.map((section, i) => (
            <section
              key={i}
              className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10"
            >
              <h2 className="text-xs uppercase tracking-widest text-muted">
                {section.heading ? pick(section.heading) : ""}
              </h2>
              <div className="max-w-3xl space-y-4 leading-relaxed">
                {section.steps && (
                  <ol className="list-decimal space-y-3 pl-5 marker:text-muted">
                    {section.steps.map((step, j) => (
                      <li key={j}>
                        <LinkedText text={pick(step)} />
                      </li>
                    ))}
                  </ol>
                )}
                {section.paragraphs?.map((paragraph, j) => (
                  <p key={j}>
                    <LinkedText text={pick(paragraph)} />
                  </p>
                ))}
              </div>
            </section>
          ))}

          {page.faq && (
            <section className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10">
              <h2 className="text-xs uppercase tracking-widest text-muted">{pick(page.faq.heading)}</h2>
              <dl className="max-w-3xl space-y-6">
                {page.faq.items.map((item, i) => (
                  <div key={i}>
                    <dt className="font-serif text-lg">{pick(item.q)}</dt>
                    <dd className="mt-2 leading-relaxed text-muted">{pick(item.a)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {works.length > 0 && page.works && (
            <section className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10">
              <h2 className="text-xs uppercase tracking-widest text-muted">{pick(page.works.heading)}</h2>
              <ul className="max-w-3xl divide-y divide-line border-y border-line">
                {works.map((artwork) =>
                  artwork ? (
                    <li key={artwork.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                      <Link
                        href={href(`/obra/${artwork.id}`)}
                        className="font-serif text-lg underline underline-offset-4 hover:text-muted"
                      >
                        {pick(artwork.title)}
                      </Link>
                      <span className="text-sm text-muted">
                        {[
                          isConfirmed(pick(artwork.medium)) ? pick(artwork.medium) : null,
                          artwork.year ? String(artwork.year) : null,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <Link
            href={href("/contacto")}
            data-cta={`topic-${topic}-contact`}
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
