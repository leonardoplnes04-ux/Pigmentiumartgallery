import type { Metadata } from "next";
import CatalogPage from "@/components/pages/CatalogPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("works", "en");

export default CatalogPage;
