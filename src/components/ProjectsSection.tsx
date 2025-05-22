import { projects } from '@/lib/data';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-secondary">
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
