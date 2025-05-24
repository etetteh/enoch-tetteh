
'use client';

import { useState, useRef, useEffect } from 'react';
import { skillCategories } from '@/lib/data';
import type { SkillCategory } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area'; // Added import
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

export function SkillsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const isCarouselVisible = useFadeInOnScroll(carouselContainerRef, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, skillCategories.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? skillCategories.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === skillCategories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Scroll to active card
  useEffect(() => {
    if (cardRefs.current[currentIndex]) {
      cardRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);


  return (
    <section id="skills">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Skills & Expertise
        </h2>

        <div
          ref={carouselContainerRef}
          className={cn(
            "relative transition-all duration-700 ease-out delay-200",
            isCarouselVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex items-center justify-center px-4 sm:px-0"> {/* Centering wrapper for cards */}
            <div
              className="flex overflow-x-auto scrollbar-hide py-8 space-x-4 md:space-x-6 items-center snap-x snap-mandatory w-full max-w-5xl"
            >
              {skillCategories.map((category, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={category.name}
                    ref={el => cardRefs.current[index] = el}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "transition-all duration-300 ease-in-out transform flex-shrink-0 snap-center rounded-xl overflow-hidden",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "w-64 h-80 sm:w-72 sm:h-96 shadow-2xl scale-105 z-10 cursor-default bg-card border-2 border-primary"
                        : "w-48 h-64 sm:w-56 sm:h-72 shadow-lg scale-90 opacity-70 cursor-pointer bg-card/80 hover:opacity-90 hover:scale-95"
                    )}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCurrentIndex(index);}}
                    aria-label={`Skill category: ${category.name}. Click to view details.`}
                    aria-current={isActive}
                  >
                    <CardHeader className={cn(
                      "flex flex-col items-center text-center p-4 transition-all duration-300",
                      isActive ? "pt-6" : "pt-4"
                    )}>
                      <category.icon className={cn(
                        "transition-all duration-300 text-primary",
                        isActive ? "h-12 w-12 sm:h-16 sm:h-16 mb-3" : "h-8 w-8 sm:h-10 sm:h-10 mb-2"
                      )} />
                      <CardTitle className={cn(
                        "transition-all duration-300 text-primary",
                         isActive ? "text-lg sm:text-xl font-semibold" : "text-md sm:text-lg font-medium"
                      )}>{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className={cn(
                      "p-3 sm:p-4 transition-opacity duration-300",
                       isActive ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden" // Hide content on inactive cards for simplicity
                    )}>
                      {isActive && ( // Only render badges if active to save performance and simplify inactive view
                        <ScrollArea className="h-36 sm:h-40">
                           <div className="flex flex-wrap gap-2 justify-center">
                            {category.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs sm:text-sm py-1 px-2 sm:px-3">{skill}</Badge>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
             <div className="rounded-full p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary">
                <Button
                variant="outline"
                onClick={handlePrev}
                className="rounded-full h-10 w-10 p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                aria-label="Previous skill category"
                >
                <ChevronLeft className="h-6 w-6" />
                </Button>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
            <div className="rounded-full p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary">
                <Button
                variant="outline"
                onClick={handleNext}
                className="rounded-full h-10 w-10 p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                aria-label="Next skill category"
                >
                <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center space-x-2 py-4">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-in-out",
                  currentIndex === index
                    ? "w-6 bg-primary"
                    : "w-2 border border-muted-foreground/70 bg-transparent hover:bg-muted-foreground/30"
                )}
                aria-label={`Go to skill category ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
