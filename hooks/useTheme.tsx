"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "dartgallery-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The server always renders without `.dark`; the inline script in
  // layout.tsx applies the real theme before first paint. After mount we
  // read that same decision back so React state matches what's on screen —
  // saved preference wins, otherwise the OS setting. Mirrors useLanguage.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const resolved: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setThemeState(resolved);
    applyTheme(resolved);
  }, []);

  function setTheme(next: Theme) {
    window.localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
    applyTheme(next);
  }

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
