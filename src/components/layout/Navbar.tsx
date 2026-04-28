"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileDrawer, type NavLink } from "@/components/layout/MobileDrawer";

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isScrolled = useScrolled();
  const pathname = usePathname();

  return (
    <>
      <header
        style={{
          backgroundColor: isScrolled ? "rgba(10,22,40,0.95)" : "#0A1628",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo + Organisation name */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
              aria-label="FLSLPN — go to home page"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: "#C9A84C" }}>
                <Image
                  src="/logo.jpg"
                  alt="FLSLPN logo"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <span style={{ color: "#C9A84C", fontFamily: "var(--font-playfair, Georgia, serif)" }} className="font-bold text-lg leading-tight hidden sm:block">
                FLSLPN
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: isActive ? "#C9A84C" : "rgba(255,255,255,0.85)",
                      borderBottom: isActive ? "2px solid #C9A84C" : "2px solid transparent",
                    }}
                    className="px-3 py-2 text-sm font-medium transition-all duration-150 hover:bg-white/10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isDrawerOpen}
                style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              >
                <HamburgerIcon />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        links={NAV_LINKS}
      />

      <div className="h-16" aria-hidden="true" />
    </>
  );
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
