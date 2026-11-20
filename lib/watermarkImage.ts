import path from "node:path";
import sharp from "sharp";

// Personalised watermarked copy of an artwork photo (block D, server only).
// Two layers over the photo, resized to 1600 px on its long side:
//   (a) a diagonal tile of "SEGUNDO PLANES" at low opacity, like the on-site
//       components/Watermark.tsx (blend "difference" so it reads on light and
//       dark paintings alike);
//   (b) a semi-transparent strip along the bottom with
//       "Imagen preparada para {name} · {dd/mm/aaaa} · segundoplanes.com".
// Text is drawn with sharp's text input (Pango) from a bundled OFL font,
// because Vercel functions have no system fonts.

export const FONT_FILE = path.join(process.cwd(), "assets", "fonts", "Inter-Variable.ttf");
const FONT = "Inter";
const MAX_SIDE = 1600;

// Names go into Pango markup: strip anything that could be markup and cap
// the length (the strip has room for ~60 characters).
export function cleanName(name: string): string {
  return name.replace(/[<>&"'`]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
}

export function formatDate(date: Date): string {
  // dd/mm/aaaa in the studio's time zone (Monterrey).
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Monterrey",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function stripText(name: string, lang: "es" | "en", date: Date): string {
  const who = cleanName(name);
  return lang === "en"
    ? `Image prepared for ${who} · ${formatDate(date)} · segundoplanes.com`
    : `Imagen preparada para ${who} · ${formatDate(date)} · segundoplanes.com`;
}

async function textImage(markup: string, opts: { width?: number; height?: number; dpi?: number }) {
  return sharp({
    text: {
      text: markup,
      font: FONT,
      fontfile: FONT_FILE,
      rgba: true,
      align: "centre",
      ...opts,
    },
  })
    .png()
    .toBuffer();
}

export async function watermarkArtwork(
  source: Buffer,
  name: string,
  lang: "es" | "en",
  date = new Date()
): Promise<Buffer> {
  const base = await sharp(source)
    .rotate()
    .resize(MAX_SIDE, MAX_SIDE, { fit: "inside", withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = base.info;

  // (a) Diagonal tile. One rotated "SEGUNDO PLANES" with generous transparent
  // padding, repeated across the image.
  const fontPx = Math.max(14, Math.round(Math.min(width, height) / 38));
  // At dpi 72 one point is one pixel; Pango sizes are in 1024ths of a point.
  const word = await textImage(
    `<span foreground="#ffffff" alpha="60%" size="${fontPx * 1024}" letter_spacing="${Math.round(fontPx * 0.25 * 1024)}">SEGUNDO PLANES</span>`,
    { dpi: 72 }
  );
  const gap = Math.round(fontPx * 2);
  let tile = await sharp(word)
    .extend({ top: gap, bottom: gap, left: gap, right: gap, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .rotate(-30, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  // A tile can never be larger than the image it covers.
  const tileMeta = await sharp(tile).metadata();
  if ((tileMeta.width ?? 0) > width || (tileMeta.height ?? 0) > height) {
    tile = await sharp(tile).resize(width, height, { fit: "inside" }).png().toBuffer();
  }

  // (b) Bottom strip.
  const stripHeight = Math.max(40, Math.round(height * 0.06));
  const strip = await sharp({
    create: { width, height: stripHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.62 } },
  })
    .png()
    .toBuffer();
  const label = await textImage(
    `<span foreground="#ffffff">${stripText(name, lang, date)}</span>`,
    { width: Math.round(width * 0.92), height: Math.round(stripHeight * 0.46) }
  );
  const labelMeta = await sharp(label).metadata();

  return sharp(base.data)
    .composite([
      { input: tile, tile: true, blend: "difference" },
      { input: strip, top: height - stripHeight, left: 0 },
      {
        input: label,
        top: height - stripHeight + Math.round((stripHeight - (labelMeta.height ?? 0)) / 2),
        left: Math.round((width - (labelMeta.width ?? 0)) / 2),
      },
    ])
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}
