import { site } from "@/data/site";

// Visible deterrent overlay for artwork photography — tiled, low-opacity,
// mix-blend-difference so it reads on both light and dark images without
// per-photo tuning. Purely a deterrent/attribution layer: it does NOT
// prevent screenshots (nothing on the web can), but it means a screenshot
// or a right-click-saved copy still carries the gallery's mark. Parent
// element must be `relative overflow-hidden` for `inset-0` to line up.
export default function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid grid-cols-2 place-items-center gap-8 select-none sm:grid-cols-3"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className="-rotate-[30deg] whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-white opacity-40 mix-blend-difference"
        >
          {site.name}
        </span>
      ))}
    </div>
  );
}
