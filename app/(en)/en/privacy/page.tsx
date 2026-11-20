import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("privacy", "en");

export default function PrivacyRoutePage() {
  return <PrivacyPage />;
}
