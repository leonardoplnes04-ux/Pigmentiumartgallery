import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks } from "@/data/artworks";

// Same filter used by the homepage carousel: only real artwork photography
// is public-facing. Placeholder pieces (Interiores/Derivas) stay out until
// there's real content to replace them.
const realArtworks = artworks.filter((a) => !a.image.includes("placeholder"));

export default function ObraPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <p className="text-xs uppercase tracking-widest text-muted">Obra</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl">Catálogo</h1>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {realArtworks.map((artwork) => (
            <Link key={artwork.id} href={`/obra/${artwork.id}`}>
              <ArtworkCard artwork={artwork} />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
