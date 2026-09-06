import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Values live in app/globals.css as RGB channels; the channel form
        // keeps <alpha-value> working (bg-ink/20, from-ink, etc.).
        background: "rgb(var(--color-background) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
