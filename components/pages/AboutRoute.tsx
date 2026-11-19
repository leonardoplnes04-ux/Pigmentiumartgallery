import BiographyPage from "@/components/BiographyPage";
import { faq } from "@/data/faq";
import type { Language } from "@/lib/routes";
import { faqJsonLd, toJsonLd } from "@/lib/structuredData";

// /sobre-mi and /en/about: biography plus the FAQPage structured data.
export default function AboutRoute({ lang }: { lang: Language }) {
  void lang;
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
