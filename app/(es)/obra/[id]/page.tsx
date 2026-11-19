import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkDetail from "@/components/ArtworkDetail";
import { realArtworks, findRealArtwork } from "@/lib/artworks";
import { artist } from "@/data/artist";
import { artworkJsonLd, breadcrumbJsonLd, toJsonLd } from "@/lib/structuredData";

export function generateStaticParams() {
  return realArtworks.map((artwork) => ({ id: artwork.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artwork = findRealArtwork(id);
  if (!artwork) return {};
  // Server-rendered metadata can't know the client's localStorage
  // language choice, so it's fixed to Spanish — see "Límite aceptado"
  // in docs/specs/2026-08-17-language-toggle-design.md.
  const title = `${artwork.title.es} — ${artist.name}`;
  const description = artwork.year
    ? `${artwork.medium.es}, ${artwork.year}.`
    : `${artwork.medium.es}.`;
  return {
    title,
    description,
    alternates: { canonical: `/obra/${artwork.id}` },
    openGraph: { title, description, images: [{ url: artwork.image }] },
    twitter: { card: "summary_large_image", title, description, images: [artwork.image] },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
              { name: "Inicio", path: "/" },
              { name: "Obra", path: "/obra" },
              { name: artwork.title.es, path: `/obra/${artwork.id}` },
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
