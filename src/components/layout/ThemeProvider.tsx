"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "dark" | "light";

export interface ThemeContextValue {
  /** Current active theme */
  theme: Theme;
  /** Toggle between dark and light */
  toggle: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

// ─── Storage key ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "theme";

/**
 * Reads the initial theme from localStorage or falls back to
 * the OS `prefers-color-scheme` preference.
 * Safe to call only in the browser (after mount).
 */
function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage may be unavailable (e.g. private browsing restrictions)
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider — wraps the app and manages dark/light mode.
 *
 * - Reads `localStorage` on mount to restore the user's preference.
 * - Falls back to `prefers-color-scheme` when no stored preference exists.
 * - Applies/removes the `dark` class on `<html>` whenever the theme changes.
 * - Persists the chosen theme to `localStorage`.
 * - Exposes `ThemeContext` with `{ theme, toggle }` for any child component.
 *
 * The FOUC-prevention inline `<script>` in `app/layout.tsx` handles the
 * initial class application before React hydrates, so there is no flash.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Start with "light" on the server; correct value is set after mount.
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // On mount: read the real preference and sync the <html> class.
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  // Whenever theme changes (after mount), sync <html> class + localStorage.
  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore write failures
    }
  }, [theme, mounted]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}
