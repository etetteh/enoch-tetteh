
'use client';

import type { ReactNode } from 'react';
import type { Project } from '@/types/portfolio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

interface ProjectCardProps {
  project: Project;
  projectNumber: number;
}

// Helper function to highlight skills in the description
const highlightSkillsInDescriptionInternal = (
  description: string,
  skillsToHighlight: string[],
  currentProjectNumber: number
): ReactNode[] => {
  if (!skillsToHighlight || skillsToHighlight.length === 0) {
    return [description];
  }

  const pattern = skillsToHighlight
    .map(skill => `\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  const parts = description.split(regex);

  return parts.map((part, index) => {
    const isSkill = skillsToHighlight.some(skill => part.toLowerCase() === skill.toLowerCase());
    if (isSkill) {
      return <span key={`project-${currentProjectNumber}-skill-${part}-${index}`} className="font-semibold text-accent">{part}</span>;
    }
    return part;
  });
};

export function ProjectCard({ project, projectNumber }: ProjectCardProps) {
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const isCardVisible = useFadeInOnScroll(cardWrapperRef, { threshold: 0.1 });

  return (
    <div
      ref={cardWrapperRef}
      className={cn(
        "group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl",
        "transition-all duration-700 ease-out",
        isCardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <Card className="bg-card rounded-lg flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary mb-1">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <ScrollArea className="h-[100px] pr-3"> {/* Adjust height as needed */}
            <p className="text-sm text-foreground leading-relaxed">
              {highlightSkillsInDescriptionInternal(
                project.description,
                project.techStack,
                projectNumber
              )}
            </p>
          </ScrollArea>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
        {(project.githubUrl || project.liveUrl) && (
          <CardFooter className="flex justify-end gap-2 pt-4 border-t">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github /> GitHub
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink /> Live Demo
                </a>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
