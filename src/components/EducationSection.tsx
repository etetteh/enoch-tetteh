
'use client';

import { useRef } from 'react';
import { education } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useFadeInOnScroll(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="education"
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <Card className="bg-card rounded-lg">
                <CardHeader>
                   <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl font-semibold text-primary">{edu.degree}</CardTitle>
                        <CardDescription className="text-md text-muted-foreground">{edu.institution} | {edu.period}</CardDescription>
                      </div>
                      <edu.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                    </div>
                </CardHeader>
                {edu.description && (
                  <CardContent>
                    <p className="text-sm text-foreground">{edu.description}</p>
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
