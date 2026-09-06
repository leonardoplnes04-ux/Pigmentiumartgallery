import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import ImageGuard from "@/components/ImageGuard";
import "./globals.css";

// Runs before first paint so dark-mode visitors never see a light flash.
// Keep in sync with hooks/useTheme.tsx: saved preference wins, else OS setting.
const themeScript = `(function(){try{var t=localStorage.getItem("dartgallery-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`;

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
export const metadata: Metadata = {
  title: `${site.name} — ${artist.name}`,
  description: artist.tagline.es,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
