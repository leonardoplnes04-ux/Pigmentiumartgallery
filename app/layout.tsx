import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
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

export const metadata: Metadata = {
  title: `${site.name} — ${artist.name}`,
  description: artist.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-background font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
