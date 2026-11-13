'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronDown, Building2, Star, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useIsMobile } from '@/lib/useIsMobile';

// Type extension for Navigator with connection API
interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
}

// Desktop breakpoint - matches Tailwind's lg: (1024px)
// Video is ONLY shown on desktop (1024px and above)
const DESKTOP_BREAKPOINT = 1024;

export function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  // Defaults to false so the video never downloads before the client confirms desktop
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const isMobileViewport = useIsMobile(DESKTOP_BREAKPOINT);

  // Desktop only, and not with reduced motion, a 2G connection or Data Saver
  useEffect(() => {
    if (isMobileViewport !== false) {
      setShouldRenderVideo(false);
      return;
    }

    const connection = (navigator as NavigatorWithConnection).connection;
    const isSlowConnection =
      connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setShouldRenderVideo(!prefersReducedMotion && !isSlowConnection && !connection?.saveData);
  }, [isMobileViewport]);

  // Pause the video when scrolled out of view (saves battery/resources)
  useEffect(() => {
    const video = videoRef.current;
    if (!shouldRenderVideo || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay blocked: the poster stays visible
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldRenderVideo]);

  return (
    <section className="relative min-h-svh bg-background overflow-hidden">
      {/* First home visit of the session only (html.intro, see layout.tsx + globals.css):
          "host" and "mate" join at the seam, then the two halves open like doors */}
      <div className="intro-doors" aria-hidden="true">
        <div className="intro-door">
          <span className="intro-host text-6xl sm:text-8xl font-bold tracking-tight text-foreground">host</span>
        </div>
        <div className="intro-door">
          <span className="intro-mate text-6xl sm:text-8xl font-bold tracking-tight text-primary">mate</span>
        </div>
      </div>

      {/* ========================================
          BACKGROUND: picture -> video (desktop) -> readability overlay
          ======================================== */}
      <div className="hero-media absolute inset-0 overflow-hidden">
        {/* Phones/tablets get a managed villa; desktop gets the video's poster frame.
            One <img> so the browser downloads only the image for its breakpoint. */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero-poster-new.webp" />
          <img
            src="/images/properties/villa-toscana-1.webp"
            alt=""
            width={1200}
            height={800}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-bottom lg:object-center"
          />
        </picture>

        {/* VIDEO - DESKTOP ONLY (1024px+), rendered only after the client check above.
            If it fails to load, it unmounts and the poster picture underneath stays. */}
        {shouldRenderVideo && (
          <video
            ref={videoRef}
            src="/videos/Bg-video-optimized.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            poster="/images/hero-poster-new.webp"
            onError={() => setShouldRenderVideo(false)}
            className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* OVERLAY FOR TEXT READABILITY: white behind the text on phones (photo shows
            under the card), left-to-right fade on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white/10 lg:bg-gradient-to-r lg:from-white/85 lg:via-white/50 lg:to-transparent" />
      </div>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Each line rises from behind its own baseline (--i staggers the entrance) */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground text-balance">
              <span className="hero-line"><span>{t.hero.headline1}</span></span>{' '}
              <span className="hero-line"><span className="text-primary" style={{ '--i': 1 } as CSSProperties}>{t.hero.headline2}</span></span>
            </h1>

            <p className="hero-rise text-lg sm:text-xl text-muted max-w-lg leading-relaxed" style={{ '--i': 2 } as CSSProperties}>
              {t.hero.subtitle}
            </p>

            <a
              href="https://calendly.com/hostmatecostarica-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-rise inline-flex items-center gap-3 bg-primary-dark hover:bg-primary text-white px-7 py-4 rounded-full font-semibold text-base sm:text-lg transition-colors"
              style={{ '--i': 3 } as CSSProperties}
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              {t.hero.cta}
            </a>
          </div>

          {/* Right: Property Stats Card - Visible on all devices */}
          <div
            className="hero-rise relative flex items-center justify-center min-h-[280px] sm:min-h-[350px] lg:min-h-[500px] mt-8 lg:mt-0"
            style={{ '--i': 2 } as CSSProperties}
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl shadow-black/10 border border-black/5">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-base">{t.hero.card.yourProperty}</p>
                    <p className="text-sm text-muted">{t.hero.card.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center p-2 sm:p-3 bg-background-elevated rounded-lg sm:rounded-xl">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-dark tabular-nums">95%</p>
                    <p className="text-sm text-muted">{t.hero.card.occupancy}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-background-elevated rounded-lg sm:rounded-xl">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground tabular-nums">5.0</p>
                    <p className="text-sm text-muted">{t.hero.card.rating}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-background-elevated rounded-lg sm:rounded-xl">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-700 tabular-nums">+40%</p>
                    <p className="text-sm text-muted">{t.hero.card.income}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl">
                  <span className="text-sm text-foreground font-medium">{t.hero.card.managedBy}</span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-dark flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">HM</div>
                </div>
              </div>

              {/* Superhost Badge */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg shadow-black/10 border border-black/5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{t.hero.card.superhost}</span>
                </div>
              </div>

              {/* 24/7 Support Badge */}
              <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg shadow-black/10 border border-black/5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">24/7 {t.hero.card.support}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          SCROLL INDICATOR
          ======================================== */}
      <a
        href="#nosotros"
        className="hero-rise absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 group"
        style={{ '--i': 5 } as CSSProperties}
        aria-label={t.a11y.scrollToAbout}
      >
        <span className="text-sm uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">{t.hero.scrollMore}</span>
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/50 group-hover:bg-white group-hover:border-primary/20 transition-[background-color,border-color]">
          <ChevronDown className="w-5 h-5 text-muted group-hover:text-primary" aria-hidden="true" />
        </div>
      </a>
    </section>
  );
}
