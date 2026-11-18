import type { Metadata } from "next";
import { artist } from "@/data/artist";

// page.tsx in this route is a client component and can't export `metadata`
// itself — see app/obra/layout.tsx for the full explanation.
export const metadata: Metadata = {
  title: `Videos — ${artist.name}`,
  description: `Videos de exposiciones e inauguraciones de ${artist.name}.`,
  alternates: { canonical: "/videos" },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
