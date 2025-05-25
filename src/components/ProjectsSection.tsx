
'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import type { Project } from '@/types/portfolio';
import { projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Github, ExternalLink, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';


const mlAiKeywords = [
  // Core ML/AI Concepts
  "Machine Learning", "Deep Learning", "NLP", "Natural Language Processing", "Computer Vision", "Generative AI",
  "LLM", "Large Language Model", "Transformer", "Embedding", "Classification", "Regression", "Clustering",
  "Anomaly Detection", "Recommendation System", "Semantic Similarity",
  "Textual Entailment", "Question Answering", "Fine-tuning", "Pre-trained Model", "Transfer Learning",
  // ML Techniques & Processes
  "Data Augmentation", "CutMix", "MixUp", "Model Pruning", "Quantization", "Adversarial Training",
  "Hard Negative Mining", "Parameter-Efficient", "LoRA", "Optimization", "Algorithm", "Generalization",
  "Accuracy", "Performance", "Cross-Validation", "Distributed Training", "Hyperparameter Tuning",
  // MLOps & Production
  "MLOps", "CI/CD", "Data Pipeline", "Deployment", "Production-Ready", "Scalable", "Robust", "Efficient",
  "Real-time", "Inference", "Monitoring", "Experiment Tracking", "Version Control", "LLMOps",
  // Action Verbs
  "Architected", "Developed", "Implemented", "Engineered", "Optimized", "Deployed", "Integrated",
  "Researched", "Analyzed", "Spearheaded", "Led", "Managed", "Designed", "Automated", "Built",
  // Impact/Quality Descriptors
  "Enterprise-grade", "State-of-the-art", "High-performance", "Production-grade"
  // Specific tools are handled by project.techStack
];

// Helper function to highlight skills
const highlightSkillsInDescriptionInternal = (
  description: string,
  projectTechStack: string[],
  uniquePrefix: string
): ReactNode[] => {
  if (!description) return [description];

  const allKeywordsToHighlight = [...new Set([...projectTechStack, ...mlAiKeywords])];

  if (!allKeywordsToHighlight || allKeywordsToHighlight.length === 0) {
    return [description];
  }

  const pattern = allKeywordsToHighlight
    .map(skill => `\\b${skill.replace(/[.*+?^${}()|[\]\\\\]/g, '\\$&')}\\b`)
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  const parts = description.split(regex);

  return parts.map((part, index) => {
    const isKeyword = allKeywordsToHighlight.some(skill => part.toLowerCase() === skill.toLowerCase());
    if (isKeyword) {
      return <span key={`${uniquePrefix}-skill-${part.toLowerCase().replace(/\s+/g, '-')}-${index}`} className="font-semibold text-accent">{part}</span>;
    }
    return part;
  });
};


export function ProjectsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const textContentRef = useRef<HTMLDivElement>(null); 

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

  useEffect(() => {
    if (textContentRef.current) {
      textContentRef.current.classList.remove('animate-in', 'fade-in-0', 'duration-500');
      void textContentRef.current.offsetWidth; 
      textContentRef.current.classList.add('animate-in', 'fade-in-0', 'duration-500');
    }
  }, [currentIndex]);


  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    if (!isPaused && projects.length > 1) {
      intervalIdRef.current = setInterval(() => {
        handleNext();
      }, 9000); 
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section id="projects">
      <div className="container">
        <h2
          className="section-title"
        >
          Featured Projects
        </h2>
        <p
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-xs sm:text-sm"
        >
          Explore key projects where I've engineered impactful, production-ready AI solutions. This selection showcases my end-to-end expertise in developing scalable systems for NLP and Computer Vision, implementing advanced MLOps, and leveraging Generative AI to solve complex challenges.
        </p>

        <div
          ref={carouselRef}
          className="relative my-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-card shadow-xl rounded-lg overflow-hidden p-6 md:p-8 h-[550px] md:h-[500px] flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Left Pane: Text Content */}
            <div
              ref={textContentRef}
              key={currentIndex} 
              className="md:w-1/2 w-full h-full flex flex-col animate-in fade-in-0 duration-500"
            >
              <ScrollArea className="flex-grow">
                <div className="p-1 md:p-2 lg:p-4 space-y-3 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary">{currentProject.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-foreground leading-relaxed">
                    {highlightSkillsInDescriptionInternal(currentProject.carouselDescription, currentProject.techStack, `project-${currentIndex}-carousel`)}
                  </p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-neutral-800 dark:bg-neutral-700 text-blue-400 hover:bg-neutral-700 dark:hover:bg-neutral-600 hover:text-blue-300 rounded-full px-3 py-1.5 text-xs sm:text-sm flex items-center gap-2 group mt-2"
                      >
                        See more
                        <span className="bg-blue-500 group-hover:bg-blue-600 rounded-full p-1 transition-colors">
                          <ArrowRight className="h-3 w-3 text-white" />
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
                      <DialogHeader className="shrink-0">
                        <DialogTitle className="text-2xl text-primary">{currentProject.title}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="flex-grow my-4">
                        <div className="pr-4 text-sm text-foreground leading-relaxed">
                          {highlightSkillsInDescriptionInternal(
                              currentProject.description,
                              currentProject.techStack,
                              `project-${currentIndex}-desc-dialog`
                          )}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>

                  <div className="pt-3">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                      {currentProject.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="flex-shrink-0 flex gap-2 justify-center md:justify-start pt-4 border-t border-border/30 mt-auto p-1 md:p-2 lg:p-4">
                  {currentProject.githubUrl && (
                  <Button variant="outline" size="sm" asChild className="transform transition-transform hover:scale-105">
                      <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github /> GitHub
                      </a>
                  </Button>
                  )}
                  {currentProject.liveUrl && (
                  <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground transform transition-transform hover:scale-105">
                      <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink /> Live Demo
                      </a>
                  </Button>
                  )}
              </div>
            </div>

            {/* Right Pane: Visual Placeholder */}
            <div className="md:w-1/2 w-full h-64 md:h-full bg-muted rounded-md flex items-center justify-center p-4 relative aspect-video md:aspect-auto">
               <Image
                  src={currentProject.imageUrl}
                  alt={currentProject.title}
                  fill
                  style={{objectFit: 'cover'}}
                  className="rounded-md"
                  data-ai-hint={currentProject.imageHint}
                  priority={currentIndex === 0} 
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-md"></div>
            </div>
          </div>

          {/* Navigation Arrows */}
           <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary">
            <Button
              variant="outline"
              onClick={handlePrev}
              className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
              aria-label="Previous Project"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary">
            <Button
              variant="outline"
              onClick={handleNext}
              className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
              aria-label="Next Project"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center items-center space-x-2 py-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-in-out",
                currentIndex === index
                  ? "w-6 bg-primary/30 relative overflow-hidden" 
                  : "w-2 border border-muted-foreground/70 bg-transparent hover:bg-muted-foreground/30" 
              )}
              aria-label={`Go to project ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            >
              {currentIndex === index && (
                <div
                  key={currentIndex} 
                  className="h-full bg-primary rounded-full"
                  style={{ animation: 'progress-fill 9s linear forwards' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

