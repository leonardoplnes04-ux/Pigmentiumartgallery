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

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const artwork = findArtwork(params.id);
  if (!artwork) return {};
  return {
    title: `${artwork.title} — ${artist.name}`,
    description: `${artwork.medium}, ${artwork.year}.`,
  };
}

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = findArtwork(params.id);
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
