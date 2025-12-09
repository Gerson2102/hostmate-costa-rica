import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hostmate Costa Rica - Premium Property Management",
  description: "Administración profesional de alojamientos para Airbnb, Booking y más. Maximiza tu rentabilidad sin preocupaciones. Tu socio premium en Costa Rica.",
  keywords: "Airbnb, Booking, administración de propiedades, Costa Rica, alquiler vacacional, co-anfitrión, property management, premium",
  openGraph: {
    title: "Hostmate Costa Rica - Tu Propiedad, Nuestra Pasión",
    description: "Administración profesional premium de alojamientos para Airbnb, Booking y más.",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
