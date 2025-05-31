
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Certification } from '@/types/portfolio';
import { certifications } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

const CertificationCard = ({ cert, isActive }: { cert: Certification; isActive: boolean }) => {
  const IconToUse = cert.icon || Award;

  return (
    <div
      className={cn(
        "rounded-xl p-0.5 shadow-lg transition-all duration-300 ease-in-out",
        "w-64 sm:w-72 md:w-80 lg:w-96 h-full flex-shrink-0 snap-center",
        isActive ? "opacity-100 scale-105 bg-gradient-to-br from-primary via-primary to-accent" : "opacity-70 scale-100 hover:opacity-90 hover:bg-gradient-to-br hover:from-primary hover:via-primary to-accent"
      )}
    >
      <Card className="bg-card rounded-xl h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <CardTitle className="text-lg sm:text-xl font-semibold text-primary">{cert.title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                Issuer: <span className="font-medium">{cert.issuer}</span>
              </CardDescription>
              {cert.dateObtained && (
                <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Date: {cert.dateObtained}
                </CardDescription>
              )}
            </div>
            <IconToUse className="h-8 w-8 sm:h-10 sm:w-10 text-primary flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
        <CardFooter className="mt-auto pt-4 border-t">
          <Button size="sm" asChild className="text-primary-foreground bg-gradient-to-br from-primary via-primary to-accent hover:brightness-90 w-full sm:w-auto">
            <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> View Credential
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export function CertificationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselBlockRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const isCarouselBlockVisible = useFadeInOnScroll(carouselBlockRef, { threshold: 0.05 });


  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, certifications.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? certifications.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === certifications.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    if (!isPaused && certifications.length > 1) {
      intervalIdRef.current = setInterval(() => {
        handleNext();
      }, 9000);
    }
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [currentIndex, isPaused, certifications.length]);

  useEffect(() => {
    const container = carouselContainerRef.current;
    const activeCard = cardRefs.current[currentIndex];

    if (container && activeCard) {
      const containerContentWidth = container.clientWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;

      let targetScrollLeft = cardLeft - (containerContentWidth / 2) + (cardWidth / 2);

      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, container.scrollWidth - containerContentWidth));

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'auto',
      });
    }
  }, [currentIndex]);

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Certifications & Learning
        </h2>
        <div
          ref={carouselBlockRef}
          className={cn(
            "relative max-w-3xl mx-auto",
            "transition-all duration-700 ease-out delay-200",
            isCarouselBlockVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={carouselContainerRef}
            className="flex overflow-x-auto scrollbar-hide py-8 px-4 space-x-4 md:space-x-6 items-stretch snap-x snap-mandatory h-[380px] sm:h-[400px]"
          >
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => goToSlide(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToSlide(index);}}
                aria-label={`View certificate: ${cert.title}`}
              >
                <CertificationCard cert={cert} isActive={index === currentIndex} />
              </div>
            ))}
          </div>

          {certifications.length > 1 && (
            <>
               <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-primary to-accent">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-primary to-accent">
                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </>
          )}
        </div>

        {certifications.length > 1 && (
          <div className="flex justify-center items-center space-x-2 py-6">
            {certifications.map((_, index) => (
              <button
                key={`dot-cert-${index}`}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-in-out",
                  currentIndex === index
                    ? "w-6 bg-primary/30 relative overflow-hidden"
                    : "w-2 border border-muted-foreground/70 bg-transparent hover:bg-muted-foreground/30"
                )}
                aria-label={`Go to certificate ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              >
                {currentIndex === index && (
                  <div
                    key={`fill-cert-${currentIndex}`}
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

