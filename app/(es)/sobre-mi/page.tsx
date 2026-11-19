import type { Metadata } from "next";
import AboutRoute from "@/components/pages/AboutRoute";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("about", "es");

export default function SobreMiPage() {
  return <AboutRoute lang="es" />;
}
