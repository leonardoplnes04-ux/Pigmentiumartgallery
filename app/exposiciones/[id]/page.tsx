import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExhibitionDetail from "@/components/ExhibitionDetail";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { findExhibition, findExhibitionGallery } from "@/lib/exhibitions";
import { artist } from "@/data/artist";

export function generateStaticParams() {
  return Object.keys(exhibitionGalleries).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const exhibition = findExhibition(id);
  if (!exhibition) return {};
  // Server-rendered metadata can't know the client's localStorage language
  // choice, so it's fixed to Spanish — see "Límite aceptado" in
  // docs/specs/2026-08-17-language-toggle-design.md.
  const title = `${exhibition.title.es} — ${artist.name}`;
  const description = `${exhibition.venue}, ${exhibition.date}.`;
  const galleryImage = findExhibitionGallery(id)?.[0]?.src;
  const image = exhibition.image ?? galleryImage;
  return {
    title,
    description,
    alternates: { canonical: `/exposiciones/${exhibition.id}` },
    openGraph: { title, description, images: image ? [{ url: image }] : undefined },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ExhibitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exhibition = findExhibition(id);
  const gallery = findExhibitionGallery(id);
  if (!exhibition || !gallery) notFound();

  return (
    <>
      <Header />
      <main>
        <ExhibitionDetail exhibition={exhibition} gallery={gallery} />
      </main>
      <Footer />
    </>
  );
}
