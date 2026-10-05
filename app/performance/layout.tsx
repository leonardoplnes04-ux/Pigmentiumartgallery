import type { Metadata } from "next";
import { artist } from "@/data/artist";
import { site } from "@/data/site";

// page.tsx in this route is a client component and can't export `metadata`
// itself — see app/obra/layout.tsx for the full explanation.
export const metadata: Metadata = {
  title: `Performance — ${artist.name} — ${site.name}`,
  description: `Performances de ${artist.name}.`,
  alternates: { canonical: "/performance" },
};

export default function PerformanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
