
'use client';

import { useRef } from 'react';
import { projects } from '@/lib/data';
import { ProjectCard } from './ProjectCard';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });

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
          My Projects
        </h2>
        <div className="space-y-8 py-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              projectNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
