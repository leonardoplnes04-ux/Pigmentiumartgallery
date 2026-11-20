import { notFound } from "next/navigation";
import PressPage from "@/components/PressPage";
import TopicPage from "@/components/TopicPage";
import { crumbs, seoText } from "@/data/seoText";
import { pressPage, topicPages } from "@/data/topicPages";
import { plainText } from "@/lib/linkedText";
import { toLang, type Language } from "@/lib/routes";
import { SEO_PREVIEW } from "@/lib/seoPreview";
import {
  aboutArtistPageJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  toJsonLd,
} from "@/lib/structuredData";

// /prensa, /arte-cubano-generacion-80, /como-adquirir-obra and their English
// mirrors. Published only with the SEO preview flag on; otherwise 404, so the
// live site is unchanged until the owner turns it on.
export default function TopicRoute({
  topic,
  lang,
}: {
  topic: "press" | "cubanArt" | "acquire";
  lang: Language;
}) {
  if (!SEO_PREVIEW) notFound();

  const page = topic === "press" ? pressPage : topicPages[topic];
  const name = page.h1[lang];
  const jsonLd: unknown[] = [
    aboutArtistPageJsonLd(
      topic === "press" ? "CollectionPage" : "WebPage",
      page.esPath,
      name,
      seoText[topic].description[lang],
      lang
    ),
    breadcrumbJsonLd([
      { name: crumbs.home[lang], path: toLang("/", lang) },
      { name, path: toLang(page.esPath, lang) },
    ]),
  ];
  // FAQPage only when the questions are visible on the page (1:1).
  if (topic !== "press" && topicPages[topic].faq) {
    const items = topicPages[topic].faq!.items.map((item) => ({
      q: item.q,
      a: { es: plainText(item.a.es), en: plainText(item.a.en) },
    }));
    jsonLd.push(faqJsonLd(items, lang));
  }

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
        />
      ))}
      {topic === "press" ? <PressPage /> : <TopicPage topic={topic} />}
    </>
  );
}
