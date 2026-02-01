import type { Metadata, Viewport } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://luminang.com'),
  title: {
    default: "Luminang - The Language Adventure",
    template: "%s | Luminang"
  },
  description: "Embark on a grand adventure across a fictionalized pre-colonial archipelago. Decode ancient dialects, unlock hidden regions, and master the languages of the isles.",
  keywords: ["game", "language learning", "RPG", "Philippines", "adventure", "educational"],
  authors: [{ name: "Luminang Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luminang.com",
    title: "Luminang - The Language Adventure",
    description: "Decode ancient dialects and explore the archipelago.",
    siteName: "Luminang",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luminang Game Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminang - The Language Adventure",
    description: "Decode ancient dialects and explore the archipelago.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { Providers } from "@/providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="font-sans bg-black text-white antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}