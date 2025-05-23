
'use client';

import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/types/portfolio';
import { projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Helper function to highlight skills - kept internal to this file if not used elsewhere
const highlightSkillsInDescriptionInternal = (
  description: string,
  skillsToHighlight: string[],
  currentProjectNumber: number
): React.ReactNode[] => {
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


export function ProjectsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const isCarouselVisible = useFadeInOnScroll(carouselRef, { threshold: 0.1 });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProject = projects[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="projects" className="bg-secondary">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Featured Projects
        </h2>
        <p 
          className={cn(
            "text-center text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-700 ease-out delay-100",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Explore some of the key projects I&apos;ve worked on, showcasing my skills in AI, Google Cloud, and large-scale system development.
        </p>

        <div
          ref={carouselRef}
          className={cn(
            "relative transition-all duration-700 ease-out delay-200",
            isCarouselVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="bg-card shadow-xl rounded-lg overflow-hidden p-6 md:p-8 min-h-[500px] md:min-h-[450px] flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Left Pane: Text Content */}
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">{currentProject.title}</h3>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {currentProject.carouselDescription}
              </p>
               <div className="mt-auto space-y-3 pt-4">
                 <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Full Description:</h4>
                     <ScrollArea className="h-[100px] pr-2 border rounded-md p-2 bg-background/50">
                        <p className="text-xs text-foreground leading-normal">
                        {highlightSkillsInDescriptionInternal(
                            currentProject.description,
                            currentProject.techStack,
                            currentIndex + 1
                        )}
                        </p>
                    </ScrollArea>
                 </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                    {currentProject.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-center md:justify-start pt-2">
                    {currentProject.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                        <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github /> GitHub
                        </a>
                    </Button>
                    )}
                    {currentProject.liveUrl && (
                    <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink /> Live Demo
                        </a>
                    </Button>
                    )}
                </div>
              </div>
            </div>

            {/* Right Pane: Visual Placeholder */}
            <div className="md:w-1/2 w-full h-64 md:h-auto md:min-h-[350px] bg-muted rounded-md flex items-center justify-center p-4 relative aspect-video">
               <Image 
                  src={currentProject.imageUrl} 
                  alt={currentProject.title} 
                  fill
                  className="object-cover rounded-md"
                  data-ai-hint={currentProject.imageHint}
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-md"></div>
              <p className="text-lg font-semibold text-background/80 z-10 p-4 text-center bg-black/30 rounded backdrop-blur-sm">
                Project Visual for {currentProject.title}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 hover:bg-background text-foreground"
            aria-label="Previous Project"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 hover:bg-background text-foreground"
            aria-label="Next Project"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  currentIndex === index ? "bg-primary" : "bg-muted-foreground/50 hover:bg-muted-foreground"
                )}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
