import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Property Management in Nosara & Guanacaste | Hostmate Costa Rica",
  description: "Airbnb & vacation rental management in Nosara, Guanacaste. We handle listings, guest communication, cleaning & marketing. Book a free consultation.",
  alternates: {
    canonical: "https://hostmatecostarica.com/",
    languages: {
      en: "https://hostmatecostarica.com/",
      es: "https://hostmatecostarica.com/es/",
      "x-default": "https://hostmatecostarica.com/",
    },
  },
  openGraph: {
    title: "Property Management in Nosara & Guanacaste | Hostmate Costa Rica",
    description: "Airbnb & vacation rental management in Nosara, Guanacaste. We handle listings, guest communication, cleaning & marketing. Book a free consultation.",
    url: "https://hostmatecostarica.com/",
    siteName: "Hostmate Costa Rica",
    images: [
      {
        url: "https://hostmatecostarica.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hostmate Costa Rica - Property Management in Nosara & Guanacaste",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management in Nosara & Guanacaste | Hostmate Costa Rica",
    description: "Airbnb & vacation rental management in Nosara, Guanacaste. We handle listings, guest communication, cleaning & marketing.",
    images: ["https://hostmatecostarica.com/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#E85D4C",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://hostmatecostarica.com/#business",
  name: "Hostmate Costa Rica",
  description:
    "Professional property management for Airbnb and vacation rentals in Nosara, Guanacaste, Costa Rica",
  url: "https://hostmatecostarica.com/",
  image: "https://hostmatecostarica.com/images/og-image.jpg",
  logo: "https://hostmatecostarica.com/assets/logo-hostmate.webp",
  telephone: "+506-8308-3634",
  email: "info@hostmatecostarica.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nosara",
    addressRegion: "Guanacaste",
    addressCountry: "CR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.9762,
    longitude: -85.6629,
  },
  areaServed: "Nosara, Guanacaste, Costa Rica",
  serviceType: [
    "Property Management",
    "Vacation Rental Management",
    "Airbnb Co-hosting",
  ],
  sameAs: ["https://instagram.com/hostmatecostarica"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ colorScheme: 'light' }}>
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />

        {/* Preload hero poster for immediate display - DESKTOP ONLY
            Video and poster are NOT shown on mobile (<1024px) */}
        <link
          rel="preload"
          href="/images/hero-poster-new.webp"
          as="image"
          type="image/webp"
          media="(min-width: 1024px)"
        />

        {/* Structured Data - LocalBusiness */}
        <script
          id="ld-json-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />

        {/* Set correct lang for the Spanish route before hydration
            (single root layout can't vary the lang attribute per route) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.pathname.indexOf('/es')===0)document.documentElement.lang='es';",
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
