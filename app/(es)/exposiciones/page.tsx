import type { Metadata } from "next";
import ExhibitionsListPage from "@/components/pages/ExhibitionsListPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("exhibitions", "es");

export default ExhibitionsListPage;
