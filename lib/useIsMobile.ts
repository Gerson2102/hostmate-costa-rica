'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the device is mobile based on viewport width.
 * Returns undefined during SSR to prevent hydration mismatches.
 *
 * Performance optimization: On mobile devices, we can reduce animations
 * and disable expensive effects to improve load time and responsiveness.
 */
export function useIsMobile(breakpoint: number = 768): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkMobile();

    // Listen for resize events with debounce
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook to detect if user prefers reduced motion.
 * Returns true if the user has requested reduced motion in their OS settings.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Combined hook for animation optimization decisions.
 * Returns true if animations should be reduced (mobile OR prefers-reduced-motion).
 */
export function useShouldReduceAnimations(): boolean {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  // During SSR or initial render, assume we should NOT reduce animations
  // to prevent flash of reduced content
  if (isMobile === undefined) return false;

  return isMobile || prefersReducedMotion;
}
