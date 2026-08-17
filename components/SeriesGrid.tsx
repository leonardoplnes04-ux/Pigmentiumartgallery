import { seriesList } from "@/data/series";

export default function SeriesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-widest text-muted">Series</p>
      <h2 className="mt-2 font-serif text-3xl">Cuerpos de obra</h2>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {seriesList.map((series) => (
          <article key={series.id} className="group">
            <div className="relative aspect-[16/10] overflow-hidden bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={series.coverImage}
                alt={series.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-serif text-xl">{series.name}</h3>
            <p className="mt-1 text-sm text-muted">{series.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
