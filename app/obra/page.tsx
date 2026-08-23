"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { realArtworks } from "@/lib/artworks";
import { useLanguage } from "@/hooks/useLanguage";

function ObraGrid() {
  const { t } = useLanguage();
  // "Obras disponibles" (Hero) links here with ?disponibles=1 to show only
  // artworks still for sale, instead of duplicating /obra as a new route.
  // useSearchParams needs a Suspense boundary (see wrapper below) or Next's
  // build fails on this page.
  const onlyAvailable = useSearchParams().get("disponibles") === "1";
  const artworks = onlyAvailable
    ? realArtworks.filter((artwork) => artwork.status === "available")
    : realArtworks;

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 md:py-16">
      <p className="text-xs uppercase tracking-widest text-muted">{t.catalog.eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
        {onlyAvailable ? t.hero.ctaTertiary : t.catalog.title}
      </h1>

      {/* items-start: cards keep their own height (each artwork's own
          aspect ratio, see components/ArtworkCard.tsx) instead of being
          stretched to match the tallest card in their row. */}
      <div className="mt-8 grid grid-cols-1 items-start gap-x-8 gap-y-12 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <Link key={artwork.id} href={`/obra/${artwork.id}`}>
            <ArtworkCard artwork={artwork} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default function ObraPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <ObraGrid />
      </Suspense>
      <Footer />
    </>
  );
}
