"use client";

import { exhibitions } from "@/data/exhibitions";
import { useLanguage } from "@/hooks/useLanguage";

export default function ExhibitionsPress() {
  const { t, pick } = useLanguage();

  return (
    <section className="border-t border-line px-5 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-widest text-muted">{t.exhibitions.eyebrow}</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{t.exhibitions.title}</h2>

        <ul className="mt-8 divide-y divide-line sm:mt-12">
          {exhibitions.map((item) => (
            <li key={item.id} className="grid grid-cols-1 gap-2 py-5 sm:py-6 md:grid-cols-[120px_1fr]">
              <p className="text-xs uppercase tracking-widest text-muted">{item.date}</p>
              <div>
                {item.link ? (
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
