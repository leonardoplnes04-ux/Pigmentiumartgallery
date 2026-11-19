"use client";

import { useState, type FormEvent } from "react";
import { api } from "@/convex/_generated/api";
import { getConvex } from "@/lib/convexClient";
import Link from "next/link";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const { t, pick, language, href } = useLanguage();

  const footerNav = [
    { href: href("/obra"), label: t.nav.obra },
    { href: href("/sobre-mi"), label: t.nav.sobreMi },
    { href: href("/exposiciones"), label: t.nav.exposiciones },
    { href: href("/contacto"), label: t.nav.contacto },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const convex = getConvex();
      if (!convex) throw new Error("convex_not_configured");
      await convex.mutation(api.subscribers.subscribe, { email, lang: language });
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <footer className="border-t border-line bg-background px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div>
          <p className="font-serif text-lg uppercase tracking-wide">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{pick(artist.tagline)}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
          <nav className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-muted">{t.footer.navLabel}</p>
            <div className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-ink hover:text-muted">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-muted">{t.footer.connectLabel}</p>
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
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <button
                type="submit"
                disabled={state === "sending"}
                className="px-3 text-xs uppercase tracking-widest disabled:cursor-wait disabled:opacity-60"
              >
                {state === "sending" ? t.footer.sending : t.footer.submit}
              </button>
            </div>
            {state === "done" && (
              <p role="status" className="text-xs text-muted">
                {t.footer.thanks}
              </p>
            )}
            {state === "error" && (
              <p role="alert" className="text-xs text-red-700 dark:text-red-400">
                {t.footer.error}
              </p>
            )}
          </form>
        </div>

        <p className="border-t border-line pt-8 text-xs uppercase tracking-widest text-muted">
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
