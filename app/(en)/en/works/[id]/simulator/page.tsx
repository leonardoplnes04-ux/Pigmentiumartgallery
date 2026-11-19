import SimulatorRoute from "@/components/pages/SimulatorRoute";
import { realArtworks } from "@/lib/artworks";

// Same set as the Spanish /obra/[id]/simulador: only artworks with confirmed
// real-world dimensions.
export function generateStaticParams() {
  return realArtworks.filter((artwork) => artwork.realDimensionsCm).map((artwork) => ({ id: artwork.id }));
}

export default async function SimulatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SimulatorRoute id={id} />;
}
