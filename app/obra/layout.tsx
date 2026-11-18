import type { Metadata } from "next";
import { artist } from "@/data/artist";

// page.tsx in this route is a client component ("use client"), which can't
// export `metadata` itself — this server layout carries it instead. Same
// pattern used by exposiciones/, performance/, and videos/.
export const metadata: Metadata = {
  title: `Obra de ${artist.name} — Pinturas disponibles`,
  description: `Catálogo de obra de ${artist.name}: pinturas y piezas disponibles.`,
  alternates: { canonical: "/obra" },
};

export default function ObraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
