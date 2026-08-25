import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PerformanceDetail from "@/components/PerformanceDetail";
import { performanceGalleries } from "@/data/performanceGalleries";
import { findPerformance, findPerformanceGallery } from "@/lib/performances";
import { artist } from "@/data/artist";

export function generateStaticParams() {
  return Object.keys(performanceGalleries).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const performance = findPerformance(id);
  if (!performance) return {};
  // Server-rendered metadata can't know the client's localStorage language
  // choice, so it's fixed to Spanish — see "Límite aceptado" in
  // docs/specs/2026-08-17-language-toggle-design.md.
  return {
    title: `${performance.title} — ${artist.name}`,
    description: performance.venue ? `${performance.venue}, ${performance.year}.` : performance.year,
  };
}

export default async function PerformancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
