import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import ArtistStatement from "@/components/ArtistStatement";
import ExhibitionsPress from "@/components/ExhibitionsPress";
import ContactBanner from "@/components/ContactBanner";
import Footer from "@/components/Footer";

// Title/description come from the root layout; the home only sets its canonical
// (it used to inherit "/" from app/layout.tsx).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedWorks />
        <ArtistStatement />
        <ExhibitionsPress />
        <ContactBanner />
      </main>
      <Footer />
    </>
  );
}
