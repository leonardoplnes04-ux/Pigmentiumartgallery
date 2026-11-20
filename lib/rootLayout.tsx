import type { ReactNode } from "react";
import { artist } from "@/data/artist";
import { artistJsonLd, toJsonLd, websiteJsonLd } from "@/lib/structuredData";
import { fraunces, inter } from "@/lib/fonts";
import type { Language } from "@/lib/routes";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import ImageGuard from "@/components/ImageGuard";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import "@/app/globals.css";

// Runs before first paint so dark-mode visitors never see a light flash.
// Keep in sync with hooks/useTheme.tsx: saved preference wins, else OS setting.
const themeScript = `(function(){try{var t=localStorage.getItem("dartgallery-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`;

// The whole <html> document, shared by the two root layouts: app/(es)/layout.tsx
// and app/(en)/layout.tsx. `lang` fixes the document language.
export default function RootDocument({
  lang,
  children,
}: {
  lang: Language;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <head>
        {/* themeScript adds class="dark" to <html> before hydration; the
            suppressHydrationWarning above is what keeps React from flagging
            that server/client <html> className mismatch. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: toJsonLd(artistJsonLd(lang)) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd(lang)) }}
        />
        {/* Homepage LCP image — start fetching it before the CSS/JS parse. */}
        <link rel="preload" as="image" href={artist.heroImage} fetchPriority="high" />
      </head>
      <body className="bg-background font-sans text-ink antialiased">
        <ImageGuard />
        <Analytics />
        <ThemeProvider>
          <LanguageProvider language={lang}>
            {children}
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
