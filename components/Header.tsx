"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import type { UiStrings } from "@/data/translations";
import { counterpart, type Language } from "@/lib/routes";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/hooks/useTheme";
import { GlowButton } from "@/components/unlumen-ui/primitives/glow";

// Glow for the Contacto nav button. Dark mode swaps to a white aura (per the user's request)
// instead of the multicolor rotate, which read as muddy against the dark
// background.
const GLOW_COLORS_LIGHT = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"];
const GLOW_COLORS_DARK = ["#FFFFFF", "#F2F2F2", "#FFFFFF", "#E6E6E6"];
// The white dark-mode aura reads bigger than the multicolor one at the same
// scale/blur, so it's dialed back to keep it from overwhelming the buttons.
const GLOW_SCALE_LIGHT = 1;
const GLOW_SCALE_DARK = 0.75;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, t, href } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  // Language switch = link to the same page in the other language, keeping the
  // query string (contact deep links, ?disponibles=1) once the page is mounted.
  const pathname = usePathname();
  const search = useLocationSearch();
  const languageHrefs: Record<Language, string> = {
    es: counterpart(pathname, "es") + search,
    en: counterpart(pathname, "en") + search,
  };
  const glowColors = theme === "dark" ? GLOW_COLORS_DARK : GLOW_COLORS_LIGHT;
  const glowScale = theme === "dark" ? GLOW_SCALE_DARK : GLOW_SCALE_LIGHT;
  const glowBlur = theme === "dark" ? "medium" : "strong";

  const navLinks = [
    { href: href("/obra"), label: t.nav.obra },
    { href: href("/sobre-mi"), label: t.nav.sobreMi },
    { href: href("/exposiciones"), label: t.nav.exposiciones },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <Link
          href={href("/")}
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
          <LanguageToggle language={language} hrefs={languageHrefs} t={t} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />
          <GlowButton
            asChild
            mode="rotate"
            blur={glowBlur}
            duration={5}
            glowScale={glowScale}
            colors={glowColors}
            className="bg-ink text-background shadow-sm hover:bg-ink/90"
          >
            <Link href={href("/contacto")}>{t.nav.contacto}</Link>
          </GlowButton>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle language={language} hrefs={languageHrefs} t={t} />
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
          <Link href={href("/contacto")} className="text-xs uppercase tracking-widest">
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

// Each option is a plain link to the same page in that language (a real URL,
// so search engines can follow it). The current language is marked with
// aria-current and is not a link target worth following, but stays a link so
// the markup is identical in both languages.
function LanguageToggle({
  language,
  hrefs,
  t,
}: {
  language: Language;
  hrefs: Record<Language, string>;
  t: UiStrings;
}) {
  const options: Language[] = ["es", "en"];
  return (
    <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
      {options.map((option, index) => (
        <span key={option} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-muted">|</span>}
          <Link
            href={hrefs[option]}
            lang={option}
            hrefLang={option}
            aria-current={language === option}
            className={
              language === option
                ? "font-semibold text-ink underline underline-offset-4"
                : "text-muted hover:text-ink"
            }
          >
            {t.langNames[option]}
          </Link>
        </span>
      ))}
    </div>
  );
}
