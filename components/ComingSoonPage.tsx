import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-muted">{title}</p>
        <h1 className="mt-2 font-serif text-3xl">Próximamente</h1>
      </main>
      <Footer />
    </>
  );
}
