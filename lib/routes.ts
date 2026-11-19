// Route translation between the Spanish site (canonical URLs) and its English
// mirror under /en. Pure module with no imports so Node can run its tests
// directly. Spanish paths are the canonical form: `toLang` takes one of them
// and returns the equivalent URL in the requested language.

export type Language = "es" | "en";

const ES_TO_EN: Record<string, string> = {
  obra: "works",
  "sobre-mi": "about",
  exposiciones: "exhibitions",
  performance: "performance",
  videos: "videos",
  contacto: "contact",
  simulador: "simulator",
};

const EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(ES_TO_EN).map(([es, en]) => [en, es])
);

// "/a/b?x=1#h" -> { segments: ["a","b"], suffix: "?x=1#h" }
function split(path: string): { segments: string[]; suffix: string } {
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const suffix = cut === -1 ? "" : path.slice(cut);
  return { segments: pathname.split("/").filter(Boolean), suffix };
}

function join(segments: string[], suffix: string): string {
  return `/${segments.join("/")}${suffix}`;
}

export function languageOfPath(path: string): Language {
  return split(path).segments[0] === "en" ? "en" : "es";
}

// Any path (es or en) -> its Spanish canonical path.
export function esPathOf(path: string): string {
  const { segments, suffix } = split(path);
  if (segments[0] !== "en") return join(segments, suffix);
  return join(
    segments.slice(1).map((segment) => EN_TO_ES[segment] ?? segment),
    suffix
  );
}

// Spanish canonical path -> equivalent path in `lang`.
export function toLang(esPath: string, lang: Language): string {
  const { segments, suffix } = split(esPath);
  if (lang === "es") return join(segments, suffix);
  return join(["en", ...segments.map((segment) => ES_TO_EN[segment] ?? segment)], suffix);
}

// Any path -> the equivalent path in `to`.
export function counterpart(path: string, to: Language): string {
  return toLang(esPathOf(path), to);
}
