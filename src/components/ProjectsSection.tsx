
'use client';

import { useRef } from 'react';
import { projects } from '@/lib/data';
import { ProjectCard } from './ProjectCard';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useFadeInOnScroll(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cn(
        "bg-secondary transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
