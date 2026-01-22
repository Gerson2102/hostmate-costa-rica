'use client';

import { useEffect, useRef, useState, ReactNode, ComponentType } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

/**
 * LazySection - Defers rendering of children until they're about to enter viewport.
 * Uses IntersectionObserver to detect when the section is near the viewport.
 * Once rendered, stays rendered (no unloading).
 */
export function LazySection({
  children,
  fallback = null,
  rootMargin = '200px 0px', // Load 200px before entering viewport
  threshold = 0,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If IntersectionObserver is not supported, show content immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
}

/**
 * SectionSkeleton - Placeholder skeleton for sections while loading
 */
export function SectionSkeleton({ minHeight = '100vh' }: { minHeight?: string }) {
  return (
    <div
      className="animate-pulse bg-background-elevated"
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

/**
 * withLazyLoad - HOC to wrap components with lazy loading
 * Useful for dynamically imported components
 */
export function withLazyLoad<P extends object>(
  Component: ComponentType<P>,
  fallbackHeight = '100vh'
) {
  return function LazyLoadedComponent(props: P) {
    return (
      <LazySection fallback={<SectionSkeleton minHeight={fallbackHeight} />}>
        <Component {...props} />
      </LazySection>
    );
  };
}
