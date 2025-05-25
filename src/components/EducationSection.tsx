
'use client';

import { education } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const EducationCard = ({ edu }: { edu: typeof education[0] }) => {

  return (
    <div
      className={cn(
        "group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl",
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
                  isThesisLine ? "text-accent font-medium" : ""
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

  return (
    <section id="education">
      <div className="container">
        <h2
          className={cn(
            "section-title",
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
