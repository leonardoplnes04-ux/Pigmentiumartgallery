import type { Metadata } from "next";
import VideosRoute from "@/components/pages/VideosRoute";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("videos", "en");

export default function VideosPage() {
  return <VideosRoute lang="en" />;
}
