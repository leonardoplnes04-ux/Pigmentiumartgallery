import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkDetail from "@/components/ArtworkDetail";
import { artworks } from "@/data/artworks";
import { artist } from "@/data/artist";

// Catalog only ever shows real (non-placeholder) artwork — same filter
// used by the homepage carousel and the /obra catalog grid.
const realArtworks = artworks.filter((a) => !a.image.includes("placeholder"));

export function generateStaticParams() {
  return realArtworks.map((artwork) => ({ id: artwork.id }));
}

function findArtwork(id: string) {
  return realArtworks.find((artwork) => artwork.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artwork = findArtwork(id);
  if (!artwork) return {};
  // Server-rendered metadata can't know the client's localStorage
  // language choice, so it's fixed to Spanish — see "Límite aceptado"
  // in docs/specs/2026-08-17-language-toggle-design.md.
  return {
    title: `${artwork.title.es} — ${artist.name}`,
    description: `${artwork.medium.es}, ${artwork.year}.`,
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artwork = findArtwork(id);
  if (!artwork) notFound();

  return (
    <>
      <Header />
      <main>
        <ArtworkDetail artwork={artwork} />
      </main>
      <Footer />
    </>
  );
}
