import { artworks } from "@/data/artworks";
import type { Artwork } from "@/data/types";

// Only real artwork photography is public-facing; placeholder pieces
// (Interiores/Derivas) stay out until there's real content to replace
// them. Shared by the catalog, detail, and wall-simulator routes.
export const realArtworks: Artwork[] = artworks.filter((a) => !a.image.includes("placeholder"));

export function findRealArtwork(id: string): Artwork | undefined {
  return realArtworks.find((artwork) => artwork.id === id);
}

// Artworks whose real-world dimensions are confirmed — gates the wall
// simulator (see docs/specs/2026-08-17-wall-simulator-design.md).
export function findMeasuredArtwork(
  id: string
): (Artwork & { realDimensionsCm: { width: number; height: number } }) | undefined {
  const artwork = findRealArtwork(id);
  if (!artwork?.realDimensionsCm) return undefined;
  return artwork as Artwork & { realDimensionsCm: { width: number; height: number } };
}
