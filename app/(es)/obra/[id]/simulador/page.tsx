import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WallSimulator from "@/components/WallSimulator";
import { realArtworks, findMeasuredArtwork } from "@/lib/artworks";

// Only artworks with confirmed real-world dimensions get this route —
// see docs/specs/2026-08-17-wall-simulator-design.md.
export function generateStaticParams() {
  return realArtworks.filter((artwork) => artwork.realDimensionsCm).map((artwork) => ({ id: artwork.id }));
}

export default async function SimuladorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artwork = findMeasuredArtwork(id);
  if (!artwork) notFound();

  return (
    <>
      <Header />
      <main>
        <WallSimulator artwork={artwork} />
      </main>
      <Footer />
    </>
  );
}
