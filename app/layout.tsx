import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Prevents FOIT (Flash of Invisible Text)
  preload: true,
});

export const metadata: Metadata = {
  title: "Hostmate Costa Rica - Premium Property Management",
  description: "Professional property management for Airbnb, Booking, and more. Maximize your revenue without the hassle. Your premium partner in Costa Rica.",
  keywords: "Airbnb, Booking, property management, Costa Rica, vacation rental, co-host, property management, premium",
  openGraph: {
    title: "Hostmate Costa Rica - Your Property, Our Passion",
    description: "Professional premium property management for Airbnb, Booking, and more.",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#E85D4C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />

        {/* Preload hero video (MP4 prioritized - smaller file size: 9.6MB vs 26MB WebM) */}
        {/* Only preload on desktop (1024px+) to save bandwidth on mobile/tablet */}
        <link
          rel="preload"
          href="/videos/Bg-video-optimized.mp4"
          as="video"
          type="video/mp4"
          media="(min-width: 1024px)"
        />

        {/* Preload hero poster for immediate display - DESKTOP ONLY
            Video and poster are NOT shown on mobile (<1024px) */}
        <link
          rel="preload"
          href="/images/hero-poster-new.webp"
          as="image"
          type="image/webp"
          media="(min-width: 1024px)"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
