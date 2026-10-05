import type { Metadata } from "next";
import BiographyPage from "@/components/BiographyPage";
import { artist } from "@/data/artist";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Biografía — ${artist.name} — ${site.name}`,
  description: artist.shortBio.es,
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return <BiographyPage />;
}
