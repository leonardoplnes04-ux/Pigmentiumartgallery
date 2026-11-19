import type { Metadata } from "next";
import PerformanceListPage from "@/components/pages/PerformanceListPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("performance", "es");

export default PerformanceListPage;
