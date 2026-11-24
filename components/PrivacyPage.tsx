"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  PRIVACY_LAST_UPDATED,
  cookieTable,
  privacyCopy,
  privacyIntro,
  privacySections,
  type CookieRow,
} from "@/data/privacy";
import { useLanguage } from "@/hooks/useLanguage";
import { openConsentSettings } from "@/lib/consent";

// /privacidad and /en/privacy — privacy notice + cookie policy. Typography
// follows components/BiographyPage.tsx (heading column on the left).
export default function PrivacyPage() {
  const { pick, language } = useLanguage();
  const c = privacyCopy;
  const updated = new Intl.DateTimeFormat(language === "es" ? "es-MX" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${PRIVACY_LAST_UPDATED}T12:00:00Z`));

  // Phones get stacked cards (no sideways scrolling); from `sm` up the table
  // is unchanged.
  const cards = (category: CookieRow["category"]) => (
    <div className="sm:hidden">
      <p className="pb-2 text-xs uppercase tracking-widest text-muted">
        {pick(category === "necessary" ? c.cookieTable.necessary : c.cookieTable.analytics)}
      </p>
      <dl className="divide-y divide-line border-y border-line text-sm">
        {cookieTable
          .filter((row) => row.category === category)
          .map((row) => (
            <div key={row.name} className="py-3">
              <dt className="break-all font-mono text-xs">{row.name}</dt>
              <dd className="mt-1">{pick(row.purpose)}</dd>
              <dd className="mt-1 text-xs text-muted">
                {row.provider} · {pick(row.duration)}
              </dd>
            </div>
          ))}
      </dl>
    </div>
  );

  const table = (category: CookieRow["category"]) => (
    <div className="hidden overflow-x-auto sm:block">
      <table className="w-full min-w-[520px] text-left text-sm">
        <caption className="pb-2 text-left text-xs uppercase tracking-widest text-muted">
          {pick(category === "necessary" ? c.cookieTable.necessary : c.cookieTable.analytics)}
        </caption>
        <thead>
          <tr className="border-b border-line text-xs text-muted">
            <th className="py-2 pr-4 font-normal">{pick(c.cookieTable.name)}</th>
            <th className="py-2 pr-4 font-normal">{pick(c.cookieTable.provider)}</th>
            <th className="py-2 pr-4 font-normal">{pick(c.cookieTable.purpose)}</th>
            <th className="py-2 font-normal">{pick(c.cookieTable.duration)}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {cookieTable
            .filter((row) => row.category === category)
            .map((row) => (
              <tr key={row.name} className="align-top">
                <td className="py-2 pr-4 font-mono text-xs">{row.name}</td>
                <td className="py-2 pr-4">{row.provider}</td>
                <td className="py-2 pr-4">{pick(row.purpose)}</td>
                <td className="py-2">{pick(row.duration)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">{pick(c.eyebrow)}</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{pick(c.title)}</h1>
        <p className="mt-2 text-sm text-muted">
          {pick(c.updated)}: {updated}
        </p>
        <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed sm:text-2xl">{pick(privacyIntro)}</p>

        <div className="mt-10 divide-y divide-line border-t border-line sm:mt-14">
          {privacySections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="grid scroll-mt-20 grid-cols-1 gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10 sm:py-10"
            >
              <h2 className="text-xs uppercase tracking-widest text-muted">{pick(section.heading)}</h2>
              <div className="max-w-3xl space-y-4 leading-relaxed">
                {section.id === "finalidades" || section.id === "encargados"
                  ? section.paragraphs?.map((p, i) => <p key={i}>{pick(p)}</p>)
                  : null}
                {section.items && (
                  <ul className="list-disc space-y-2 pl-5 marker:text-muted">
                    {section.items.map((item, i) => (
                      <li key={i}>{pick(item)}</li>
                    ))}
                  </ul>
                )}
                {section.id !== "finalidades" && section.id !== "encargados"
                  ? section.paragraphs?.map((p, i) => <p key={i}>{pick(p)}</p>)
                  : null}
                {section.id === "cookies" && (
                  <div className="space-y-8 pt-2">
                    {cards("necessary")}
                    {table("necessary")}
                    {cards("analytics")}
                    {table("analytics")}
                    <button
                      type="button"
                      onClick={openConsentSettings}
                      className="inline-flex min-h-[40px] items-center border border-ink px-5 text-xs uppercase tracking-widest transition-colors hover:bg-ink hover:text-background"
                    >
                      {pick(c.footerCookies)}
                    </button>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
