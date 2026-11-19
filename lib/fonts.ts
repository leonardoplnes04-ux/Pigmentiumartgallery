import { Fraunces, Inter } from "next/font/google";

// next/font loaders must run at module scope. Both root layouts (Spanish and
// English) share these two instances through lib/rootLayout.tsx.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
