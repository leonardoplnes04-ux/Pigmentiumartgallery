import { artist } from "@/data/artist";

export default function ContactBanner() {
  return (
    <section className="border-t border-line bg-ink px-5 py-16 text-background sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-widest text-background/60">Contacto</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl">¿Te interesa una pieza?</h2>
        <p className="mt-4 text-sm text-background/80 sm:text-base">
          Escríbeme para consultar disponibilidad, precio o encargos a medida.
        </p>
        <a
          href={`mailto:${artist.email}`}
          className="mt-6 inline-block border border-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-background hover:text-ink sm:mt-8"
        >
          Escribir
        </a>
      </div>
    </section>
  );
}
