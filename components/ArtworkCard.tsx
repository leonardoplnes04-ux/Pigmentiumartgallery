import type { Artwork } from "@/data/types";

const statusLabels: Record<Artwork["status"], string> = {
  available: "Disponible",
  sold: "Vendida",
  inquire: "Consultar",
};

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artwork.image}
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <h3 className="font-serif text-lg">{artwork.title}</h3>
          <p className="text-sm text-muted">
            {artwork.medium}, {artwork.year}
          </p>
        </div>
        <span className="text-xs uppercase tracking-widest text-muted">
          {statusLabels[artwork.status]}
        </span>
      </div>
    </article>
  );
}
