"use client";

import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "@/components/layout/ThemeProvider";

/**
 * Hook to access the current theme and toggle function.
 *
 * Must be used inside a component wrapped by `ThemeProvider`.
 *
 * @example
 * const { theme, toggle } = useTheme();
 * // theme === 'dark' | 'light'
 * // toggle() switches between the two
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  return context;
}
