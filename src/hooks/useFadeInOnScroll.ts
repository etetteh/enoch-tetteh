'use client';
import { type RefObject, useEffect, useState } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export function useFadeInOnScroll(
  ref: RefObject<Element>,
  options?: IntersectionObserverOptions
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Unobserve after it becomes visible to prevent re-triggering
        }
      },
      {
        threshold: options?.threshold ?? 0.01, // Lowered default threshold for more sensitivity
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element); // Cleanup on unmount
      }
    };
  // Ensure dependencies are stable. Primitive values from options are fine.
  // If options object itself is passed and changes identity, it can cause re-runs.
  // Using specific primitive properties from options is more robust.
  }, [ref, options?.root, options?.rootMargin, options?.threshold]);

  return isVisible;
}
