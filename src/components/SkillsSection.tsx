
'use client';

import { useRef } from 'react';
import { skillCategories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

// Inner component to handle fade-in for individual skill cards
const SkillCategoryCard = ({ category }: { category: typeof skillCategories[0] }) => {
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
      <Card className="bg-card rounded-lg h-full">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <category.icon className="h-8 w-8 text-primary" />
          <CardTitle className="text-xl font-semibold text-primary">{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-sm py-1 px-3">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export function SkillsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <SkillCategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
