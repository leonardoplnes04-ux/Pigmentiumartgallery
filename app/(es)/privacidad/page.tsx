import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("privacy", "es");

export default function PrivacidadPage() {
  return <PrivacyPage />;
}
