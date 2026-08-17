import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import ArtistStatement from "@/components/ArtistStatement";
import SeriesGrid from "@/components/SeriesGrid";
import ExhibitionsPress from "@/components/ExhibitionsPress";
import ContactBanner from "@/components/ContactBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedWorks />
        <ArtistStatement />
        <SeriesGrid />
        <ExhibitionsPress />
        <ContactBanner />
      </main>
      <Footer />
    </>
  );
}
