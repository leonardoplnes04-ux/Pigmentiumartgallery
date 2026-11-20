import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { realArtworks } from "@/lib/artworks";
import { exhibitions } from "@/data/exhibitions";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { performances } from "@/data/performances";
import { performanceGalleries } from "@/data/performanceGalleries";
import { toLang } from "@/lib/routes";
import { CONTENT_UPDATED } from "@/data/site";
import { SEO_PREVIEW } from "@/lib/seoPreview";

// Auto-generated at /sitemap.xml by Next.js. Static routes are listed
// directly; dynamic routes are derived from the same data the pages
// themselves render from, so a new artwork/exhibition/performance shows up
// here automatically — nothing to remember to update by hand.
//
// Every page is listed twice, Spanish (canonical URLs) and English (/en/...),
// and each entry names both versions so search engines pair them.
function bilingual(esPath: string): MetadataRoute.Sitemap {
  // The Spanish home is the bare site URL (no trailing slash), as in its canonical.
  const es = esPath === "/" ? SITE_URL : `${SITE_URL}${toLang(esPath, "es")}`;
  const en = `${SITE_URL}${toLang(esPath, "en")}`;
  const alternates = { languages: { es, en } };
  const lastModified = CONTENT_UPDATED;
  return [
    { url: es, lastModified, alternates },
    { url: en, lastModified, alternates },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/obra",
    "/sobre-mi",
    "/exposiciones",
    "/performance",
    "/videos",
    "/contacto",
    // New pages (block C): listed only when they are published (preview flag).
    ...(SEO_PREVIEW ? ["/prensa", "/arte-cubano-generacion-80", "/como-adquirir-obra"] : []),
  ].flatMap((path) => bilingual(path || "/"));

  const artworkRoutes = realArtworks
    .filter((artwork) => !artwork.noDetailPage && !artwork.featuredOnly)
    .flatMap((artwork) => bilingual(`/obra/${artwork.id}`));

  // Only exhibitions/performances with a loaded photo gallery get a detail
  // page — same gate the list pages use to decide what's clickable.
  const exhibitionRoutes = exhibitions
    .filter((exhibition) => exhibitionGalleries[exhibition.id])
    .flatMap((exhibition) => bilingual(`/exposiciones/${exhibition.id}`));

  const performanceRoutes = performances
    .filter((performance) => performanceGalleries[performance.id])
    .flatMap((performance) => bilingual(`/performance/${performance.id}`));

  return [...staticRoutes, ...artworkRoutes, ...exhibitionRoutes, ...performanceRoutes];
}
