import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Auto-generated at /robots.txt by Next.js.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
