'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Building2, Star } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

// Type extension for Navigator with connection API
interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
}

// Development logging helper
const isDev = process.env.NODE_ENV === 'development';
const logVideo = (message: string, data?: unknown) => {
  if (isDev) {
    console.log(`[Hero Video] ${message}`, data ?? '');
  }
};

// Desktop breakpoint - matches Tailwind's lg: (1024px)
// Video is ONLY shown on desktop (1024px and above)
const DESKTOP_BREAKPOINT = 1024;

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Single state to control video rendering
  // Defaults to false - video will NOT render/download until client-side check confirms desktop
  // This prevents video download on mobile devices (saves bandwidth)
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  // ============================================
  // VIDEO EVENT HANDLERS
  // Callbacks for debugging video playback state
  // ============================================
  const handleVideoLoadedData = useCallback(() => {
    logVideo('Video data loaded successfully', {
      duration: videoRef.current?.duration,
      videoWidth: videoRef.current?.videoWidth,
      videoHeight: videoRef.current?.videoHeight,
      currentSrc: videoRef.current?.currentSrc,
    });
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    logVideo('Video can play through');
  }, []);

  const handleVideoPlaying = useCallback(() => {
    logVideo('Video playback started');
  }, []);

  const handleVideoWaiting = useCallback(() => {
    logVideo('Video buffering...');
  }, []);

  // ============================================
  // VIDEO DISPLAY LOGIC
  // Determines whether to render and show video
  // Video ONLY enabled on desktop (1024px+)
  // Disabled on mobile/tablet for performance/battery
  // ============================================
  useEffect(() => {
    const checkShouldRenderVideo = () => {
      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Check connection quality (if API available)
      const nav = navigator as NavigatorWithConnection;
      const connection = nav.connection;
      const isSlowConnection = connection?.effectiveType === '2g' ||
                               connection?.effectiveType === 'slow-2g';
      const saveData = connection?.saveData;

      logVideo('Evaluating video display conditions', {
        screenWidth: window.innerWidth,
        isDesktop,
        prefersReducedMotion,
        connectionType: connection?.effectiveType,
        isSlowConnection,
        saveData,
      });

      // Show video ONLY on desktop, respecting user preferences and connection quality
      // Conditions that DISABLE video:
      // - Mobile/tablet viewport (<1024px)
      // - User prefers reduced motion
      // - Slow connection (2g/slow-2g)
      // - Data Saver is enabled
      const shouldShow = isDesktop && !prefersReducedMotion && !isSlowConnection && !saveData;

      setShouldRenderVideo(shouldShow);
      logVideo(shouldShow ? 'Video enabled (desktop)' : 'Video disabled, showing poster fallback');
    };

    // Initial check
    checkShouldRenderVideo();

    // Re-check on resize (handles orientation changes and window resize)
    window.addEventListener('resize', checkShouldRenderVideo);
    return () => window.removeEventListener('resize', checkShouldRenderVideo);
  }, []);

  // ============================================
  // VIEWPORT-BASED PLAYBACK
  // Pause video when scrolled out of view (saves battery/resources)
  // ============================================
  useEffect(() => {
    if (!shouldRenderVideo || !videoRef.current) return;

    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((error: Error) => {
            logVideo('Autoplay blocked or failed', {
              name: error.name,
              message: error.message,
            });
          });
        } else {
          video.pause();
          logVideo('Video paused (out of viewport)');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [shouldRenderVideo]);

  // ============================================
  // VIDEO ERROR HANDLING
  // Fallback to poster if video fails to load
  // ============================================
  useEffect(() => {
    if (!shouldRenderVideo || !videoRef.current) return;

    const video = videoRef.current;

    const handleError = (event: Event) => {
      const videoElement = event.target as HTMLVideoElement;
      const error = videoElement.error;

      console.warn('[Hero Video] Failed to load, showing poster fallback', {
        errorCode: error?.code,
        errorMessage: error?.message,
        currentSrc: videoElement.currentSrc,
        networkState: videoElement.networkState,
        readyState: videoElement.readyState,
      });

      setShouldRenderVideo(false);
    };

    video.addEventListener('error', handleError);

    return () => video.removeEventListener('error', handleError);
  }, [shouldRenderVideo]);

  // ============================================
  // GSAP ANIMATIONS
  // Entrance animations for desktop only (1024px+)
  // ============================================
  useEffect(() => {
    const isMobile = window.innerWidth < DESKTOP_BREAKPOINT;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    let ctx: { revert: () => void } | null = null;

    const initAnimations = async () => {
      const { gsap } = await import('gsap');

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Video fade-in with subtle zoom
        if (videoRef.current) {
          tl.from(videoRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 2,
          });
        }

        // Gradient orbs (overlap with video)
        tl.from('.gradient-orb', {
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
          stagger: 0.2,
        }, '-=1.5');

        // Overline text
        tl.from('.hero-overline', {
          opacity: 0,
          x: -50,
          duration: 0.8,
        }, '-=1');

        // Headline
        tl.from('.hero-headline', {
          opacity: 0,
          y: 100,
          duration: 1,
        }, '-=0.5');

        // Subtitle
        tl.from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 0.8,
        }, '-=0.5');

        // Property card
        tl.from('.hero-image', {
          opacity: 0,
          scale: 0.9,
          duration: 1,
        }, '-=0.5');

        // Scroll indicator
        tl.from('.scroll-indicator', {
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
      {/* ========================================
          BACKGROUND LAYER
          Z-Index: 0 (video) -> 5 (overlay) -> 10 (orbs)
          ======================================== */}
      <div className="absolute inset-0 overflow-hidden">

        {/* VIDEO BACKGROUND (z-0) - DESKTOP ONLY (1024px+)
            Two layers of protection:
            1. JavaScript: shouldRenderVideo is false on mobile (prevents download)
            2. CSS: hidden lg:block ensures video is visually hidden below 1024px
            This double protection handles edge cases like:
            - Window resize from desktop to mobile
            - Any JavaScript execution delays
        */}
        {shouldRenderVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            poster="/images/hero-poster-new.webp"
            className="hidden lg:block absolute inset-0 w-full h-full object-cover z-0"
            onLoadedData={handleVideoLoadedData}
            onCanPlayThrough={handleVideoCanPlay}
            onPlaying={handleVideoPlaying}
            onWaiting={handleVideoWaiting}
          >
            {/* MP4 first: smaller file (9.6MB vs 26MB WebM) and better compatibility */}
            <source src="/videos/Bg-video-optimized.mp4" type="video/mp4" />
            <source src="/videos/Bg-video-optimized.webm" type="video/webm" />
          </video>
        )}

        {/* POSTER FALLBACK - DESKTOP ONLY (1024px+)
            Hidden on mobile/tablet - user requested NO video-related content on mobile
            Visible on desktop when:
            - Video is disabled (reduced motion, slow connection, Data Saver)
            - Before JavaScript hydration completes
            - Video fails to load
        */}
        <div
          className={`hidden lg:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
            shouldRenderVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ backgroundImage: 'url(/images/hero-poster-new.webp)' }}
          aria-hidden="true"
        />

        {/* OVERLAY FOR TEXT READABILITY (z-5) */}
        <div className="absolute inset-0 z-[5] bg-gradient-to-r from-white/90 via-white/70 to-white/40 lg:from-white/85 lg:via-white/50 lg:to-transparent" />

        {/* ANIMATED GRADIENT ORBS (z-10) - reduced opacity to complement video */}
        <div className="gradient-orb absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] z-10" />
        <div className="gradient-orb absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] z-10" />
        <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] z-10" />

        {/* GRID PATTERN (z-10) */}
        <div
          className="absolute inset-0 opacity-[0.03] z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* ========================================
          MAIN CONTENT (z-20)
          ======================================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
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

      {/* ========================================
          SCROLL INDICATOR (z-30)
          ======================================== */}
      <a
        href="#nosotros"
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 group"
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
