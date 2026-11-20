import type { Metadata } from "next";
import SimulatorRoute from "@/components/pages/SimulatorRoute";
import { findMeasuredArtwork, realArtworks } from "@/lib/artworks";
import { simulatorMetadata } from "@/lib/metadata";

// Only artworks with confirmed real-world dimensions get this route —
// see docs/specs/2026-08-17-wall-simulator-design.md.
export function generateStaticParams() {
  return realArtworks.filter((artwork) => artwork.realDimensionsCm).map((artwork) => ({ id: artwork.id }));
}

// noindex,follow + canonical to the artwork page (lib/metadata.ts).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artwork = findMeasuredArtwork(id);
  return artwork ? simulatorMetadata(artwork, "es") : {};
}

export default async function SimuladorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SimulatorRoute id={id} />;
}
