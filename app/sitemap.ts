import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { realArtworks } from "@/lib/artworks";
import { exhibitions } from "@/data/exhibitions";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { performances } from "@/data/performances";
import { performanceGalleries } from "@/data/performanceGalleries";

// Auto-generated at /sitemap.xml by Next.js. Static routes are listed
// directly; dynamic routes are derived from the same data the pages
// themselves render from, so a new artwork/exhibition/performance shows up
// here automatically — nothing to remember to update by hand.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/obra",
    "/sobre-mi",
    "/exposiciones",
    "/performance",
    "/videos",
    "/contacto",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const artworkRoutes: MetadataRoute.Sitemap = realArtworks
    .filter((artwork) => !artwork.noDetailPage && !artwork.featuredOnly)
    .map((artwork) => ({
      url: `${SITE_URL}/obra/${artwork.id}`,
      lastModified: new Date(),
    }));

  // Only exhibitions/performances with a loaded photo gallery get a detail
  // page — same gate the list pages use to decide what's clickable.
  const exhibitionRoutes: MetadataRoute.Sitemap = exhibitions
    .filter((exhibition) => exhibitionGalleries[exhibition.id])
    .map((exhibition) => ({
      url: `${SITE_URL}/exposiciones/${exhibition.id}`,
      lastModified: new Date(),
    }));

  const performanceRoutes: MetadataRoute.Sitemap = performances
    .filter((performance) => performanceGalleries[performance.id])
    .map((performance) => ({
      url: `${SITE_URL}/performance/${performance.id}`,
      lastModified: new Date(),
    }));

  return [...staticRoutes, ...artworkRoutes, ...exhibitionRoutes, ...performanceRoutes];
}
