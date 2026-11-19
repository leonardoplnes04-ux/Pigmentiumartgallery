import type { Metadata } from "next";
import { artist } from "@/data/artist";

// page.tsx in this route is a client component and can't export `metadata`
// itself — see app/obra/layout.tsx for the full explanation.
export const metadata: Metadata = {
  title: `Exposiciones — ${artist.name}`,
  description: `Exposiciones y muestras de ${artist.name}.`,
  alternates: { canonical: "/exposiciones" },
};

export default function ExposicionesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
