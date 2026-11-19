import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkDetail from "@/components/ArtworkDetail";
import { crumbs } from "@/data/seoText";
import { findRealArtwork } from "@/lib/artworks";
import { toLang, type Language } from "@/lib/routes";
import { artworkJsonLd, breadcrumbJsonLd, toJsonLd } from "@/lib/structuredData";

// /obra/[id] and /en/works/[id]. 404 when the id is not a published artwork.
export default function ArtworkRoute({ id, lang }: { id: string; lang: Language }) {
  const artwork = findRealArtwork(id);
  if (!artwork) notFound();

  return (
    <>
      {/* Structured data: the work itself + its breadcrumb trail. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: toJsonLd(artworkJsonLd(artwork)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbJsonLd([
              { name: crumbs.home[lang], path: toLang("/", lang) },
              { name: crumbs.works[lang], path: toLang("/obra", lang) },
              { name: artwork.title[lang], path: toLang(`/obra/${artwork.id}`, lang) },
            ])
          ),
        }}
      />
      <Header />
      <main>
        <ArtworkDetail artwork={artwork} />
      </main>
      <Footer />
    </>
  );
}
