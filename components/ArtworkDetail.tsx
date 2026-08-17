import Link from "next/link";
import type { Artwork } from "@/data/types";
import { artist } from "@/data/artist";

const statusLabels: Record<Artwork["status"], string> = {
  available: "Disponible",
  sold: "Vendida",
  inquire: "Consultar",
};

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  const gallery = [artwork.image, ...(artwork.additionalImages ?? [])];

  return (
    <article className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <Link
        href="/obra"
        className="text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        ← Volver a obra
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        {/* Imagen — proporción natural respetada, sin recorte forzado. */}
        <div className="flex flex-col gap-3">
          {gallery.map((src, i) => (
            <div key={src} className="overflow-hidden rounded-2xl bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={i === 0 ? artwork.title : `${artwork.title} — detalle ${i + 1}`}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            {artwork.status === "available"
              ? "Disponible"
              : artwork.status === "sold"
                ? "Vendida"
                : "Consultar disponibilidad"}
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{artwork.title}</h1>

          {/* Ficha técnica */}
          <dl className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Año</dt>
              <dd>{artwork.year}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Técnica</dt>
              <dd className="text-right">{artwork.medium}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Dimensiones</dt>
              <dd className="text-right">{artwork.dimensions}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Estado</dt>
              <dd>{statusLabels[artwork.status]}</dd>
            </div>
          </dl>

          <a
            href={`mailto:${artist.email}?subject=${encodeURIComponent(
              `Consulta sobre "${artwork.title}"`
            )}`}
            className="mt-8 inline-block border border-ink px-6 py-3 text-xs uppercase tracking-widest hover:bg-ink hover:text-background"
          >
            Consultar disponibilidad
          </a>

          {/* Comentarios de críticos */}
          {artwork.criticReviews && artwork.criticReviews.length > 0 && (
            <div className="mt-10 space-y-6 border-t border-line pt-6">
              <p className="text-xs uppercase tracking-widest text-muted">
                Crítica
              </p>
              {artwork.criticReviews.map((review, i) => (
                <blockquote key={i}>
                  <p className="font-serif text-lg leading-relaxed">
                    “{review.quote}”
                  </p>
                  <footer className="mt-2 text-xs uppercase tracking-widest text-muted">
                    {review.critic} — {review.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
