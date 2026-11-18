import type { Metadata } from "next";
import BiographyPage from "@/components/BiographyPage";
import { artist } from "@/data/artist";

export const metadata: Metadata = {
  title: `Biografía — ${artist.name}`,
  description: artist.shortBio.es,
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return <BiographyPage />;
}
