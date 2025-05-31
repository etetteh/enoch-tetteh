
'use client';

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { skillCategories } from '@/lib/data';
import type { SkillCategory } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

export function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const mainCarouselBlockRef = useRef<HTMLDivElement>(null);

  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const isCarouselBlockVisible = useFadeInOnScroll(mainCarouselBlockRef, { threshold: 0.05, delay: 200 });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === skillCategories.length - 1 ? 0 : prevIndex + 1
    );
  }, [skillCategories.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? skillCategories.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, skillCategories.length);
  }, [skillCategories.length]);

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
  }, [currentIndex, isPaused, skillCategories.length, handleNext]);

  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    // Center the active card
    const activeCard = cardRefs.current[currentIndex];
    if (activeCard) {
      const containerWidth = container.offsetWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      
      let targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, container.scrollWidth - containerWidth));

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth', // Changed to smooth for better visual transition
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
            "section-title mb-8 md:mb-12 lg:mb-16", // Adjusted margin bottom
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Skills & Expertise
        </h2>

        <div
          ref={mainCarouselBlockRef}
          className={cn(
            "relative max-w-full mx-auto flex-grow flex flex-col justify-center", // Use full width and allow flex grow
            "transition-all duration-700 ease-out delay-200",
            isCarouselBlockVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={carouselContainerRef}
            className={cn(
              "flex overflow-x-auto scrollbar-hide py-8 px-4 space-x-4 md:space-x-6 items-center snap-x snap-mandatory w-full" // items-center to vertically align cards if heights differ
            )}
          >
            {skillCategories.map((category, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={category.name}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "group rounded-xl p-0.5 overflow-hidden transition-all duration-500 ease-in-out transform flex-shrink-0 snap-center cursor-pointer",
                    isActive
                      ? "w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg opacity-100 scale-105 bg-gradient-to-br from-primary via-primary to-accent shadow-xl" // Larger active card
                      : "w-28 sm:w-32 md:w-36 opacity-60 hover:opacity-80 hover:scale-105 hover:bg-gradient-to-br hover:from-primary/50 via-primary/50 to-accent/50" // Adjusted inactive card
                  )}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleCardClick(index);
                  }}
                  aria-label={`View skills for ${category.name}. ${isActive ? 'Currently active.' : ''
                    }`}
                  aria-expanded={isActive}
                >
                  <Card
                    className={cn(
                      "w-full h-full flex flex-col items-center text-center p-2 sm:p-3 transition-all duration-300 ease-in-out overflow-hidden justify-start rounded-xl",
                      isActive ? "bg-card" : "bg-card" 
                    )}
                  >
                    <CardHeader className={cn("p-2 sm:p-3 shrink-0 w-full")}>
                      <category.icon
                        className={cn(
                          "mx-auto mb-2 transition-all duration-300 ease-in-out",
                          isActive ? "h-12 w-12 sm:h-16 sm:w-16 text-primary" : "h-10 w-10 sm:h-12 sm:w-12 text-primary opacity-90"
                        )}
                      />
                      <CardTitle
                        className={cn(
                          "transition-all duration-300 ease-in-out",
                          isActive ? "text-lg sm:text-xl md:text-2xl font-semibold text-primary" : "text-md sm:text-lg font-medium text-primary opacity-90"
                        )}
                      >
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={cn(
                        "w-full transition-all duration-500 ease-in-out overflow-y-auto", // Allow vertical scroll if content still overflows card for some reason
                        isActive ? "opacity-100 pt-2 sm:pt-3 flex-grow" : "max-h-0 opacity-0 p-0"
                      )}
                    >
                      {isActive && (
                        <div className="flex flex-wrap gap-2 justify-center p-2 sm:p-3 md:p-4">
                          {category.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs sm:text-sm py-1 px-2.5" // Slightly larger badge
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {skillCategories.length > 1 && (
            <>
              <div className="absolute -left-1 sm:-left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-primary to-accent">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                  aria-label="Previous skill category"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute -right-1 sm:-right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-primary to-accent">
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
          <div className="flex justify-center items-center space-x-2 py-4 sm:py-6 mt-4"> {/* Added margin top */}
            {skillCategories.map((_, index) => (
              <button
                key={`dot-skill-${index}`}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 ease-in-out", // Slightly larger dots
                  currentIndex === index
                    ? "w-8 bg-primary/30 relative overflow-hidden" // Wider active dot
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
    