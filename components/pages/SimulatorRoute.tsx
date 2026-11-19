import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WallSimulator from "@/components/WallSimulator";
import { findMeasuredArtwork } from "@/lib/artworks";

// /obra/[id]/simulador and /en/works/[id]/simulator. Only artworks with
// confirmed real-world dimensions get this route — see
// docs/specs/2026-08-17-wall-simulator-design.md.
export default function SimulatorRoute({ id }: { id: string }) {
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
