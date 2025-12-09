'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown, Building2, Star, Clock } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl
        // Gradient orbs fade in
        .from('.gradient-orb', {
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
          stagger: 0.2,
        })
        // Floating stickers animate in
        .from('.floating-sticker', {
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        }, '-=1')
        // Overline slides in
        .from('.hero-overline', {
          opacity: 0,
          x: -50,
          duration: 0.8,
        }, '-=0.8')
        // Headline reveals
        .from('.hero-headline', {
          opacity: 0,
          y: 100,
          duration: 1,
        }, '-=0.5')
        // Subtitle fades up
        .from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 0.8,
        }, '-=0.5')
        // CTA button scales in
        .from('.hero-cta', {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
        }, '-=0.4')
        // Stats cards appear
        .from('.stat-card', {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
        }, '-=0.3')
        // Main characters bounce in
        .from('.hero-characters', {
          opacity: 0,
          scale: 0.5,
          y: 100,
          duration: 1,
          ease: 'back.out(1.4)',
        }, '-=0.5')
        // Destination cards fly in
        .from('.destination-card', {
          opacity: 0,
          scale: 0,
          rotation: -30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        }, '-=0.5')
        // Scroll indicator
        .from('.scroll-indicator', {
          opacity: 0,
          y: -20,
          duration: 0.5,
        });

      // Floating animation for stickers
      gsap.to('.floating-sticker', {
        y: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 'random(2, 3)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });

      // Characters subtle bounce
      gsap.to('.hero-characters', {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Destination cards float
      gsap.to('.destination-card', {
        y: 'random(-8, 8)',
        rotation: 'random(-3, 3)',
        duration: 'random(2.5, 3.5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.3,
          from: 'random',
        },
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
        {/* Gradient Orbs */}
        <div className="gradient-orb absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="gradient-orb absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]" />
        <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

        {/* Floating Brand Stickers */}
        <div className="floating-sticker absolute top-32 right-[15%] w-16 h-16 opacity-60">
          <Image src="/assets/stickers/sticker.png" alt="" fill className="object-contain" />
        </div>
        <div className="floating-sticker absolute top-[40%] left-[8%] w-20 h-20 opacity-50">
          <Image src="/assets/stickers/sticker_9.png" alt="" fill className="object-contain" />
        </div>
        <div className="floating-sticker absolute bottom-[30%] right-[8%] w-14 h-14 opacity-50">
          <Image src="/assets/stickers/sticker_15.png" alt="" fill className="object-contain" />
        </div>
        <div className="floating-sticker absolute top-[20%] left-[20%] w-12 h-12 opacity-40">
          <Image src="/assets/stickers/sticker_17.png" alt="" fill className="object-contain" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
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
              Consulting & Property Management
            </span>

            <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
              Tu Propiedad,
              <br />
              <span className="text-primary">Nuestra Pasión</span>
            </h1>

            <p className="hero-subtitle text-lg sm:text-xl text-muted max-w-lg leading-relaxed">
              Administración profesional de alojamientos para Airbnb, Booking y
              más. Maximiza tu rentabilidad sin preocupaciones.
            </p>

            <a
              href="#agendar"
              className="hero-cta group inline-flex items-center gap-3 bg-primary hover:bg-primary-glow text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-glow-primary"
            >
              Agenda tu Consulta Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Stats Row - Clearly visible below CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="stat-card glass-strong rounded-xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">+50</div>
                  <div className="text-xs text-muted">Propiedades</div>
                </div>
              </div>

              <div className="stat-card glass-strong rounded-xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">5.0</div>
                  <div className="text-xs text-muted">Rating</div>
                </div>
              </div>

              <div className="stat-card glass-strong rounded-xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-xs text-muted">Soporte</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Characters with Suitcases */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[500px]">
            {/* Main Characters - Travelers with suitcases */}
            <div className="hero-characters relative w-[400px] h-[400px]">
              <Image
                src="/assets/characters/suitcase.png"
                alt="Hostmate Characters - Ready to travel"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Floating Destination Cards */}
            <div className="destination-card absolute -top-4 -left-8 w-28 h-28 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/characters/beachcream.png"
                alt="Beach destination"
                fill
                className="object-cover"
              />
            </div>
            <div className="destination-card absolute top-8 -right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/characters/citycream.png"
                alt="City destination"
                fill
                className="object-cover"
              />
            </div>
            <div className="destination-card absolute -bottom-4 right-8 w-26 h-26 rounded-2xl overflow-hidden shadow-2xl" style={{ width: '104px', height: '104px' }}>
              <Image
                src="/assets/characters/mountaincream.png"
                alt="Mountain destination"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative stickers */}
            <div className="absolute -bottom-8 -left-4 w-20 h-20 z-10">
              <Image
                src="/assets/stickers/sticker_12.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - With better visibility */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm uppercase tracking-widest text-muted">Descubre más</span>
        <div className="w-10 h-10 rounded-full border border-muted/30 flex items-center justify-center">
          <ChevronDown className="w-5 h-5 text-muted animate-bounce" />
        </div>
      </div>
    </section>
  );
}
