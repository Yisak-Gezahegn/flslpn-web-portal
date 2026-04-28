import type { Metadata } from "next";
import { inter, playfairDisplay } from "@/styles/fonts";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLSLPN — Female Law Students & Legal Professionals Network",
  description:
    "The official portal of the Female Law Students & Legal Professionals Network at Haramaya University.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch SiteSettings once at the layout level.
  // contactEmail is passed to Footer; heroImages/missionStatement are used per-page.
  let siteSettings: SiteSettings | null = null;
  try {
    siteSettings = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  } catch {
    // CMS unavailable (e.g. missing env vars during development) — render with fallback
  }

  const contactEmail = siteSettings?.contactEmail ?? "hu.flslpn@gmail.com";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      {/* FOUC-prevention script — runs synchronously before React hydration */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d)){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-navy text-navy dark:text-white antialiased" suppressHydrationWarning>
        {/* Skip-to-content for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer contactEmail={contactEmail} />
        </ThemeProvider>
      </body>
    </html>
  );
}
