import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
