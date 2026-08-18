"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language, LocalizedText } from "@/data/types";
import { translations } from "@/data/translations";

const STORAGE_KEY = "dartgallery-lang";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (typeof translations)[Language];
  pick: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  // Read the saved preference after mount only — the server always
  // renders "es", so this can only run client-side without causing a
  // hydration mismatch. See "Límite aceptado" in the design doc.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") setLanguage(saved);
  }, []);

  function toggleLanguage() {
    setLanguage((current) => {
      const next = current === "es" ? "en" : "es";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  const value: LanguageContextValue = {
    language,
    toggleLanguage,
    t: translations[language],
    pick: (text) => text[language],
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
