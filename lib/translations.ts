export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      services: 'Services',
      properties: 'Properties',
      bookConsultation: 'Book Consultation',
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
      vanessa: {
        name: 'Vanessa',
        greeting: 'Hello, my name is Vanessa.',
        bio: 'Based in Costa Rica, with a strong connection to Guanacaste, I am inspired by the region\'s lifestyle and culture.\n\nMy professional background includes systems configuration, finance, and customer experience. I personally manage your listings to ensure operational efficiency, high quality, and profit improvement.\n\nFor me, every property is more than an asset—it is an opportunity to blend strategy, creativity, and genuine hospitality into meaningful guest experiences, creating value and purpose for you, your guests, and Hostmate.',
      },
      julian: {
        name: 'Julian',
        greeting: 'Hi, I\'m Julian.',
        bio: 'I manage homes the way I\'d expect mine to be managed.\n\nI was raised in Nosara and have built my professional career here. That means I don\'t just know the area; I understand how it works, who to call, and how things get done on the ground.\n\nAt the same time, my background in marketing and sales has connected me with high-level networks locally and internationally. Hostmate sits at that intersection: local presence with global-level standards.',
      },
    },

    // Services Section
    services: {
      overline: 'What We Do',
      headline: 'Our Services',
      items: [
        {
          title: 'Property Listing',
          description: 'Your property will be listed on the right platforms to get the most bookings.',
        },
        {
          title: 'Calendar Management',
          description: 'Your property calendar will always be updated and synchronized.',
        },
        {
          title: 'Decoration Consulting',
          description: 'We visit your property and provide a personalized assessment to improve decoration and basic elements.',
        },
        {
          title: 'Property Marketing',
          description: 'Your property will receive additional advertising on social media and our website for greater visibility.',
        },
        {
          title: 'Guest Communication',
          description: 'Daily response to guest inquiries through the platform.',
        },
        {
          title: 'Market Research',
          description: 'Market review by area to determine the best possible price for your property.',
        },
        {
          title: 'Professional Photography',
          description: 'Professional photos of your property for better presentation and marketing.',
        },
        {
          title: 'Housekeeping',
          description: 'Cleaning staff with high quality standards and customer service.',
        },
      ],
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
      items: [
        {
          name: 'HOSTMATE VIRTUAL',
          description: 'Complete digital management',
          services: [
            'Property listing',
            'Guest communication',
            'Market research and price updates',
            'Calendar management',
            'Property marketing',
            'Review management',
            'Monthly booking reports',
          ],
          cta: 'Choose Virtual',
        },
        {
          name: 'HOSTMATE HYBRID',
          description: 'Complete service - Digital + On-site',
          services: [
            'Property listing',
            'Guest communication',
            'Market research and price updates',
            'Calendar management',
            'Property marketing',
            'Review management',
            'Monthly booking reports',
            'Decoration consulting',
            'Professional photography',
            'Housekeeping',
            'Welcome Kit',
          ],
          cta: 'Choose Hybrid',
        },
        {
          name: 'HOSTMATE CUSTOM',
          description: 'Tailored to your needs',
          services: [
            'Book a free 1:1 session',
            'We define your specific needs',
            'We create a personalized plan',
            'Total flexibility in services',
          ],
          cta: 'Book Session',
        },
      ],
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
      buttonText: 'Apply Now',
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
      title: 'Hostmate Costa Rica - Premium Property Management',
      description: 'Professional property management for Airbnb, Booking, and more. Maximize your revenue without the hassle. Your premium partner in Costa Rica.',
    },
  },

  es: {
    // Navigation
    nav: {
      about: 'Nosotros',
      services: 'Servicios',
      properties: 'Propiedades',
      bookConsultation: 'Agendar Consulta',
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
      vanessa: {
        name: 'Vanessa',
        greeting: 'Hola, mi nombre es Vanessa.',
        bio: 'Resido en Costa Rica, con una fuerte conexión con Guanacaste, me inspira el estilo de vida y la cultura de la región.\n\nMi experiencia profesional incluye configuración de sistemas, finanzas y experiencia del cliente. Gestiono personalmente sus listados para garantizar eficiencia operativa, alta calidad y mejora de rentabilidad.\n\nPara mí, cada propiedad es más que un activo—es una oportunidad de combinar estrategia, creatividad y hospitalidad genuina en experiencias significativas para los huéspedes, creando valor y propósito para usted, sus huéspedes y Hostmate.',
      },
      julian: {
        name: 'Julián',
        greeting: 'Hola, soy Julián.',
        bio: 'Gestiono hogares de la manera en que esperaría que gestionaran el mío.\n\nCrecí en Nosara y he construido mi carrera profesional aquí. Eso significa que no solo conozco la zona; entiendo cómo funciona, a quién llamar y cómo se hacen las cosas en el terreno.\n\nAl mismo tiempo, mi experiencia en marketing y ventas me ha conectado con redes de alto nivel local e internacionalmente. Hostmate se encuentra en esa intersección: presencia local con estándares de nivel global.',
      },
    },

    // Services Section
    services: {
      overline: 'Lo Que Hacemos',
      headline: 'Nuestros Servicios',
      items: [
        {
          title: 'Publicación de la Propiedad',
          description: 'Tu alojamiento estará publicado en las aplicaciones adecuadas para obtener la mayor cantidad de reservas.',
        },
        {
          title: 'Administración de Calendarios',
          description: 'El calendario de tu alojamiento estará siempre actualizado y sincronizado.',
        },
        {
          title: 'Asesoría de Decoración',
          description: 'Vamos a tu alojamiento y hacemos un diagnóstico personalizado para mejorar la decoración y elementos básicos.',
        },
        {
          title: 'Publicidad del Alojamiento',
          description: 'Tu alojamiento recibirá publicidad adicional en redes sociales y en nuestra página web para mayor visibilidad.',
        },
        {
          title: 'Comunicación con Huéspedes',
          description: 'Respuesta de consultas de huéspedes diariamente por medio de la plataforma.',
        },
        {
          title: 'Estudio de Mercado',
          description: 'Revisión del mercado según la zona para definir el mejor precio posible del alojamiento.',
        },
        {
          title: 'Fotografías Profesionales',
          description: 'Fotografías profesionales del alojamiento para una mejor presentación y publicidad.',
        },
        {
          title: 'Housekeeping',
          description: 'Personal de limpieza con altos estándares de calidad y servicio al cliente.',
        },
      ],
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
      items: [
        {
          name: 'HOSTMATE VIRTUAL',
          description: 'Gestión digital completa',
          services: [
            'Publicación de la propiedad',
            'Comunicación con los huéspedes',
            'Estudio de mercado y actualización de precios',
            'Administración de calendarios',
            'Publicidad del alojamiento',
            'Gestión de reviews',
            'Reportes de reservas mensuales',
          ],
          cta: 'Elegir Virtual',
        },
        {
          name: 'HOSTMATE HÍBRIDO',
          description: 'Servicio completo - Digital + Presencial',
          services: [
            'Publicación de la propiedad',
            'Comunicación con los huéspedes',
            'Estudio de mercado y actualización de precios',
            'Administración de calendarios',
            'Publicidad del alojamiento',
            'Gestión de reviews',
            'Reportes de reservas mensuales',
            'Asesoría de decoración',
            'Fotografías profesionales',
            'Housekeeping',
            'Welcome Kit',
          ],
          cta: 'Elegir Híbrido',
        },
        {
          name: 'HOSTMATE PERSONALIZADO',
          description: 'Plan a tu medida',
          services: [
            'Agenda una sesión 1:1 gratuita',
            'Definimos tus necesidades específicas',
            'Creamos un plan personalizado',
            'Flexibilidad total en servicios',
          ],
          cta: 'Agendar Sesión',
        },
      ],
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
      buttonText: 'Aplicar Ahora',
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
      title: 'Hostmate Costa Rica - Administración Premium de Propiedades',
      description: 'Administración profesional de alojamientos para Airbnb, Booking y más. Maximiza tu rentabilidad sin preocupaciones. Tu socio premium en Costa Rica.',
    },
  },
} as const;

// Define Translations as a type that accepts either language's structure
export type Translations = (typeof translations)[Language];
