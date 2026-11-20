"use client";

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { INLINE_LINK } from "@/lib/linkedText";

// Renders a string with inline links written as [text](/spanish-path). Paths
// are Spanish canonical ones and are localized to the current language.
// Only internal paths ("/…") are turned into links.
export default function LinkedText({ text }: { text: string }) {
  const { href } = useLanguage();
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      <Link key={index} href={href(match[2])} className="underline underline-offset-4 hover:text-muted">
        {match[1]}
      </Link>
    );
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)}</>;
}
