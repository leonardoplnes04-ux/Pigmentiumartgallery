import { performances } from "@/data/performances";
import { performanceGalleries } from "@/data/performanceGalleries";
import type { Performance, PerformanceGalleryImage } from "@/data/types";

export function findPerformance(id: string): Performance | undefined {
  return performances.find((item) => item.id === id);
}

export function findPerformanceGallery(id: string): PerformanceGalleryImage[] | undefined {
  return performanceGalleries[id];
}
