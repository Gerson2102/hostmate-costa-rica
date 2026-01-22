'use client';

import { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * SmoothScroll wrapper with mobile optimization.
 *
 * On mobile devices (< 768px), native scroll is used instead of Lenis
 * because:
 * 1. Native scroll is more performant on mobile
 * 2. Reduces JavaScript execution time
 * 3. Better battery life
 * 4. iOS momentum scrolling works better natively
 *
 * Lenis and GSAP ScrollTrigger are loaded dynamically only on desktop.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);
  const isMobileRef = useRef(true);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      return window.innerWidth < 768;
    };

    isMobileRef.current = checkMobile();

    // Only initialize Lenis on desktop
    if (!isMobileRef.current) {
      initLenis();
    }

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wasMobile = isMobileRef.current;
        const nowMobile = checkMobile();
        isMobileRef.current = nowMobile;

        if (wasMobile && !nowMobile) {
          // Switched from mobile to desktop - initialize Lenis
          initLenis();
        } else if (!wasMobile && nowMobile) {
          // Switched from desktop to mobile - destroy Lenis
          destroyLenis();
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      destroyLenis();
    };
  }, []);

  async function initLenis() {
    try {
      // Dynamically import Lenis and GSAP only when needed
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Use gsap ticker for smooth animation loop
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } catch (error) {
      console.warn('Failed to initialize smooth scroll:', error);
    }
  }

  function destroyLenis() {
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
  }

  return <>{children}</>;
}
