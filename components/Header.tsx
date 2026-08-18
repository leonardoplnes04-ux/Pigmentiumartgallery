"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/obra", label: t.nav.obra },
    { href: "/sobre-mi", label: t.nav.sobreMi },
    { href: "/exposiciones", label: t.nav.exposiciones },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="font-serif text-sm uppercase leading-tight tracking-wide sm:text-lg"
        >
          {site.name}
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-ink hover:text-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageToggle language={language} onToggle={toggleLanguage} />
          <Link
            href="/contacto"
            className="border border-ink px-5 py-2 text-xs uppercase tracking-widest hover:bg-ink hover:text-background"
          >
            {t.nav.contacto}
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle language={language} onToggle={toggleLanguage} />
          <button
            type="button"
            aria-label={menuOpen ? t.menu.closeAria : t.menu.openAria}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="shrink-0 text-xs uppercase tracking-widest"
          >
            {menuOpen ? t.menu.close : t.menu.open}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-line px-5 py-4 sm:px-6 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs uppercase tracking-widest">
              {link.label}
            </Link>
          ))}
          <Link href="/contacto" className="text-xs uppercase tracking-widest">
            {t.nav.contacto}
          </Link>
        </nav>
      )}
    </header>
  );
}

function LanguageToggle({
  language,
  onToggle,
}: {
  language: "es" | "en";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
      className="flex items-center gap-1 text-xs uppercase tracking-widest text-ink"
    >
      <span className={language === "es" ? "font-semibold underline underline-offset-4" : "text-muted"}>
        ES
      </span>
      <span className="text-muted">|</span>
      <span className={language === "en" ? "font-semibold underline underline-offset-4" : "text-muted"}>
        EN
      </span>
    </button>
  );
}
