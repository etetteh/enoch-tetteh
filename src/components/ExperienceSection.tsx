
'use client';

import { useRef } from 'react';
import { experiences } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

const ExperienceCard = ({ exp }: { exp: typeof experiences[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useFadeInOnScroll(cardRef, { threshold: 0.1 });

  return (
    <div
      ref={cardRef}
      className={cn(
        "group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <Card className="bg-card rounded-lg">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-primary">{exp.role}</CardTitle>
              <CardDescription className="text-md text-muted-foreground">{exp.company} | {exp.period}</CardDescription>
            </div>
            <exp.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
            {exp.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export function ExperienceSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });

  return (
    <section id="experience" className="bg-secondary">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
