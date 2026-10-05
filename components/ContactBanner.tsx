"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export default function ContactBanner() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-line bg-ink px-5 py-16 text-background sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-widest text-background/60">{t.contact.eyebrow}</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{t.contact.title}</h2>
        <p className="mt-4 text-sm text-background/80 sm:text-base">{t.contact.body}</p>
        <Link
          href="/contacto"
          className="mt-6 inline-block bg-background px-6 py-3 text-xs uppercase tracking-widest text-ink transition-opacity hover:opacity-90 sm:mt-8"
        >
          {t.contact.cta}
        </Link>
      </div>
    </section>
  );
}
