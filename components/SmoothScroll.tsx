'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

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
 * Uses shared useIsMobile hook to avoid duplicate resize listeners.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<InstanceType<typeof import('lenis').default> | null>(null);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    // During SSR or on mobile, destroy Lenis if it exists
    if (isMobile !== false) {
      destroyLenis();
      return;
    }

    // Desktop — initialize Lenis
    initLenis();

    return () => {
      destroyLenis();
    };
  }, [isMobile]);

  // Store references for cleanup
  const gsapModuleRef = useRef<typeof import('gsap').gsap | null>(null);
  const tickerCallbackRef = useRef<((time: number) => void) | null>(null);

  async function initLenis() {
    try {
      // Dynamically import Lenis and GSAP only when needed
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      gsapModuleRef.current = gsap;

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

      // Create ticker callback and store reference for cleanup
      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      tickerCallbackRef.current = tickerCallback;

      // Use gsap ticker for smooth animation loop
      gsap.ticker.add(tickerCallback);

      gsap.ticker.lagSmoothing(0);
    } catch (error) {
      console.warn('Failed to initialize smooth scroll:', error);
    }
  }

  function destroyLenis() {
    // Remove GSAP ticker callback to prevent memory leaks
    if (gsapModuleRef.current && tickerCallbackRef.current) {
      gsapModuleRef.current.ticker.remove(tickerCallbackRef.current);
      tickerCallbackRef.current = null;
    }

    // Destroy Lenis instance
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
  }

  return <>{children}</>;
}
