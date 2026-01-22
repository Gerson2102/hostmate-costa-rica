'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown, Building2, Star } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if we should run animations
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // On mobile or reduced motion: skip animations
    if (isMobile || prefersReducedMotion) {
      return;
    }

    // Desktop: load GSAP dynamically and run animations
    let ctx: { revert: () => void } | null = null;

    const initAnimations = async () => {
      const { gsap } = await import('gsap');

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl
          .from('.gradient-orb', {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            stagger: 0.2,
          })
          .from('.hero-overline', {
            opacity: 0,
            x: -50,
            duration: 0.8,
          }, '-=1')
          .from('.hero-headline', {
            opacity: 0,
            y: 100,
            duration: 1,
          }, '-=0.5')
          .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8,
          }, '-=0.5')
          .from('.hero-image', {
            opacity: 0,
            scale: 0.9,
            duration: 1,
          }, '-=0.5')
          .from('.scroll-indicator', {
            opacity: 0,
            y: -20,
            duration: 0.5,
          });
      }, containerRef);
    };

    initAnimations();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-orb absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="gradient-orb absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <span className="hero-overline text-primary font-medium text-sm uppercase tracking-[0.2em]">
              {t.hero.overline}
            </span>

            <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-foreground">
              {t.hero.headline1}
              <br />
              <span className="text-primary">{t.hero.headline2}</span>
            </h1>

            <p className="hero-subtitle text-lg sm:text-xl text-muted max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>

          </div>

          {/* Right: Property Stats Card - Visible on all devices */}
          <div className="hero-image relative flex items-center justify-center min-h-[280px] sm:min-h-[350px] lg:min-h-[500px] mt-8 lg:mt-0">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl shadow-black/10 border border-black/5">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{t.hero.card.yourProperty}</p>
                    <p className="text-xs sm:text-sm text-muted">{t.hero.card.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center p-2 sm:p-3 bg-background-elevated rounded-lg sm:rounded-xl">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">95%</p>
                    <p className="text-[10px] sm:text-xs text-muted">{t.hero.card.occupancy}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-background-elevated rounded-lg sm:rounded-xl">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">5.0</p>
                    <p className="text-[10px] sm:text-xs text-muted">{t.hero.card.rating}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-background-elevated rounded-lg sm:rounded-xl">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">+40%</p>
                    <p className="text-[10px] sm:text-xs text-muted">{t.hero.card.income}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl">
                  <span className="text-xs sm:text-sm text-foreground font-medium">{t.hero.card.managedBy}</span>
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">HM</div>
                  </div>
                </div>
              </div>

              {/* Superhost Badge */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg shadow-black/10 border border-black/5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{t.hero.card.superhost}</span>
                </div>
              </div>

              {/* 24/7 Support Badge */}
              <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg shadow-black/10 border border-black/5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">24/7 {t.hero.card.support}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - z-20 to appear above content container */}
      <a
        href="#nosotros"
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group"
        aria-label="Scroll to About section"
      >
        <span className="text-sm uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">{t.hero.scrollMore}</span>
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/50 group-hover:bg-white group-hover:border-primary/20 transition-all">
          <ChevronDown className="w-5 h-5 text-muted animate-bounce group-hover:text-primary" aria-hidden="true" />
        </div>
      </a>
    </section>
  );
}
