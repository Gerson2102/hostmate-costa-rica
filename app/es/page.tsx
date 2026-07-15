import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';
import { HomePage } from '@/components/HomePage';

export const metadata: Metadata = {
  title: "Administración de Propiedades en Nosara y Guanacaste | Hostmate",
  description: "Administración de Airbnb y alquileres vacacionales en Nosara, Guanacaste. Anuncios, huéspedes, limpieza y marketing. Agenda tu consulta gratis.",
  alternates: {
    canonical: "https://hostmatecostarica.com/es/",
    languages: {
      en: "https://hostmatecostarica.com/",
      es: "https://hostmatecostarica.com/es/",
      "x-default": "https://hostmatecostarica.com/",
    },
  },
  openGraph: {
    title: "Administración de Propiedades en Nosara y Guanacaste | Hostmate",
    description: "Administración de Airbnb y alquileres vacacionales en Nosara, Guanacaste. Anuncios, huéspedes, limpieza y marketing. Agenda tu consulta gratis.",
    url: "https://hostmatecostarica.com/es/",
    siteName: "Hostmate Costa Rica",
    images: [
      {
        url: "https://hostmatecostarica.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hostmate Costa Rica - Administración de Propiedades en Nosara y Guanacaste",
      },
    ],
    locale: "es_CR",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Administración de Propiedades en Nosara y Guanacaste | Hostmate",
    description: "Administración de Airbnb y alquileres vacacionales en Nosara, Guanacaste. Anuncios, huéspedes, limpieza y marketing.",
    images: ["https://hostmatecostarica.com/images/og-image.jpg"],
  },
};

export default function HomeEs() {
  return (
    <LanguageProvider initialLanguage="es">
      <HomePage />
    </LanguageProvider>
  );
}
