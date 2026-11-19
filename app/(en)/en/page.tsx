import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata: Metadata = sectionMetadata("home", "en");

export default HomePage;
