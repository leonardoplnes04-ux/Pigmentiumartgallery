import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import ArtistStatement from "@/components/ArtistStatement";
import ExhibitionsPress from "@/components/ExhibitionsPress";
import ContactBanner from "@/components/ContactBanner";
import Footer from "@/components/Footer";

// Home page body, shared by "/" and "/en".
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
