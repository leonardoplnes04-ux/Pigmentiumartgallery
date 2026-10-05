import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { artist } from "@/data/artist";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Contacto — ${artist.name} — ${site.name}`,
  description: `Adquirir obra, encargos, exposiciones y prensa: contacta a ${artist.name}, ${site.name}.`,
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return <ContactPage />;
}
