"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import type { UiStrings } from "@/data/translations";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/hooks/useTheme";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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
          <LanguageToggle language={language} onChange={setLanguage} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />
          <Link
            href="/contacto"
            className="border border-ink px-5 py-2 text-xs uppercase tracking-widest hover:bg-ink hover:text-background"
          >
            {t.nav.contacto}
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle language={language} onChange={setLanguage} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />
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

function ThemeToggle({
  theme,
  onToggle,
  t,
}: {
  theme: Theme;
  onToggle: () => void;
  t: UiStrings;
}) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? t.theme.toLightAria : t.theme.toDarkAria}
      className="shrink-0 text-muted transition-colors hover:text-ink"
    >
      {isDark ? (
        // sun — currently dark, click for light
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // moon — currently light, click for dark
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function LanguageToggle({
  language,
  onChange,
}: {
  language: "es" | "en";
  onChange: (next: "es" | "en") => void;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
      <button
        type="button"
        onClick={() => onChange("es")}
        aria-current={language === "es"}
        className={
          language === "es" ? "font-semibold text-ink underline underline-offset-4" : "text-muted hover:text-ink"
        }
      >
        Español
      </button>
      <span className="text-muted">|</span>
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-current={language === "en"}
        className={
          language === "en" ? "font-semibold text-ink underline underline-offset-4" : "text-muted hover:text-ink"
        }
      >
        Inglés
      </button>
    </div>
  );
}
