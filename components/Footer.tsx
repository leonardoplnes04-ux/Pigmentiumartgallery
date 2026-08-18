"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t, pick } = useLanguage();

  const footerNav = [
    { href: "/obra", label: t.nav.obra },
    { href: "/sobre-mi", label: t.nav.sobreMi },
    { href: "/exposiciones", label: t.nav.exposiciones },
    { href: "/contacto", label: t.nav.contacto },
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="border-t border-line bg-background px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:gap-12 md:flex-row md:justify-between">
        <div>
          <p className="font-serif text-lg uppercase tracking-wide">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{pick(artist.tagline)}</p>
        </div>

        <nav className="flex flex-col gap-2">
          {footerNav.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-ink hover:text-muted">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          {artist.socials.instagram && (
            <a href={artist.socials.instagram} className="text-sm text-ink hover:text-muted">
              Instagram
            </a>
          )}
          <a href={`mailto:${artist.email}`} className="text-sm text-ink hover:text-muted">
            {artist.email}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex max-w-xs flex-col gap-2">
          <label htmlFor="newsletter-email" className="text-xs uppercase tracking-widest text-muted">
            {t.footer.newsletterLabel}
          </label>
          <div className="flex border border-line">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={t.footer.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button type="submit" className="px-3 text-xs uppercase tracking-widest">
              {t.footer.submit}
            </button>
          </div>
          {submitted && <p className="text-xs text-muted">{t.footer.thanks}</p>}
        </form>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted sm:mt-12">
        © {new Date().getFullYear()} {site.name}. {t.footer.rights}
      </p>
    </footer>
  );
}
