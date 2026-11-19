"use client";

import { useEffect, useState } from "react";

// The current query string ("?obra=…"), available only after mount: "" on the
// server and on the first client render so static pages hydrate cleanly.
// useSearchParams is avoided on purpose — it forces every page that renders
// the header to opt out of static prerendering without a Suspense boundary.
export function useLocationSearch(): string {
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(window.location.search);
  }, []);
  return search;
}
