import { exhibitions } from "@/data/exhibitions";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import type { Exhibition, ExhibitionGalleryImage } from "@/data/types";

export function findExhibition(id: string): Exhibition | undefined {
  return exhibitions.find((item) => item.id === id);
}

// Only exhibitions with a full photo set get a detail page — gates the
// "click to open" behavior on the exhibitions list, same pattern as
// findMeasuredArtwork() gating the wall simulator.
export function findExhibitionGallery(id: string): ExhibitionGalleryImage[] | undefined {
  return exhibitionGalleries[id];
}
