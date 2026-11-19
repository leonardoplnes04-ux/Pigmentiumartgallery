import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PerformanceDetail from "@/components/PerformanceDetail";
import { findPerformance, findPerformanceGallery } from "@/lib/performances";

// /performance/[id] and /en/performance/[id]. 404 unless the piece exists and
// has a loaded photo gallery.
export default function PerformanceRoute({ id }: { id: string }) {
  const performance = findPerformance(id);
  const gallery = findPerformanceGallery(id);
  if (!performance || !gallery) notFound();

  return (
    <>
      <Header />
      <main>
        <PerformanceDetail performance={performance} gallery={gallery} />
      </main>
      <Footer />
    </>
  );
}
