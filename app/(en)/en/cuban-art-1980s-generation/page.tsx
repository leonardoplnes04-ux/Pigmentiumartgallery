import type { Metadata } from "next";
import TopicRoute from "@/components/pages/TopicRoute";
import { sectionMetadata } from "@/lib/metadata";

// Published only with NEXT_PUBLIC_SEO_PREVIEW=1 (404 otherwise).
export const metadata: Metadata = sectionMetadata("cubanArt", "en");

export default function CubanArtPage() {
  return <TopicRoute topic="cubanArt" lang="en" />;
}
