import type { Metadata } from "next";
import BiographyPage from "@/components/BiographyPage";
import { artist } from "@/data/artist";
import { faq } from "@/data/faq";
import { faqJsonLd, toJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: `Biografía — ${artist.name}`,
  description: artist.shortBio.es,
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd(faq)) }}
      />
      <BiographyPage />
    </>
  );
}
