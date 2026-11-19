import type { ReactNode } from "react";
import RootDocument from "@/lib/rootLayout";
import { rootMetadata } from "@/lib/metadata";

// Root layout of the Spanish site (canonical URLs, no prefix). The English
// mirror lives in app/(en)/ with its own root layout so <html lang> is right.
export const metadata = rootMetadata("es");

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
