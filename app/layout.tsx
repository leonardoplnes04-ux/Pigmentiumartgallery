import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/seo";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import ImageGuard from "@/components/ImageGuard";
import "./globals.css";

// Runs before first paint so dark-mode visitors never see a light flash.
// Keep in sync with hooks/useTheme.tsx: saved preference wins, else OS setting.
const themeScript = `(function(){try{var t=localStorage.getItem("dartgallery-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`;

// Structured data (schema.org Person) so Google can associate this site
// directly with a search for "Segundo Planes" — e.g. a knowledge-panel-style
// result rather than just a blue link. Lives on every page since the
// artist identity is site-wide, not page-specific.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: artist.name,
  url: SITE_URL,
  jobTitle: "Artista plástico",
  description: artist.shortBio.es,
  image: `${SITE_URL}${artist.heroImage}`,
  sameAs: Object.values(artist.socials).filter(Boolean),
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Server-rendered metadata can't know the client's localStorage language
// choice, so it's fixed to Spanish — see "Límite aceptado" in
// docs/specs/2026-08-17-language-toggle-design.md.
//
// This is also the fallback for every page that doesn't set its own
// `metadata`/`generateMetadata` (currently just the homepage) — pages that
// do set their own override title/description but inherit metadataBase,
// icons, and the default OG/Twitter image from here.
// artist.name === site.name, so repeating both gave "Segundo Planes — Segundo
// Planes". The descriptor adds the keywords people search with.
const title = `${artist.name} — Artista plástico cubano`;
const description = `${artist.shortBio.es} ${artist.tagline.es}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  // "Segundo Planes" is the name people will actually search — keep it
  // as the first, most specific keyword.
  keywords: [
    artist.name,
    "Segundo Planes artista",
    "Segundo Planes pintor",
    site.name,
    "arte contemporáneo",
    "galería de arte",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title,
    description,
    images: [{ url: artist.heroImage }],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [artist.heroImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Homepage LCP image — start fetching it before the CSS/JS parse. */}
        <link rel="preload" as="image" href={artist.heroImage} fetchPriority="high" />
      </head>
      <body className="bg-background font-sans text-ink antialiased">
        <ImageGuard />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
