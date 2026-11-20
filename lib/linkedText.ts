// Inline links in editorial text, written as [text](/spanish-path). Rendered
// by components/LinkedText.tsx; plainText() strips them for JSON-LD/metadata.
export const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function plainText(text: string): string {
  return text.replace(INLINE_LINK, "$1");
}
