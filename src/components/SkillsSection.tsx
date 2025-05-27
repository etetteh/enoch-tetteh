
'use client';

import { useState, useRef } from 'react';
import { skillCategories } from '@/lib/data';
import type { SkillCategory } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function SkillsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (category: SkillCategory) => {
    setSelectedSkill(category);
    setIsDialogOpen(true);
  };

  if (!skillCategories || skillCategories.length === 0) {
    return null;
  }

  return (
    <section id="skills">
      <div className="container mx-auto">
        <h2
          ref={titleRef}
          className="section-title"
        >
          Skills & Expertise
        </h2>

        <div
          ref={scrollContainerRef}
          className={cn(
            "flex overflow-x-auto scrollbar-hide py-8 px-4 space-x-4 md:space-x-6 items-stretch snap-x snap-mandatory",
            "w-full max-w-5xl h-auto", // Adjusted height to auto as cards are smaller
            "mx-auto justify-start md:justify-center" // Center if content is less than max-width
          )}
        >
          {skillCategories.map((category, index) => (
            <div
              key={category.name}
              onClick={() => handleCardClick(category)}
              className={cn(
                "group rounded-xl p-0.5 overflow-hidden transition-all duration-300 ease-in-out transform flex-shrink-0 snap-center",
                "w-48 h-56 sm:w-52 sm:h-60 shadow-lg cursor-pointer hover:opacity-90 hover:scale-105",
                "hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-ring"
              )}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(category);}}
              aria-label={`View skills for ${category.name}`}
            >
              <Card className="w-full h-full flex flex-col bg-card rounded-xl border-transparent">
                <CardHeader className="flex flex-col items-center text-center p-4 pt-6">
                  <category.icon className="h-12 w-12 mb-3 text-primary" />
                  <CardTitle className="text-md sm:text-lg font-medium text-primary">{category.name}</CardTitle>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>

        {selectedSkill && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader className="items-center text-center">
                <selectedSkill.icon className="h-16 w-16 text-primary mb-2" />
                <DialogTitle className="text-2xl text-primary">{selectedSkill.name}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-64 mt-4 pr-3">
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedSkill.skills.map((skill) => (
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
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
