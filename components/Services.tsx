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
  LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons: LucideIcon[] = [
  Globe,
  Calendar,
  Palette,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Camera,
  Sparkles,
];

const serviceColors = [
  '#E85D4C',
  '#2D5BFF',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#84CC16',
];

function ServiceCard({
  title,
  description,
  icon: Icon,
  color,
  index,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  index: number;
}) {
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

        <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>

        <p className="text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function Services() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !track || !progress) return;

    // Small delay to ensure DOM has updated with new content
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const totalWidth = track.scrollWidth - window.innerWidth + 100;

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

      // Store context for cleanup
      (section as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx = ctx;
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      const ctx = (section as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx;
      if (ctx) ctx.revert();
    };
  }, [language]);

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
            {t.services.overline}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 text-foreground">
            {t.services.headline}
          </h2>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="h-screen flex items-center pt-32">
        <div ref={trackRef} className="flex gap-8 px-8 pl-8 lg:pl-[calc(50vw-300px)]">
          {t.services.items.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={serviceIcons[index]}
              color={serviceColors[index]}
              index={index}
            />
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
