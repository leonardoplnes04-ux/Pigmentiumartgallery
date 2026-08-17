import ArtworkCard from "@/components/ArtworkCard";
import { artworks } from "@/data/artworks";

const FEATURED_COUNT = 6;

export default function FeaturedWorks() {
  const featured = artworks.slice(0, FEATURED_COUNT);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-widest text-muted">Obra</p>
      <h2 className="mt-2 font-serif text-3xl">Obra destacada</h2>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}
