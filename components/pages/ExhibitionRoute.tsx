import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExhibitionDetail from "@/components/ExhibitionDetail";
import { crumbs } from "@/data/seoText";
import { findExhibition, findExhibitionGallery } from "@/lib/exhibitions";
import { toLang, type Language } from "@/lib/routes";
import { breadcrumbJsonLd, exhibitionJsonLd, toJsonLd } from "@/lib/structuredData";

// /exposiciones/[id] and /en/exhibitions/[id]. 404 unless the show exists and
// has a loaded photo gallery.
export default function ExhibitionRoute({ id, lang }: { id: string; lang: Language }) {
  const exhibition = findExhibition(id);
  const gallery = findExhibitionGallery(id);
  if (!exhibition || !gallery) notFound();

  const image = exhibition.image ?? gallery[0]?.src;

  return (
    <>
      {/* Structured data: the show as an event + its breadcrumb trail. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: toJsonLd(exhibitionJsonLd(exhibition, image)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbJsonLd([
              { name: crumbs.home[lang], path: toLang("/", lang) },
              { name: crumbs.exhibitions[lang], path: toLang("/exposiciones", lang) },
              { name: exhibition.title[lang], path: toLang(`/exposiciones/${exhibition.id}`, lang) },
            ])
          ),
        }}
      />
      <Header />
      <main>
        <ExhibitionDetail exhibition={exhibition} gallery={gallery} />
      </main>
      <Footer />
    </>
  );
}
