import type { GalleryArtist } from "./types";

// Artists shown/filterable on /exposiciones. Today only Segundo Planes has
// exhibitions loaded; add more entries here as the gallery represents more
// artists, then tag their exhibitions with the matching `artistId` in
// data/exhibitions.ts.
export const galleryArtists: GalleryArtist[] = [
  { id: "segundo-planes", name: "Segundo Planes" },
];
