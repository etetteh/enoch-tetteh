
'use client';

import type { Education } from '@/types/portfolio';
import { education } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

const EducationCard = ({ edu }: { edu: Education }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useFadeInOnScroll(cardRef, { threshold: 0.1 });

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl p-0.5 bg-gradient-to-br from-primary via-primary to-accent shadow-lg",
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <Card className="bg-card rounded-lg">
        <CardHeader>
           <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-semibold text-primary">{edu.degree}</CardTitle>
                <CardDescription className="text-sm sm:text-md text-muted-foreground">{edu.institution} | {edu.period}</CardDescription>
              </div>
              <edu.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
            </div>
        </CardHeader>
        {edu.description && edu.description.length > 0 && (
          <CardContent className="space-y-1">
            {edu.description.map((line, index) => {
              const isThesisLine = line.toLowerCase().startsWith('thesis:');
              return (
                <p key={index} className={cn(
                  "text-xs sm:text-sm text-foreground",
                  isThesisLine ? "text-accent font-bold" : ""
                )}>
                  {line}
                </p>
              );
            })}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef);

  return (
    <section id="education" ref={sectionRef}>
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-1000 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <EducationCard key={edu.id} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

