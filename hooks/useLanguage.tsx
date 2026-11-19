"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LocalizedText } from "@/data/types";
import { translations } from "@/data/translations";
import { toLang, type Language } from "@/lib/routes";

interface LanguageContextValue {
  language: Language;
  t: (typeof translations)[Language];
  pick: (text: LocalizedText) => string;
  // Turns a Spanish canonical path ("/obra", "/contacto?obra=…") into the URL
  // for the current language. Use it for every internal link.
  href: (esPath: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// The language comes from the route tree (app/(es) is "es", app/(en) is "en"),
// so the server renders the right text on first paint. There is no saved
// preference: switching language is a link to the equivalent URL.
export function LanguageProvider({
  language,
  children,
}: {
  language: Language;
  children: ReactNode;
}) {
  const value: LanguageContextValue = {
    language,
    t: translations[language],
    pick: (text) => text[language],
    href: (esPath) => toLang(esPath, language),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
