
'use client';

import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/types/portfolio';
import { projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ReactNode } from 'react';

const mlAiKeywords = [
  // Core ML/AI Concepts
  "Machine Learning", "Deep Learning", "NLP", "Natural Language Processing", "Computer Vision", "Generative AI",
  "LLM", "Large Language Model", "Transformer", "Embedding", "Classification", "Regression", "Clustering",
  "Anomaly Detection", "Recommendation System", "Reinforcement Learning", "Semantic Similarity",
  "Textual Entailment", "Question Answering", "Fine-tuning", "Pre-trained Model", "Transfer Learning",
  // ML Techniques & Processes
  "Data Augmentation", "CutMix", "MixUp", "Model Pruning", "Quantization", "Adversarial Training",
  "Hard Negative Mining", "Parameter-Efficient", "LoRA", "Optimization", "Algorithm", "Generalization",
  "Accuracy", "Performance", "Cross-Validation", "Distributed Training", "Hyperparameter Tuning",
  // MLOps & Production
  "MLOps", "CI/CD", "Data Pipeline", "Deployment", "Production-Ready", "Scalable", "Robust", "Efficient",
  "Real-time", "Inference", "Monitoring", "Experiment Tracking", "Version Control",
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
    .map(skill => `\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const textContentRef = useRef<HTMLDivElement>(null); // Ref for text content animation

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

  // Effect for auto-sliding and text animation
  useEffect(() => {
    // Text content animation trigger
    if (textContentRef.current) {
      textContentRef.current.classList.remove('opacity-0', 'translate-y-5');
      textContentRef.current.classList.add('opacity-100', 'translate-y-0');
      // Re-trigger animation on currentIndex change by briefly making it non-visible
      setTimeout(() => {
        if (textContentRef.current) {
           textContentRef.current.classList.add('opacity-0', 'translate-y-5');
           setTimeout(() => {
            if (textContentRef.current) {
              textContentRef.current.classList.remove('opacity-0', 'translate-y-5');
              textContentRef.current.classList.add('opacity-100', 'translate-y-0');
            }
           }, 50); // Small delay to allow CSS to re-apply
        }
      }, 0);
    }

    // Auto-sliding logic
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    if (!isPaused) {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
      }, 9000); // Change slide every 9 seconds
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [currentIndex, isPaused, projects.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section id="projects">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
          )}
        >
          Featured Projects
        </h2>
        <p
          className={cn(
            "text-center text-muted-foreground mb-12 max-w-2xl mx-auto",
          )}
        >
          Explore key projects where I've engineered impactful, production-ready AI solutions. This selection showcases my end-to-end expertise in developing scalable systems for NLP and Computer Vision, implementing advanced MLOps, and leveraging Generative AI to solve complex challenges.
        </p>

        <div
          ref={carouselRef}
          className={cn(
            "relative",
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-card shadow-xl rounded-lg overflow-hidden p-6 md:p-8 h-[500px] md:h-[450px] flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Left Pane: Text Content */}
            <div
              ref={textContentRef}
              key={currentIndex} // Re-keying to trigger animation on slide change
              className={cn(
                "md:w-1/2 space-y-4 text-center md:text-left",
                "transition-all duration-500 ease-in-out opacity-100 translate-y-0" 
              )}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary">{currentProject.title}</h3>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {highlightSkillsInDescriptionInternal(currentProject.carouselDescription, currentProject.techStack, `project-${currentIndex}-carousel`)}
              </p>
               <div className="mt-auto space-y-3 pt-4">
                 <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Full Description:</h4>
                     <ScrollArea className="h-[100px] pr-2 border rounded-md p-2 bg-background/50">
                        <p className="text-xs text-foreground leading-normal">
                        {highlightSkillsInDescriptionInternal(
                            currentProject.description,
                            currentProject.techStack,
                            `project-${currentIndex}-desc`
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
            </div>

            {/* Right Pane: Visual Placeholder */}
            <div className="md:w-1/2 w-full h-64 md:h-auto md:min-h-[350px] bg-muted rounded-md flex items-center justify-center p-4 relative aspect-video">
               <Image
                  src={currentProject.imageUrl}
                  alt={currentProject.title}
                  fill
                  style={{objectFit: 'cover'}}
                  className="rounded-md"
                  data-ai-hint={currentProject.imageHint}
                  priority={currentIndex === 0} // Prioritize loading the first image
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-md"></div>
              <p className="text-lg font-semibold text-background/80 z-10 p-4 text-center bg-black/30 rounded backdrop-blur-sm">
                Visual for {currentProject.title}
              </p>
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
                  ? "w-6 bg-primary/30 relative overflow-hidden" // Active dot: wider, track color, relative for inner progress
                  : "w-2 border border-muted-foreground/70 bg-transparent hover:bg-muted-foreground/30" // Inactive dot
              )}
              aria-label={`Go to project ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            >
              {currentIndex === index && (
                <div
                  key={currentIndex} // Reset animation when currentIndex changes
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

