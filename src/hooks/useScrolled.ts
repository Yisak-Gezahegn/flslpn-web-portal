"use client";

import { useEffect, useState } from "react";

/** Scroll threshold in pixels — matches Requirement 3.6 */
const SCROLL_THRESHOLD = 80;

/**
 * Returns `true` when the page has been scrolled strictly more than 80px
 * from the top. Updates on every scroll event and cleans up the listener
 * when the component unmounts.
 *
 * Used by the Navbar to apply background blur and shadow.
 */
export function useScrolled(): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Set initial state in case the page loads already scrolled
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrolled;
}
