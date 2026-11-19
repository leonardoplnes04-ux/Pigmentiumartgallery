import type { Metadata } from "next";
import ArtworkRoute from "@/components/pages/ArtworkRoute";
import { realArtworks, findRealArtwork } from "@/lib/artworks";
import { artworkMetadata } from "@/lib/metadata";

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
  return artwork ? artworkMetadata(artwork, "es") : {};
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ArtworkRoute id={id} lang="es" />;
}
