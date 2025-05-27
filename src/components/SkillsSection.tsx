
'use client';

import { useState, useRef, useEffect } from 'react';
import { skillCategories } from '@/lib/data';
import type { SkillCategory } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? skillCategories.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === skillCategories.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, skillCategories.length);
  }, []);

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
  }, [currentIndex, isPaused, skillCategories.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const activeCard = cardRefs.current[currentIndex];

    if (container && activeCard) {
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
    <section id="skills">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Skills & Expertise
        </h2>

        <div
          className="relative max-w-5xl mx-auto" // Constrain width for arrow positioning
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollContainerRef}
            className={cn(
              "flex overflow-x-auto scrollbar-hide py-8 px-4 space-x-4 md:space-x-6 items-stretch snap-x snap-mandatory h-[400px] sm:h-[460px] w-full" 
              // Removed: justify-center, mx-auto, max-w-5xl from here
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
                    "group rounded-xl p-0.5 overflow-hidden transition-all duration-500 ease-in-out transform flex-shrink-0 snap-center cursor-pointer shadow-lg",
                    isActive
                      ? "w-64 sm:w-72 opacity-100 scale-105 bg-gradient-to-br from-primary via-accent to-ring"
                      : "w-48 sm:w-52 opacity-70 hover:opacity-90 hover:scale-105 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-ring"
                  )}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(index);}}
                  aria-label={`View skills for ${category.name}. ${isActive ? 'Currently active.' : ''}`}
                  aria-expanded={isActive}
                >
                  <Card
                    className={cn(
                      "w-full h-full flex flex-col items-center justify-start text-center p-1 transition-all duration-300 ease-in-out overflow-hidden",
                      isActive ? "bg-card" : "bg-card", 
                      "rounded-xl"
                    )}
                  >
                    <CardHeader className="p-2 shrink-0">
                      <category.icon
                        className={cn(
                          "mx-auto mb-2 transition-all duration-300 ease-in-out",
                          isActive ? "h-12 w-12 sm:h-16 sm:w-16 text-primary" : "h-10 w-10 sm:h-12 sm:w-12 text-primary opacity-100"
                        )}
                      />
                      <CardTitle
                        className={cn(
                          "transition-all duration-300 ease-in-out",
                          isActive ? "text-lg sm:text-xl font-semibold text-primary" : "text-md sm:text-lg font-medium text-primary opacity-100"
                        )}
                      >
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={cn(
                        "w-full flex-grow overflow-hidden transition-all duration-500 ease-in-out",
                        isActive ? "max-h-full opacity-100 pt-3" : "max-h-0 opacity-0 p-0"
                      )}
                    >
                      {isActive && ( 
                        <ScrollArea className="h-full">
                          <div className="flex flex-wrap gap-2 justify-center p-3 sm:p-4">
                            {category.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs py-1 px-2"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-ring">
            <Button
              variant="outline"
              onClick={handlePrev}
              className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
              aria-label="Previous skill category"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-ring">
            <Button
              variant="outline"
              onClick={handleNext}
              className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
              aria-label="Next skill category"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center space-x-2 py-6">
          {skillCategories.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-in-out",
                currentIndex === index
                  ? "w-6 bg-primary/30 relative overflow-hidden"
                  : "w-2 border border-muted-foreground/70 bg-transparent hover:bg-muted-foreground/30"
              )}
              aria-label={`Go to skill category ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            >
              {currentIndex === index && (
                <div
                  key={`fill-${currentIndex}`}
                  className="h-full bg-primary rounded-full"
                  style={{ animation: 'progress-fill 9s linear forwards' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
