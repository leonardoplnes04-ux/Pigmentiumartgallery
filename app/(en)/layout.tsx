import type { ReactNode } from "react";
import RootDocument from "@/lib/rootLayout";
import { rootMetadata } from "@/lib/metadata";

// Root layout of the English mirror (everything under /en). It is its own root
// layout so the document says <html lang="en">; pages reuse the same shared
// components as the Spanish tree in app/(es)/.
export const metadata = rootMetadata("en");

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
