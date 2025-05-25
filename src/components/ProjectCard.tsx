
'use client';

import type { ReactNode } from 'react';
import type { Project } from '@/types/portfolio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
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
    .map(skill => `\\b${skill.replace(/[.*+?^${}()|[\]\\\\]/g, '\\$&')}\\b`)
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  const parts = description.split(regex);

  return parts.map((part, index) => {
    const isSkill = skillsToHighlight.some(skill => part.toLowerCase() === skill.toLowerCase());
    if (isSkill) {
      return <span key={`project-${currentProjectNumber}-skill-${part.toLowerCase().replace(/\s+/g, '-')}-${index}`} className="font-semibold text-accent">{part}</span>;
    }
    return part;
  });
};

export function ProjectCard({ project, index, isActive, onActivate, projectNumber }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "relative h-[450px] rounded-lg overflow-hidden shadow-lg cursor-pointer group",
        "transition-all duration-500 ease-in-out",
        isActive ? "w-[90vw] max-w-[600px] opacity-100" : "w-24 opacity-75 hover:opacity-100"
      )}
      onClick={() => onActivate(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onActivate(index); }}
      aria-label={`Project: ${project.title}. Click to ${isActive ? 'view' : 'expand'}.`}
      aria-expanded={isActive}
    >
      {/* Background Image for Collapsed State */}
      {!isActive && project.imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out group-hover:scale-105"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
          data-ai-hint={project.imageHint}
        />
      )}

      {/* Content Overlay/Container */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col",
          isActive ? "bg-card/95 backdrop-blur-sm" : "bg-gradient-to-t from-black/80 via-black/50 to-transparent justify-end"
        )}
      >
        {isActive ? (
          // Expanded Content
          <>
            <CardHeader className="pt-6 px-6 pb-2">
              <CardTitle className="text-2xl font-bold text-primary mb-1">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 px-6 pb-4 overflow-y-auto scrollbar-hide">
              <ScrollArea className="h-[100px] pr-3">
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
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
              <CardFooter className="flex justify-end gap-2 px-6 py-4 border-t shrink-0">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <Github /> GitHub
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink /> Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            )}
          </>
        ) : (
          // Collapsed Content
          <div className="p-4 text-white">
            <div className="w-8 h-8 mb-2 bg-primary/30 text-primary-foreground flex items-center justify-center rounded-full text-sm font-bold ring-2 ring-primary/50">
              {index + 1}
            </div>
            <h3 className="text-sm font-semibold truncate group-hover:whitespace-normal group-hover:overflow-visible">
              {project.title}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
