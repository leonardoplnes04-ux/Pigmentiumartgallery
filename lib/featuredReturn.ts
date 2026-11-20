// Remembers that the visitor opened an artwork from the home "Obra destacada"
// carousel, so the artwork page can send them back to the carousel (same
// card) instead of the /obra catalogue. Lives in sessionStorage: per tab,
// gone when the tab closes. Every access is guarded (private mode, blocked
// storage) and the site works the same without it.

const KEY = "dartgallery-featured-return";
// Older than this, a saved position is ignored.
const MAX_AGE_MS = 30 * 60 * 1000;

// Id of the home carousel section, the target of the "back" link.
export const FEATURED_SECTION_ID = "obra-destacada";

interface FeaturedReturn {
  artworkId: string;
  index: number;
  at: number;
}

export function saveFeaturedReturn(artworkId: string, index: number) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ artworkId, index, at: Date.now() }));
  } catch {}
}

export function readFeaturedReturn(): FeaturedReturn | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as FeaturedReturn;
    if (typeof data?.index !== "number" || Date.now() - data.at > MAX_AGE_MS) return null;
    return data;
  } catch {
    return null;
  }
}

export function clearFeaturedReturn() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
