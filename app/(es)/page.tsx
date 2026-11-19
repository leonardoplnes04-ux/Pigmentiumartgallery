import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { sectionMetadata } from "@/lib/metadata";

// Title/description come from the root layout; the home declares its alternates.
export const metadata: Metadata = sectionMetadata("home", "es");

export default HomePage;
