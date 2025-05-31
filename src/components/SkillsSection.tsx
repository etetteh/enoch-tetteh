
'use client';

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { skillCategories } from '@/lib/data';
import type { SkillCategory } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { SkillItemCard } from './SkillItemCard'; // Import the new component

export function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userExpandedState, setUserExpandedState] = useState<Record<number, boolean>>({});

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const mainCarouselBlockRef = useRef<HTMLDivElement>(null);

  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const isCarouselBlockVisible = useFadeInOnScroll(mainCarouselBlockRef, { threshold: 0.05, delay: 200 });

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === skillCategories.length - 1 ? 0 : prevIndex + 1
    );
  }, []); // Removed skillCategories.length from deps as it's stable from import

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? skillCategories.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleUserExpand = (index: number) => {
    setUserExpandedState(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    setIsPaused(true); // Pause autoplay when user interacts with card expansion
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, skillCategories.length);
  }, []); // Removed skillCategories.length as it's stable

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    if (!isPaused && skillCategories.length > 1) {
      intervalIdRef.current = setInterval(() => {
        handleNext();
      }, 9000);
    }
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [currentIndex, isPaused, handleNext]); // Added handleNext, removed skillCategories.length

  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const activeCard = cardRefs.current[currentIndex];
    if (activeCard) {
      const containerWidth = container.offsetWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      
      let targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, container.scrollWidth - containerWidth));

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  if (!skillCategories || skillCategories.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-20">
      <div className="container flex flex-col flex-grow justify-center">
        <h2
          ref={titleRef}
          className={cn(
            "section-title mb-8 md:mb-12 lg:mb-16",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Skills & Expertise
        </h2>

        <div
          ref={mainCarouselBlockRef}
          className={cn(
            "relative max-w-full mx-auto flex-grow flex flex-col justify-center",
            "transition-all duration-700 ease-out delay-200",
            isCarouselBlockVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={carouselContainerRef}
            className={cn(
              "flex overflow-x-auto scrollbar-hide py-8 px-4 space-x-4 md:space-x-6 items-center snap-x snap-mandatory w-full"
            )}
          >
            {skillCategories.map((category, index) => {
              const isThisCardActive = index === currentIndex;
              const isThisCardUserExpanded = !!userExpandedState[index];

              return (
                <div
                  key={category.name}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={cn(
                    "group rounded-xl p-0.5 transition-all duration-500 ease-in-out transform flex-shrink-0 snap-center",
                    "w-[calc(90vw-1rem)] max-w-[300px] sm:max-w-[320px] md:max-w-[350px]", // Consistent width for cards
                    isThisCardUserExpanded ? "h-auto" : "h-[450px]", // Fixed initial height, auto if expanded by user
                    isThisCardActive
                      ? "scale-105 bg-gradient-to-br from-primary via-primary to-accent shadow-xl z-10"
                      : "scale-100 hover:shadow-lg z-0",
                    "cursor-pointer" // Allow clicking card to center it
                  )}
                  role="listitem"
                  onClick={() => { if (index !== currentIndex) goToSlide(index); }}
                  aria-label={`Skill category: ${category.name}. ${isThisCardActive ? 'Currently active.' : ''} ${isThisCardUserExpanded ? 'Expanded.' : ''}`}
                >
                  <SkillItemCard
                    category={category}
                    isUserExpanded={isThisCardUserExpanded}
                    onToggleExpand={() => toggleUserExpand(index)}
                    contentMaxHeightBeforeExpand="150px" // Max height for skill list before "more"
                  />
                </div>
              );
            })}
          </div>

          {skillCategories.length > 1 && (
            <>
              <div className="absolute -left-1 sm:-left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-primary to-accent">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                  aria-label="Previous skill category"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute -right-1 sm:-right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-primary to-accent">
                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                  aria-label="Next skill category"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </>
          )}
        </div>

        {skillCategories.length > 1 && (
          <div className="flex justify-center items-center space-x-2 py-4 sm:py-6 mt-4">
            {skillCategories.map((_, index) => (
              <button
                key={`dot-skill-${index}`}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 ease-in-out",
                  currentIndex === index
                    ? "w-8 bg-primary/30 relative overflow-hidden"
                    : "w-2.5 border border-muted-foreground/70 bg-transparent hover:bg-muted-foreground/30"
                )}
                aria-label={`Go to skill category ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              >
                {currentIndex === index && (
                  <div
                    key={`fill-skill-${currentIndex}`}
                    className="h-full bg-primary rounded-full"
                    style={{ animation: 'progress-fill 9s linear forwards' }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
