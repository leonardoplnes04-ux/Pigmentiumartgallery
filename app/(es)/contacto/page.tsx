import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("contact", "es");

export default function ContactoPage() {
  return <ContactPage />;
}
