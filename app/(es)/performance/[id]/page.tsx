import type { Metadata } from "next";
import PerformanceRoute from "@/components/pages/PerformanceRoute";
import { performanceGalleries } from "@/data/performanceGalleries";
import { findPerformance, findPerformanceGallery } from "@/lib/performances";
import { performanceMetadata } from "@/lib/metadata";

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
  return performanceMetadata(performance, findPerformanceGallery(id)?.[0]?.src, "es");
}

export default async function PerformancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PerformanceRoute id={id} />;
}
