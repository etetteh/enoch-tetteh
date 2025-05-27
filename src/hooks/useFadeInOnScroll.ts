
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

    // Ensure the element starts as invisible and in its pre-animation state
    // This is a failsafe if initial CSS isn't applied quickly enough by React's rendering
    if (element instanceof HTMLElement) {
      element.style.opacity = '0';
      // Note: direct style manipulation for translate might be complex here,
      // relying on initial CSS classes is preferred.
    }


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); 
        }
      },
      {
        threshold: options?.threshold ?? 0.1, 
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
        ...options, 
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, options]);

  return isVisible;
}

