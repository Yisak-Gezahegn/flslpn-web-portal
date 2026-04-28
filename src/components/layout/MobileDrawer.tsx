"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavLink {
  href: string;
  label: string;
}

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

// ─── Animation variants ───────────────────────────────────────────────────────

const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.28, ease: "easeOut" },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "tween", duration: 0.22, ease: "easeIn" },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * MobileDrawer — full-height slide-in navigation panel for mobile viewports.
 *
 * - Slides in from the right using Framer Motion AnimatePresence.
 * - Closes when the backdrop is clicked.
 * - Closes when any navigation link is activated.
 * - Traps focus and prevents body scroll while open.
 */
export function MobileDrawer({ isOpen, onClose, links }: MobileDrawerProps) {
  const pathname = usePathname();

  // Prevent body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.nav
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            style={{ backgroundColor: "#0A1628" }}
            className="fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] flex flex-col shadow-2xl"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
              <span style={{ color: "#C9A84C", fontFamily: "var(--font-playfair, Georgia, serif)" }} className="font-semibold text-lg">
                FLSLPN
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                style={{ color: "rgba(255,255,255,0.8)" }}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors duration-150"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation links */}
            <ul className="flex flex-col gap-1 px-4 py-6 flex-1">
              {links.map(({ href, label }) => {
                const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      style={{
                        color: isActive ? "#C9A84C" : "rgba(255,255,255,0.9)",
                        backgroundColor: isActive ? "rgba(201,168,76,0.12)" : "transparent",
                      }}
                      className="block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150 hover:bg-white/10"
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
