export type AccommodationType = 'entire_home' | 'apartment' | 'private_room' | 'shared_room' | 'condo';

export type ExternalPlatform = 'airbnb' | 'booking' | 'vrbo' | 'other';

export interface Property {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  accommodationType: AccommodationType;
  location: {
    en: string;
    es: string;
  };
  monthlyPrice: string;
  priceNotes?: {
    en: string;
    es: string;
  };
  images: string[];
  externalUrl: string;
  externalPlatform: ExternalPlatform;
  features?: {
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    guests?: number;
  };
  rating?: number;
  reviewCount?: number;
}

// Accommodation type labels for translations
export const accommodationTypeLabels = {
  entire_home: {
    en: 'Entire Home',
    es: 'Casa Completa',
  },
  apartment: {
    en: 'Apartment',
    es: 'Apartamento',
  },
  private_room: {
    en: 'Private Room',
    es: 'Habitación Privada',
  },
  shared_room: {
    en: 'Shared Room',
    es: 'Habitación Compartida',
  },
  condo: {
    en: 'Condominium',
    es: 'Condominio',
  },
};

// Properties data - sourced from content/properties/*.json via the CMS
// content build pipeline (scripts/build-content.mjs -> lib/content.generated.ts).
// Edit the JSON files under content/, then run `pnpm build:content`.
import { properties as generatedProperties } from './content.generated';

export const properties: Property[] = generatedProperties;
