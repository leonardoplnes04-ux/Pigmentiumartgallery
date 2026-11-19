import type { Metadata } from "next";
import ExhibitionRoute from "@/components/pages/ExhibitionRoute";
import { exhibitionGalleries } from "@/data/exhibitionGalleries";
import { findExhibition, findExhibitionGallery } from "@/lib/exhibitions";
import { exhibitionMetadata } from "@/lib/metadata";

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
  const image = exhibition.image ?? findExhibitionGallery(id)?.[0]?.src;
  return exhibitionMetadata(exhibition, image, "en");
}

export default async function ExhibitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ExhibitionRoute id={id} lang="en" />;
}
