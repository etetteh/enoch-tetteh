'use client';

import React, { type ReactNode, useRef } from 'react';
import type { Education } from '@/types/portfolio';
import { education } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const EducationCard = ({ edu, eduIndex }: { edu: Education, eduIndex: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl p-0.5 bg-gradient-to-br from-primary via-primary to-accent shadow-lg",
        "opacity-100 scale-100"
      )}
    >
      <Card className="bg-card rounded-xl"> {/* Changed from rounded-lg */}
        <CardHeader>
           <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-primary">{edu.degree}</CardTitle>
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
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section id="education">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title opacity-100 translate-y-0"
          )}
        >
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} eduIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
