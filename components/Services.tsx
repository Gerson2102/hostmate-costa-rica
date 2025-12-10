'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  Calendar,
  Palette,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Camera,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicios = [
  {
    icon: Globe,
    titulo: 'Publicación de la Propiedad',
    descripcion:
      'Tu alojamiento estará publicado en las aplicaciones adecuadas para obtener la mayor cantidad de reservas.',
    color: '#E85D4C',
  },
  {
    icon: Calendar,
    titulo: 'Administración de Calendarios',
    descripcion:
      'El calendario de tu alojamiento estará siempre actualizado y sincronizado.',
    color: '#2D5BFF',
  },
  {
    icon: Palette,
    titulo: 'Asesoría de Decoración',
    descripcion:
      'Vamos a tu alojamiento y hacemos un diagnóstico personalizado para mejorar la decoración y elementos básicos.',
    color: '#10B981',
  },
  {
    icon: Megaphone,
    titulo: 'Publicidad del Alojamiento',
    descripcion:
      'Tu alojamiento recibirá publicidad adicional en redes sociales y en nuestra página web para mayor visibilidad.',
    color: '#F59E0B',
  },
  {
    icon: MessageCircle,
    titulo: 'Comunicación con Huéspedes',
    descripcion:
      'Respuesta de consultas de huéspedes diariamente por medio de la plataforma.',
    color: '#8B5CF6',
  },
  {
    icon: TrendingUp,
    titulo: 'Estudio de Mercado',
    descripcion:
      'Revisión del mercado según la zona para definir el mejor precio posible del alojamiento.',
    color: '#EC4899',
  },
  {
    icon: Camera,
    titulo: 'Fotografías Profesionales',
    descripcion:
      'Fotografías profesionales del alojamiento para una mejor presentación y publicidad.',
    color: '#06B6D4',
  },
  {
    icon: Sparkles,
    titulo: 'Housekeeping',
    descripcion:
      'Personal de limpieza con altos estándares de calidad y servicio al cliente.',
    color: '#84CC16',
  },
];

function ServiceCard({
  servicio,
  index,
}: {
  servicio: (typeof servicios)[0];
  index: number;
}) {
  const { icon: Icon, titulo, descripcion, color } = servicio;

  return (
    <div className="service-card flex-shrink-0 w-[350px] sm:w-[400px] bg-white rounded-3xl p-8 relative overflow-hidden group shadow-lg shadow-black/5 border border-black/5">
      {/* Glow Effect */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: color }}
      />

      {/* Number */}
      <span className="text-8xl font-bold text-black/[0.03] absolute top-4 right-4">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-8 h-8" style={{ color }} />
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-4">{titulo}</h3>

        <p className="text-muted leading-relaxed">{descripcion}</p>
      </div>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !track || !progress) return;

    const ctx = gsap.context(() => {
      // Calculate scroll distance
      const totalWidth = track.scrollWidth - window.innerWidth + 100;

      // Horizontal scroll animation
      const scrollTween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress bar
      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
        },
      });

      // Individual card animations
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.5, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 80%',
              end: 'left 20%',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative bg-background-elevated overflow-hidden"
    >
      {/* Header - Fixed while scrolling */}
      <div className="absolute top-0 left-0 right-0 z-20 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background-elevated via-background-elevated to-transparent">
        <div className="max-w-7xl mx-auto">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Lo Que Hacemos
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 text-foreground">
            Nuestros Servicios
          </h2>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="h-screen flex items-center pt-32">
        <div ref={trackRef} className="flex gap-8 px-8 pl-8 lg:pl-[calc(50vw-300px)]">
          {servicios.map((servicio, index) => (
            <ServiceCard key={servicio.titulo} servicio={servicio} index={index} />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-8 right-8 h-1 bg-black/5 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-primary origin-left rounded-full"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  );
}
