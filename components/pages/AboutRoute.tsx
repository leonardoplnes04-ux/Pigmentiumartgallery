import BiographyPage from "@/components/BiographyPage";
import { faq } from "@/data/faq";
import type { Language } from "@/lib/routes";
import { faqJsonLd, profilePageJsonLd, toJsonLd } from "@/lib/structuredData";

// /sobre-mi and /en/about: biography plus the FAQPage and ProfilePage
// structured data.
export default function AboutRoute({ lang }: { lang: Language }) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: toJsonLd(profilePageJsonLd(lang)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd(faq, lang)) }}
      />
      <BiographyPage />
    </>
  );
}
