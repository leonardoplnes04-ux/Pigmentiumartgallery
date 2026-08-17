import Link from "next/link";
import { artist } from "@/data/artist";
import { artworks } from "@/data/artworks";

export default function Hero() {
  const featured = artworks[0];

  return (
    <section className="relative flex h-[90vh] min-h-[560px] items-end overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={featured.image}
        alt={featured.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-background">
        <p className="text-xs uppercase tracking-widest">{artist.tagline}</p>
        <h1 className="mt-2 font-serif text-5xl md:text-7xl">{artist.name}</h1>
        <Link
          href="/obra"
          className="mt-8 inline-block border border-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-background hover:text-ink"
        >
          Ver obra
        </Link>
      </div>
    </section>
  );
}
