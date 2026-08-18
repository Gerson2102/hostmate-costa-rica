import {
  services as generatedServices,
  plans as generatedPlans,
  team as generatedTeam,
} from './content.generated';

export type Language = 'en' | 'es';

// Services, plans, and team bios are sourced from content/*.json via the CMS
// content build pipeline (scripts/build-content.mjs -> lib/content.generated.ts).
// Nav labels, form copy, and other static UI text below stay hardcoded here.
const serviceItems = (lang: Language) =>
  generatedServices.map((service) => ({
    title: service.title[lang],
    description: service.description[lang],
  }));

const planItems = (lang: Language) =>
  generatedPlans.map((plan) => ({
    name: plan.name[lang],
    description: plan.description[lang],
    services: plan.services.map((service) => service[lang]),
    cta: plan.cta[lang],
  }));

const teamMember = (id: string, lang: Language) => {
  const member = generatedTeam.find((m) => m.id === id);
  if (!member) {
    throw new Error(`Team member "${id}" not found in generated content`);
  }
  return {
    name: member.name[lang],
    role: member.role[lang],
    greeting: member.greeting[lang],
    bio: member.bio[lang],
  };
};

export const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      team: 'Team',
      services: 'Services',
      properties: 'Properties',
      testimonials: 'Testimonials',
      booking: 'Book Consultation',
      workWithUs: 'Work With Us',
      bookConsultation: 'Book Consultation',
      contact: 'Contact',
    },

    // Hero Section
    hero: {
      overline: 'Consulting & Property Management',
      headline1: 'Your Property,',
      headline2: 'Our Passion',
      subtitle: 'Professional property management for Airbnb, Booking, and more. Maximize your revenue without the hassle.',
      cta: 'Book Your Free Consultation',
      card: {
        yourProperty: 'Your Property',
        location: 'Guanacaste, Costa Rica',
        occupancy: 'Occupancy',
        rating: 'Rating',
        income: 'Income',
        managedBy: 'Managed by Hostmate',
        superhost: 'Superhost',
        support: 'Support',
      },
      scrollMore: 'Discover more',
    },

    // About Section
    about: {
      overline: 'Who We Are',
      headline1: 'Your Trusted',
      headline2: 'Partner',
      paragraph1: 'We are a company dedicated to property management for Airbnb, Booking, and other platforms. Our main goal is to provide real estate investors and independent owners the opportunity to',
      paragraph1Highlight: 'generate profitability',
      paragraph1End: 'with their investments.',
      paragraph2: 'At Hostmate, we provide you with the best co-host for your properties, advise you on how to become a',
      paragraph2Highlight: 'Superhost',
      paragraph2End: ', and offer a variety of services to keep your properties in excellent condition.',
      link: 'Discover our services',
      stats: {
        properties: 'Properties',
        satisfaction: 'Satisfaction',
        rating: 'Rating',
        support: 'Support',
      },
      cta: {
        title: 'Ready to get started?',
        subtitle: 'Book a free consultation',
      },
    },

    // Team Section
    team: {
      overline: 'THE TEAM',
      headline: 'Know the',
      headlineHighlight: 'Team',
      vanessa: teamMember('vanessa', 'en'),
      julian: teamMember('julian', 'en'),
    },

    // Services Section
    services: {
      overline: 'What We Do',
      headline: 'Our Services',
      items: serviceItems('en'),
    },

    // Properties Section
    properties: {
      overline: 'Our Portfolio',
      headline: 'Featured Properties',
      subtitle: 'Discover the beautiful properties we manage across Costa Rica',
      viewListing: 'View Listing',
      viewOnAirbnb: 'View on Airbnb',
      perMonth: '/month',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      guests: 'Guests',
      aboutSpace: 'About this space',
      location: 'Location',
      accommodationType: 'Accommodation Type',
      monthlyRate: 'Monthly Rate',
      rating: 'rating',
      reviews: 'reviews',
      filterAll: 'All',
      filterEntireHome: 'Entire Home',
      filterApartment: 'Apartment',
      filterCondo: 'Condominium',
      filterPrivateRoom: 'Private Room',
      noProperties: 'No properties found matching your criteria.',
    },

    // Plans Section
    plans: {
      overline: 'Plans',
      headline: 'Choose the Perfect Plan for You',
      subtitle: 'Choose the plan that best fits your needs and your property.',
      mostPopular: 'Most Popular',
      items: planItems('en'),
    },

    // Testimonials Section
    testimonials: {
      overline: 'TESTIMONIALS',
      headline: 'What Our',
      headlineHighlight: 'Guests Say',
      subtitle: 'Real experiences from guests who\'ve stayed at properties managed by Hostmate.',
      noReviews: 'No reviews yet. Be the first to share your experience!',
      formTitle: 'Share Your Experience',
      formSubtitle: 'Stayed at one of our properties? We\'d love to hear about it.',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Sarah M.',
      countryLabel: 'City & Country',
      countryPlaceholder: 'e.g. Austin, Texas',
      emailLabel: 'Email (optional, not displayed)',
      emailPlaceholder: 'your@email.com',
      reviewLabel: 'Your Review',
      reviewPlaceholder: 'Tell us about your stay\u2026',
      charCount: 'characters remaining',
      submit: 'Submit Review',
      submitting: 'Submitting\u2026',
      successTitle: 'Thank you!',
      successMessage: 'Your review has been submitted and will appear after approval.',
      errorMessage: 'Something went wrong. Please try again.',
    },

    // Booking Section
    booking: {
      overline: 'Get Started Now',
      headline: 'Book Your',
      headlineHighlight: 'Free Consultation',
      subtitle: 'Book a free 1:1 session to define your needs and create a tailored plan. No commitment, just a conversation about how we can help you.',
      benefits: [
        '100% free consultation',
        'Property analysis',
        'Personalized plan',
        'No commitment',
      ],
      cta: 'Book Consultation',
      altContact: 'Prefer to contact us directly?',
    },

    // Work With Us Section
    workWithUs: {
      overline: 'Join Our Team',
      headline: 'Work With Us',
      subtitle: 'Are you passionate about hospitality and property management? We are looking for talented individuals to join our growing team. Apply today and become part of the Hostmate family.',
      buttonText: 'Be Part of Hostmate',
    },

    // Footer
    footer: {
      description: 'Your trusted partner for property management in Costa Rica. Maximize your revenue without the hassle.',
      contact: 'Contact',
      linksTitle: 'Links',
      links: {
        about: 'About Us',
        services: 'Services',
        properties: 'Properties',
        booking: 'Book Consultation',
      },
      rights: 'All rights reserved.',
    },

    // Meta
    meta: {
      title: 'Property Management in Nosara & Guanacaste | Hostmate Costa Rica',
      description: 'Airbnb & vacation rental management in Nosara, Guanacaste. We handle listings, guest communication, cleaning & marketing. Book a free consultation.',
    },
  },

  es: {
    // Navigation
    nav: {
      about: 'Nosotros',
      team: 'Equipo',
      services: 'Servicios',
      properties: 'Propiedades',
      testimonials: 'Testimonios',
      booking: 'Agendar Consulta',
      workWithUs: 'Trabaja con Nosotros',
      bookConsultation: 'Agendar Consulta',
      contact: 'Contacto',
    },

    // Hero Section
    hero: {
      overline: 'Consulting & Property Management',
      headline1: 'Tu Propiedad,',
      headline2: 'Nuestra Pasión',
      subtitle: 'Administración profesional de alojamientos para Airbnb, Booking y más. Maximiza tu rentabilidad sin preocupaciones.',
      cta: 'Agenda tu Consulta Gratis',
      card: {
        yourProperty: 'Tu Propiedad',
        location: 'Guanacaste, Costa Rica',
        occupancy: 'Ocupación',
        rating: 'Rating',
        income: 'Ingresos',
        managedBy: 'Administrado por Hostmate',
        superhost: 'Superhost',
        support: 'Soporte',
      },
      scrollMore: 'Descubre más',
    },

    // About Section
    about: {
      overline: 'Quiénes Somos',
      headline1: 'Tu Socio de',
      headline2: 'Confianza',
      paragraph1: 'Somos una empresa dedicada a la administración de alojamientos para Airbnb, Booking y otras aplicaciones. Nuestro principal objetivo es brindarle a inversionistas inmobiliarios y dueños independientes la oportunidad de',
      paragraph1Highlight: 'generar rentabilidad',
      paragraph1End: 'con sus inversiones.',
      paragraph2: 'En Hostmate te brindamos el mejor co-anfitrión para tus propiedades, además te asesoramos en cómo llegar a ser un',
      paragraph2Highlight: 'súper anfitrión',
      paragraph2End: 'y te brindamos una variedad de servicios para que las propiedades se encuentren siempre en buen estado.',
      link: 'Conoce nuestros servicios',
      stats: {
        properties: 'Propiedades',
        satisfaction: 'Satisfacción',
        rating: 'Rating',
        support: 'Soporte',
      },
      cta: {
        title: '¿Listo para empezar?',
        subtitle: 'Agenda una consulta gratuita',
      },
    },

    // Team Section
    team: {
      overline: 'EL EQUIPO',
      headline: 'Conozca a Nuestro',
      headlineHighlight: 'Equipo',
      vanessa: teamMember('vanessa', 'es'),
      julian: teamMember('julian', 'es'),
    },

    // Services Section
    services: {
      overline: 'Lo Que Hacemos',
      headline: 'Nuestros Servicios',
      items: serviceItems('es'),
    },

    // Properties Section
    properties: {
      overline: 'Nuestro Portafolio',
      headline: 'Propiedades Destacadas',
      subtitle: 'Descubre las hermosas propiedades que administramos en Costa Rica',
      viewListing: 'Ver Anuncio',
      viewOnAirbnb: 'Ver en Airbnb',
      perMonth: '/mes',
      bedrooms: 'Habitaciones',
      bathrooms: 'Baños',
      guests: 'Huéspedes',
      aboutSpace: 'Sobre este espacio',
      location: 'Ubicación',
      accommodationType: 'Tipo de Alojamiento',
      monthlyRate: 'Precio Mensual',
      rating: 'calificación',
      reviews: 'reseñas',
      filterAll: 'Todos',
      filterEntireHome: 'Casa Completa',
      filterApartment: 'Apartamento',
      filterCondo: 'Condominio',
      filterPrivateRoom: 'Habitación Privada',
      noProperties: 'No se encontraron propiedades que coincidan con tu búsqueda.',
    },

    // Plans Section
    plans: {
      overline: 'Planes',
      headline: 'Elige el Plan Perfecto para Ti',
      subtitle: 'Elige el plan que más se ajuste a las necesidades tuyas y de tu alojamiento.',
      mostPopular: 'Más Popular',
      items: planItems('es'),
    },

    // Testimonials Section
    testimonials: {
      overline: 'TESTIMONIOS',
      headline: 'Lo Que Dicen',
      headlineHighlight: 'Nuestros Huéspedes',
      subtitle: 'Experiencias reales de huéspedes que se han hospedado en propiedades administradas por Hostmate.',
      noReviews: 'Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!',
      formTitle: 'Comparte Tu Experiencia',
      formSubtitle: '¿Te hospedaste en una de nuestras propiedades? Nos encantaría saber cómo fue tu experiencia.',
      nameLabel: 'Tu Nombre',
      namePlaceholder: 'ej. María G.',
      countryLabel: 'Ciudad y País',
      countryPlaceholder: 'ej. San José, Costa Rica',
      emailLabel: 'Correo (opcional, no se muestra)',
      emailPlaceholder: 'tu@correo.com',
      reviewLabel: 'Tu Reseña',
      reviewPlaceholder: 'Cu\u00e9ntanos sobre tu estad\u00eda\u2026',
      charCount: 'caracteres restantes',
      submit: 'Enviar Reseña',
      submitting: 'Enviando\u2026',
      successTitle: '¡Gracias!',
      successMessage: 'Tu reseña ha sido enviada y aparecerá después de ser aprobada.',
      errorMessage: 'Algo salió mal. Por favor, intenta de nuevo.',
    },

    // Booking Section
    booking: {
      overline: 'Comienza Ahora',
      headline: 'Agenda tu Consulta',
      headlineHighlight: 'Gratuita',
      subtitle: 'Agenda una sesión 1:1 gratuita para definir tus necesidades y hacerte un plan a la medida. Sin compromiso, solo conversamos sobre cómo podemos ayudarte.',
      benefits: [
        'Consulta 100% gratuita',
        'Análisis de tu propiedad',
        'Plan personalizado',
        'Sin compromiso',
      ],
      cta: 'Agendar Consulta',
      altContact: '¿Prefieres contactarnos directamente?',
    },

    // Work With Us Section
    workWithUs: {
      overline: 'Únete a Nuestro Equipo',
      headline: 'Trabaja con Nosotros',
      subtitle: '¿Te apasiona la hospitalidad y la administración de propiedades? Estamos buscando personas talentosas para unirse a nuestro equipo en crecimiento. Aplica hoy y forma parte de la familia Hostmate.',
      buttonText: 'Sé Parte de Hostmate',
    },

    // Footer
    footer: {
      description: 'Tu socio de confianza para la administración de propiedades en Costa Rica. Maximiza tu rentabilidad sin preocupaciones.',
      contact: 'Contacto',
      linksTitle: 'Enlaces',
      links: {
        about: 'Sobre Nosotros',
        services: 'Servicios',
        properties: 'Propiedades',
        booking: 'Agendar Consulta',
      },
      rights: 'Todos los derechos reservados.',
    },

    // Meta
    meta: {
      title: 'Administración de Propiedades en Nosara y Guanacaste | Hostmate Costa Rica',
      description: 'Administración de alquileres vacacionales y Airbnb en Nosara, Guanacaste. Gestionamos listados, comunicación con huéspedes, limpieza y marketing. Agenda una consulta gratis.',
    },
  },
} as const;

// Define Translations as a type that accepts either language's structure
export type Translations = (typeof translations)[Language];
