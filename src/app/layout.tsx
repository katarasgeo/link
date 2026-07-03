import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

const displayFont = EB_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline} — Αίγιο`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "χαλιά Αίγιο",
    "στρώματα Αίγιο",
    "καναπέδες Αίγιο",
    "κρεβάτια Αίγιο",
    "δάπεδα pvc Αίγιο",
    "κουρτίνες Αίγιο",
    "έπιπλα Αχαΐα",
  ],
  authors: [{ name: siteConfig.founder }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${displayFont.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-ivory text-ink antialiased">
        <a href="#main-content" className="skip-link">
          Μετάβαση στο περιεχόμενο
        </a>
        <LocalBusinessJsonLd />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
