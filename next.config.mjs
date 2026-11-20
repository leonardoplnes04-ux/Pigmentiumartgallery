/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  // /api/imagen-obra reads the catalogue photo and the bundled font from disk
  // (lib/watermarkImage.ts). Only the folders that hold catalogue images are
  // traced (public/images is ~150 MB in total), plus the font.
  outputFileTracingIncludes: {
    "/api/imagen-obra": [
      "./public/images/obras/**/*",
      "./public/images/*.{jpg,jpeg,png,webp}",
      "./assets/fonts/**/*",
    ],
  },

  experimental: {
    // Tree-shake the heaviest client chunk (framer-motion, ~42 kB gz,
    // only used by the home carousel).
    optimizePackageImports: ["framer-motion"],
  },

  async headers() {
    return [
      {
        // Artwork photos in public/images are content-stable (filenames
        // never change once published), so let browsers and the CDN keep
        // them for a year instead of revalidating on every repeat visit.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
