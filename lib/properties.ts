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

// Properties data - easily editable by the client
export const properties: Property[] = [
  {
    id: 'casa-mafuaye',
    name: {
      en: 'Casa Mafuáye',
      es: 'Casa Mafuáye',
    },
    description: {
      en: 'An oasis of tranquility! This beautiful casa is equipped with everything needed for an unforgettable experience. Situated in nature, away from main road noise, and just minutes from the area\'s primary beaches. Enjoy 200 MB high-speed WiFi and a fully equipped kitchen in this peaceful retreat.',
      es: 'Un oasis de tranquilidad! Esta hermosa casa está equipada con todo lo necesario para una experiencia inolvidable. Situada en la naturaleza, alejada del ruido de la carretera principal, y a solo minutos de las principales playas de la zona. Disfruta de WiFi de alta velocidad de 200 MB y una cocina totalmente equipada en este refugio tranquilo.',
    },
    accommodationType: 'entire_home',
    location: {
      en: 'Nosara, Guanacaste',
      es: 'Nosara, Guanacaste',
    },
    monthlyPrice: '$2,500',
    priceNotes: {
      en: '+ electricity',
      es: '+ electricidad',
    },
    images: [
      '/images/properties/casa-mafuaye-1.png',
      '/images/properties/casa-mafuaye-2.png',
      '/images/properties/casa-mafuaye-3.png',
      '/images/properties/casa-mafuaye-4.png',
      '/images/properties/casa-mafuaye-5.png',
      '/images/properties/casa-mafuaye-6.png',
      '/images/properties/casa-mafuaye-7.png',
      '/images/properties/casa-mafuaye-8.png',
    ],
    externalUrl: 'https://www.airbnb.es/rooms/778490681170620001',
    externalPlatform: 'airbnb',
    features: {
      guests: 3,
    },
    rating: 4.96,
    reviewCount: 25,
  },
  {
    id: 'become-nosara-luxury',
    name: {
      en: 'Luxury Condo at Become Nosara',
      es: 'Condominio de Lujo en Become Nosara',
    },
    description: {
      en: 'Modern 2-bedroom luxury condo in an exclusive community spanning 13,600m². Features spacious open-concept design with high ceilings, elegant stone countertops, rainfall showers, and private outdoor spaces. Enjoy resort-style amenities including pool, yoga spaces, fitness zones, and 24/7 security in a gated community.',
      es: 'Moderno condominio de lujo de 2 habitaciones en una comunidad exclusiva de 13,600m². Cuenta con diseño abierto y espacioso con techos altos, elegantes encimeras de piedra, duchas de lluvia y espacios exteriores privados. Disfruta de amenidades tipo resort incluyendo piscina, espacios de yoga, zonas de fitness y seguridad 24/7 en una comunidad cerrada.',
    },
    accommodationType: 'condo',
    location: {
      en: 'La Esperanza, Nosara, Guanacaste',
      es: 'La Esperanza, Nosara, Guanacaste',
    },
    monthlyPrice: '$3,000',
    images: [
      '/images/properties/become-nosara-1.png',
    ],
    externalUrl: 'https://bluewaterpropertiesofcostarica.com/costa-rica-real-estate/property/luxury-condos-become-nosara/',
    externalPlatform: 'other',
    features: {
      bedrooms: 2,
      bathrooms: 2,
    },
  },
  {
    id: 'playa-pelada-home',
    name: {
      en: '3 Bedroom Home in Playa Pelada',
      es: 'Casa de 3 Habitaciones en Playa Pelada',
    },
    description: {
      en: 'A spacious, comfortable residence in the tranquil area of Playa Pelada, just three minutes from the beach. Surrounded by nature with jungle pathways connecting to both Pelada and Guiones beaches. Enjoy privacy and peaceful ambiance while staying close to supermarkets and restaurants.',
      es: 'Una residencia espaciosa y cómoda en la tranquila zona de Playa Pelada, a solo tres minutos de la playa. Rodeada de naturaleza con senderos de selva que conectan con las playas Pelada y Guiones. Disfruta de privacidad y un ambiente tranquilo mientras te mantienes cerca de supermercados y restaurantes.',
    },
    accommodationType: 'entire_home',
    location: {
      en: 'Playa Pelada, Nosara, Guanacaste',
      es: 'Playa Pelada, Nosara, Guanacaste',
    },
    monthlyPrice: '$2,800',
    images: [
      '/images/properties/playa-pelada-1.png',
    ],
    externalUrl: 'https://www.airbnb.com/l/dCIJ3UkR',
    externalPlatform: 'airbnb',
    features: {
      bedrooms: 3,
      guests: 5,
    },
    rating: 4.62,
    reviewCount: 13,
  },
];
