import { Inter, Playfair_Display } from "next/font/google";

/**
 * Inter — primary sans-serif font for body text and UI elements.
 * Exposed as CSS variable --font-inter for use in Tailwind config.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Playfair Display — serif font for headings and decorative text.
 * Exposed as CSS variable --font-playfair for use in Tailwind config.
 */
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});
