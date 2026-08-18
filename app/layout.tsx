import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { LanguageProvider } from "@/hooks/useLanguage";
import "./globals.css";

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
      <body className="bg-background font-sans text-ink antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
