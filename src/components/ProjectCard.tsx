
'use client';

import Image from 'next/image';
import type { Project } from '@/types/portfolio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onActivate: () => void;
  projectNumber: number;
}

// Helper function to highlight skills in the description
const highlightSkillsInDescriptionInternal = (
  description: string,
  skillsToHighlight: string[]
): React.ReactNode[] => {
  if (!skillsToHighlight || skillsToHighlight.length === 0) {
    return [description];
  }

  // Escape special regex characters in skill names and join them with | for an OR condition
  // Ensure we match whole words only using \b (word boundary)
  const pattern = skillsToHighlight
    .map(skill => `\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  const parts = description.split(regex);

  return parts.map((part, index) => {
    // Check if the current part is one of the skills (case-insensitive)
    const isSkill = skillsToHighlight.some(skill => part.toLowerCase() === skill.toLowerCase());
    if (isSkill) {
      // Use index from map as key, as it's unique among siblings here
      return <span key={index} className="font-semibold text-accent">{part}</span>;
    }
    return part;
  });
};


export function ProjectCard({ project, isActive, onActivate, projectNumber }: ProjectCardProps) {
  return (
    <div
      onClick={onActivate}
      className={cn(
        "relative flex-none rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ease-in-out h-[450px] group",
        "bg-card text-card-foreground",
        isActive ? "w-[90vw] max-w-[600px]" : "w-20 md:w-24 hover:w-28 md:hover:w-32"
      )}
      aria-expanded={isActive}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onActivate();}}
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        className={cn(
          "absolute inset-0 z-0 transition-opacity duration-500",
          isActive ? "opacity-20 dark:opacity-10" : "opacity-100 group-hover:opacity-80"
        )}
        data-ai-hint={project.imageHint || 'technology project'}
        priority={projectNumber <= 2}
      />

      {isActive ? (
        // Expanded View
        <div className="relative z-10 flex flex-col h-full p-6 bg-card/80 dark:bg-card/90 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-primary mb-3">{project.title}</h3>
          <ScrollArea className="flex-grow mb-4 pr-3">
            <p className="text-sm text-foreground leading-relaxed">
              {highlightSkillsInDescriptionInternal(
                project.description,
                project.techStack
              )}
            </p>
          </ScrollArea>
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">TECH STACK:</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-border/20">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github /> GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={(e) => e.stopPropagation()}>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        // Collapsed View
        <div className="relative z-10 flex flex-col justify-end h-full p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            "group-hover:mb-1"
            )}>
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/80 text-primary-foreground text-sm md:text-base font-bold mb-1 md:mb-2 ring-2 ring-primary-foreground/50">
              {projectNumber}
            </div>
            <h4 className="text-white text-xs md:text-sm font-semibold line-clamp-2 transform-gpu transition-all duration-300 ease-in-out origin-bottom opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90">
              {project.title}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}
