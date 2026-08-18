"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";

export default function ComingSoonPage({ navKey }: { navKey: "sobreMi" | "exposiciones" | "contacto" }) {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-muted">{t.nav[navKey]}</p>
        <h1 className="mt-2 font-serif text-3xl">{t.comingSoon.title}</h1>
      </main>
      <Footer />
    </>
  );
}
