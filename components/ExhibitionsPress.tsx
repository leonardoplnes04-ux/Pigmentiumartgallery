import { exhibitions } from "@/data/exhibitions";

export default function ExhibitionsPress() {
  return (
    <section className="border-t border-line px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-widest text-muted">Exposiciones y prensa</p>
        <h2 className="mt-2 font-serif text-3xl">Trayectoria</h2>

        <ul className="mt-12 divide-y divide-line">
          {exhibitions.map((item) => (
            <li key={item.id} className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[120px_1fr]">
              <p className="text-xs uppercase tracking-widest text-muted">{item.date}</p>
              <div>
                {item.link ? (
                  <a
                    href={item.link}
                    className="font-serif text-lg underline underline-offset-4"
                  >
                    {item.title}
                  </a>
                ) : (
                  <p className="font-serif text-lg">{item.title}</p>
                )}
                <p className="text-sm text-muted">{item.venue}</p>
                <p className="mt-1 text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
