
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
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the element is intersecting
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Stop observing after it's visible
        }
      },
      {
        threshold: options?.threshold ?? 0.1, // Trigger when 10% of the element is visible
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
        ...options, // Allow overriding defaults
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, options]); // Re-run effect if ref or options change

  return isVisible;
}
