export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      services: 'Services',
      properties: 'Properties',
      testimonials: 'Testimonials',
      bookConsultation: 'Book Consultation',
    },

    // Hero Section
    hero: {
      overline: 'Consulting & Property Management',
      headline1: 'Your Property,',
      headline2: 'Our Passion',
      subtitle: 'Professional property management for Airbnb, Booking, and more. Maximize your revenue without the hassle.',
      cta: 'Book Your Free Consultation',
      stats: {
        properties: 'Properties',
        rating: 'Rating',
        support: 'Support',
      },
      card: {
        yourProperty: 'Your Property',
        location: 'Guanacaste, Costa Rica',
        occupancy: 'Occupancy',
        income: 'Income',
        managedBy: 'Managed by Hostmate',
        superhost: 'Superhost',
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

    // Founder Story Section
    founder: {
      overline: 'Our Story',
      headline: 'Meet the',
      headlineHighlight: 'Founder',
      role: 'Founder',
      story: {
        intro: "Hi, my name is Vane.",
        paragraph1: "Beyond my studies and training, what really shaped me since childhood was growing up in a house full of design and architecture books. I spent hours flipping through them, fascinated by the designs and spaces, and discovered a world of",
        paragraph1Highlight: 'limitless creativity',
        paragraph1End: '.',
        paragraph2: "My parents were always entrepreneurs and book lovers, and although they may have never imagined the impact it would have on me, that exposure awakened a",
        paragraph2Highlight: 'passion that guides my life today',
        paragraph2End: '.',
        paragraph3: "This project was born with the purpose of helping people manage their properties, make them more attractive and profitable, while also",
        paragraph3Highlight: 'inspiring those who dream of entrepreneurship',
        paragraph3End: 'in real estate and tourism. For me, each new project is also an opportunity to give voice to my inner child and continue exploring the creativity I enjoy so much.',
        closing: "I love discovering accommodations, structures, designs, and details, and sharing the best of what I've learned without reservation. Join me on this journey!",
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

    // Testimonials Section
    testimonials: {
      overline: 'Testimonials',
      headline: 'What Our Clients Say',
      items: [
        {
          name: 'Maria Gonzalez',
          location: 'Property in Guanacaste',
          stars: 5,
          text: "Since Hostmate manages my property, my income has increased by 40%. The team is very professional.",
        },
        {
          name: 'Carlos Jimenez',
          location: 'Apartment in San Jose',
          stars: 5,
          text: 'Excellent service. They took away all the stress of managing my Airbnb. The photos are amazing.',
        },
        {
          name: 'Ana Rodriguez',
          location: 'House in La Fortuna',
          stars: 5,
          text: 'The hybrid plan is perfect. The housekeeping is impeccable and guests always leave excellent reviews.',
        },
        {
          name: 'Luis Vargas',
          location: 'Villa in Tamarindo',
          stars: 5,
          text: 'Guest communication is excellent. They respond quickly and always keep clients informed.',
        },
        {
          name: 'Patricia Mora',
          location: 'Condo in Jaco',
          stars: 5,
          text: 'Top-notch professionals. Now I have time to enjoy while they take care of everything.',
        },
      ],
      featured: {
        name: 'Roberto Mora',
        location: 'Villa in Manuel Antonio',
        initials: 'RM',
        stars: 5,
        text: 'Top-notch professionals. The decoration consulting transformed my property and now I have bookings all year round. The team is always available and communication is excellent.',
      },
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

    // Footer
    footer: {
      description: 'Your trusted partner for property management in Costa Rica. Maximize your revenue without the hassle.',
      contact: 'Contact',
      linksTitle: 'Links',
      links: {
        about: 'About Us',
        services: 'Services',
        properties: 'Properties',
        testimonials: 'Testimonials',
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
      testimonials: 'Testimonios',
      bookConsultation: 'Agendar Consulta',
    },

    // Hero Section
    hero: {
      overline: 'Consulting & Property Management',
      headline1: 'Tu Propiedad,',
      headline2: 'Nuestra Pasión',
      subtitle: 'Administración profesional de alojamientos para Airbnb, Booking y más. Maximiza tu rentabilidad sin preocupaciones.',
      cta: 'Agenda tu Consulta Gratis',
      stats: {
        properties: 'Propiedades',
        rating: 'Rating',
        support: 'Soporte',
      },
      card: {
        yourProperty: 'Tu Propiedad',
        location: 'Guanacaste, Costa Rica',
        occupancy: 'Ocupación',
        income: 'Ingresos',
        managedBy: 'Administrado por Hostmate',
        superhost: 'Superhost',
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

    // Founder Story Section
    founder: {
      overline: 'Nuestra Historia',
      headline: 'Conoce a la',
      headlineHighlight: 'Fundadora',
      role: 'Fundadora',
      story: {
        intro: 'Hola, mi nombre es Vane.',
        paragraph1: 'Más allá de los estudios y la formación que he realizado, lo que realmente me marcó desde niña fue crecer en una casa llena de libros de decoración y arquitectura. Pasaba horas hojeándolos, fascinada por los diseños y los espacios, y descubrí que allí encontraba un mundo de',
        paragraph1Highlight: 'creatividad sin límites',
        paragraph1End: '.',
        paragraph2: 'Mis papás siempre fueron emprendedores y amantes de los libros, y aunque quizá nunca imaginaron el impacto que tendría en mí, esa exposición despertó una',
        paragraph2Highlight: 'pasión que hoy guía mi vida',
        paragraph2End: '.',
        paragraph3: 'Este proyecto nace con el propósito de ayudar a las personas a gestionar sus propiedades, hacerlas más atractivas y rentables, y al mismo tiempo',
        paragraph3Highlight: 'inspirar a quienes sueñan con emprender',
        paragraph3End: 'en el sector de bienes raíces y turismo. Para mí, cada nuevo proyecto es también una oportunidad de darle voz a mi niña interior y seguir explorando la creatividad que tanto disfruto.',
        closing: 'Me encanta descubrir alojamientos, estructuras, diseños y detalles, y compartir lo mejor de lo que he aprendido sin reservas. ¡Acompáñenme en este viaje!',
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

    // Testimonials Section
    testimonials: {
      overline: 'Testimonios',
      headline: 'Lo Que Dicen Nuestros Clientes',
      items: [
        {
          name: 'María González',
          location: 'Propiedad en Guanacaste',
          stars: 5,
          text: 'Desde que Hostmate administra mi propiedad, mis ingresos aumentaron un 40%. El equipo es muy profesional.',
        },
        {
          name: 'Carlos Jiménez',
          location: 'Apartamento en San José',
          stars: 5,
          text: 'Excelente servicio. Me quitaron todo el estrés de administrar mi Airbnb. Las fotografías son increíbles.',
        },
        {
          name: 'Ana Rodríguez',
          location: 'Casa en La Fortuna',
          stars: 5,
          text: 'El plan híbrido es perfecto. El housekeeping es impecable y los huéspedes siempre dejan excelentes reviews.',
        },
        {
          name: 'Luis Vargas',
          location: 'Villa en Tamarindo',
          stars: 5,
          text: 'La comunicación con huéspedes es excelente. Responden rápido y siempre mantienen informados a los clientes.',
        },
        {
          name: 'Patricia Mora',
          location: 'Condominio en Jacó',
          stars: 5,
          text: 'Profesionales de primera. Ahora tengo tiempo para disfrutar mientras ellos se encargan de todo.',
        },
      ],
      featured: {
        name: 'Roberto Mora',
        location: 'Villa en Manuel Antonio',
        initials: 'RM',
        stars: 5,
        text: 'Profesionales de primera. La asesoría de decoración transformó mi propiedad y ahora tengo reservas todo el año. El equipo siempre está disponible y la comunicación es excelente.',
      },
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

    // Footer
    footer: {
      description: 'Tu socio de confianza para la administración de propiedades en Costa Rica. Maximiza tu rentabilidad sin preocupaciones.',
      contact: 'Contacto',
      linksTitle: 'Enlaces',
      links: {
        about: 'Sobre Nosotros',
        services: 'Servicios',
        properties: 'Propiedades',
        testimonials: 'Testimonios',
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

export type Translations = typeof translations.en;
