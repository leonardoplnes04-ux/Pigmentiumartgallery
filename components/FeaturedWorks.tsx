import FeaturedCarousel from "@/components/FeaturedCarousel";
import { artworks } from "@/data/artworks";

export default function FeaturedWorks() {
  // Featured spotlights real artwork photography; placeholder pieces stay
  // out of the curated carousel (they still appear in the full catalog).
  const featured = artworks.filter((artwork) => !artwork.image.includes("placeholder"));

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-widest text-muted">Obra</p>
      <h2 className="mt-2 font-serif text-3xl">Obra destacada</h2>

      <div className="mt-12">
        <FeaturedCarousel artworks={featured} />
      </div>
    </section>
  );
}
