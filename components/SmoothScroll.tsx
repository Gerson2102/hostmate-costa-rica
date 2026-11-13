'use client';

import { useEffect } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

/**
 * Lenis smooth scrolling on desktop (>= 768px) only.
 * Phones keep native scroll (better momentum, less JS), and so does anyone
 * who asks for reduced motion. Lenis runs its own animation frame loop.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (isMobile !== false) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: InstanceType<typeof import('lenis').default> | undefined;
    let cancelled = false;

    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          autoRaf: true,
        });
      })
      .catch((error) => console.warn('Failed to initialize smooth scroll:', error));

    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, [isMobile]);

  return <>{children}</>;
}
