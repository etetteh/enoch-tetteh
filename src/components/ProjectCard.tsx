
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types/portfolio';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <CardHeader className="p-0">
            <div className="aspect-video relative w-full">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                data-ai-hint={project.imageHint || 'technology project'}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <CardTitle className="text-xl font-semibold mb-2 text-primary">{project.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </CardContent>
          {(project.githubUrl || project.liveUrl) && (
            <CardFooter className="p-6 pt-0 flex justify-end gap-2">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={(e) => e.stopPropagation()}>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <div className="relative aspect-video w-full -mx-6 -mt-6 mb-4 shrink-0"> {/* Adjust margins for full width effect */}
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
            data-ai-hint={project.imageHint || 'technology project'}
          />
        </div>
        <DialogHeader className="px-6 shrink-0">
          <DialogTitle className="text-2xl font-semibold text-primary">{project.title}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 space-y-4 overflow-y-auto flex-grow"> {/* Scrollable content area */}
          <p className="text-sm text-foreground leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
          </div>
        </div>
        {(project.githubUrl || project.liveUrl) && (
          <DialogFooter className="px-6 pb-6 pt-4 sm:justify-end gap-2 border-t shrink-0">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
