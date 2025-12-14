'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown, Building2, Star, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        .from('.hero-cta', {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
        }, '-=0.4')
        .from('.stat-card', {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
        }, '-=0.3')
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

    return () => ctx.revert();
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

            <a
              href="https://calendly.com/hostmatecostarica-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group inline-flex items-center gap-3 bg-primary hover:bg-primary-glow text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-glow-primary"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="stat-card bg-white rounded-xl px-5 py-4 flex items-center gap-3 shadow-lg shadow-black/5 border border-black/5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">+50</div>
                  <div className="text-xs text-muted">{t.hero.stats.properties}</div>
                </div>
              </div>

              <div className="stat-card bg-white rounded-xl px-5 py-4 flex items-center gap-3 shadow-lg shadow-black/5 border border-black/5">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">5.0</div>
                  <div className="text-xs text-muted">{t.hero.stats.rating}</div>
                </div>
              </div>

              <div className="stat-card bg-white rounded-xl px-5 py-4 flex items-center gap-3 shadow-lg shadow-black/5 border border-black/5">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-xs text-muted">{t.hero.stats.support}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hero-image relative hidden lg:flex items-center justify-center min-h-[500px]">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/10 border border-black/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.hero.card.yourProperty}</p>
                    <p className="text-sm text-muted">{t.hero.card.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-background-elevated rounded-xl">
                    <p className="text-2xl font-bold text-primary">95%</p>
                    <p className="text-xs text-muted">{t.hero.card.occupancy}</p>
                  </div>
                  <div className="text-center p-3 bg-background-elevated rounded-xl">
                    <p className="text-2xl font-bold text-foreground">4.9</p>
                    <p className="text-xs text-muted">{t.hero.stats.rating}</p>
                  </div>
                  <div className="text-center p-3 bg-background-elevated rounded-xl">
                    <p className="text-2xl font-bold text-green-600">+40%</p>
                    <p className="text-xs text-muted">{t.hero.card.income}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
                  <span className="text-sm text-foreground font-medium">{t.hero.card.managedBy}</span>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">HM</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg shadow-black/10 border border-black/5">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-foreground">{t.hero.card.superhost}</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg shadow-black/10 border border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-foreground">24/7 {t.hero.stats.support}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm uppercase tracking-widest text-muted">{t.hero.scrollMore}</span>
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/50">
          <ChevronDown className="w-5 h-5 text-muted animate-bounce" />
        </div>
      </div>
    </section>
  );
}
