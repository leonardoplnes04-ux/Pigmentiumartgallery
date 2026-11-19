import type { Metadata } from "next";
import AboutRoute from "@/components/pages/AboutRoute";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("about", "en");

export default function AboutPage() {
  return <AboutRoute lang="en" />;
}
