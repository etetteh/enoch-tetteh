
'use client';

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Github, ExternalLink, ArrowRight, VideoIcon } from 'lucide-react';
import { projects } from '@/lib/data';
import type { Project } from '@/types/portfolio';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

// Combined list of professional keywords
const mlAiProfessionalKeywords = [
  "Machine Learning", "Deep Learning", "NLP", "Natural Language Processing", "Computer Vision", "Generative AI",
  "LLM", "Large Language Model", "Transformer", "Embedding", "Classification", "Regression", "Clustering",
  "Anomaly Detection", "Recommendation System",
  "Fine-tuning", "Pre-trained Model", "Transfer Learning", "Data Augmentation", "CutMix", "MixUp",
  "Model Pruning", "Quantization", "Adversarial Training", "Hard Negative Mining", "Parameter-Efficient",
  "LoRA", "Optimization", "Algorithm", "Generalization", "Accuracy", "Performance",
  "Cross-Validation", "Distributed Training", "Hyperparameter Tuning",
  "MLOps", "CI/CD", "Data Pipeline", "Deployment", "Production-Ready", "Scalable", "Robust", "Efficient",
  "Real-time", "Inference", "Monitoring", "Experiment Tracking", "Version Control", "LLMOps",
  "PyTorch", "Scikit-learn", "LangChain", "Hugging Face", "Transformers", "Datasets",
  "Accelerate", "PEFT", "TIMM", "TorchMetrics", "Sentence-Transformers", "FAISS", "Vertex AI", "Google Gemini API",
  "MLflow", "Ray Tune", "Weights & Biases", "ONNX", "FastAPI", "Docker", "Kubernetes", "GCP",
  "Google Cloud Platform", "BigQuery", "Pydantic", "pytest", "flake8", "mypy", "GitHub Actions",
  "Architected", "Developed", "Implemented", "Engineered", "Optimized", "Deployed", "Integrated",
  "Researched", "Analyzed", "Spearheaded", "Led", "Managed", "Designed", "Automated", "Built",
  "Enterprise-grade", "State-of-the-art", "High-performance", "Production-grade"
];

const highlightSkillsInDescriptionInternal = (
  description: string,
  skillsToHighlight: string[],
  uniquePrefix: string
): ReactNode[] => {
  if (typeof description !== 'string' || !description) {
    return [React.createElement(React.Fragment, { key: `${uniquePrefix}-empty` }, description || '')];
  }

  const combinedKeywords = Array.from(new Set([...skillsToHighlight, ...mlAiProfessionalKeywords].filter(kw => typeof kw === 'string' && kw.trim() !== '')));

  if (combinedKeywords.length === 0) {
     return [React.createElement(React.Fragment, { key: `${uniquePrefix}-nodesc` }, description)];
  }

  const escapedKeywords = combinedKeywords.map(keyword =>
    keyword.replace(/[.*+?^${}()|[\]\\\\]/g, '\\$&')
  );

  const patternString = `\\b(${escapedKeywords.join('|')})\\b`;
  if (!patternString || patternString === "\\b()\\b") {
     return [React.createElement(React.Fragment, { key: `${uniquePrefix}-nopatt` }, description)];
  }

  const regex = new RegExp(patternString, 'gi');
  const parts = description.split(regex);

  return parts.map((part, index) => {
    const key = `${uniquePrefix}-part-${index}`;
    if (typeof part === 'string' && part.length > 0) {
        const isKeyword = combinedKeywords.some(keyword => typeof keyword === 'string' && part.toLowerCase() === keyword.toLowerCase());
        if (isKeyword) {
          return React.createElement('span', { key: key, className: "font-bold text-accent" }, part);
        }
        return React.createElement(React.Fragment, { key: key }, part);
    }
    return React.createElement(React.Fragment, { key: key });
  });
};


export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const carouselBlockRef = useRef<HTMLDivElement>(null);

  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const isDescriptionVisible = useFadeInOnScroll(descriptionRef, { threshold: 0.1, delay: 100 });
  const isCarouselBlockVisible = useFadeInOnScroll(carouselBlockRef, { threshold: 0.05, delay: 200 });


  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex] || projects[0];
  if (!currentProject) {
    return <div className="container text-center py-10">Error loading project data. Please try again later.</div>;
  }

  const allKeywordsToHighlight = currentProject.techStack.concat(mlAiProfessionalKeywords);


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
  }, [currentIndex, isPaused, projects.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-1000 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Featured Projects
        </h2>
        <p
          ref={descriptionRef}
          className={cn(
            "text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm sm:text-base",
            "transition-all duration-1000 ease-out delay-100",
            isDescriptionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Explore key projects where I've engineered impactful, production-ready AI solutions. This selection showcases my end-to-end expertise in developing scalable systems for NLP and Computer Vision, implementing advanced MLOps, and leveraging Generative AI to solve complex challenges.
        </p>

        <div
          ref={carouselBlockRef}
          className={cn(
            "my-8",
            "transition-all duration-1000 ease-out delay-200",
            isCarouselBlockVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div
            ref={carouselRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={cn(
              "bg-card shadow-xl rounded-lg overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8",
              "md:h-[500px]" 
            )}>
              {/* Left Pane: Text Content */}
              <div
                key={currentProject.id + '-text-pane'} 
                className="w-full md:w-1/2 md:h-full flex flex-col"
              >
                 <div className="flex-grow min-h-0 overflow-y-auto">
                    <div className="p-1 md:p-2 lg:p-4 space-y-3 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary">{currentProject.title}</h3>
                      {currentProject.keyAchievement && (
                        <p className="text-xs sm:text-sm md:text-md font-bold text-foreground mt-1 mb-2">
                          {currentProject.keyAchievement}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm md:text-base text-foreground leading-relaxed">
                        {highlightSkillsInDescriptionInternal(currentProject.carouselDescription, currentProject.techStack, `project-carousel-short-${currentIndex}`)}
                      </p>

                      <Dialog>
                        <DialogTrigger asChild>
                           <Button
                            variant="default"
                            size="sm"
                            className={cn(
                              "rounded-full px-3 py-1.5 text-xs sm:text-sm flex items-center gap-2 group mt-2",
                              "text-primary-foreground bg-gradient-to-br from-primary via-accent to-ring hover:brightness-90"
                            )}
                          >
                            See more
                            <span className="bg-primary-foreground group-hover:bg-primary-foreground/80 rounded-full p-1 transition-colors">
                              <ArrowRight className="h-3 w-3 text-primary" />
                            </span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden"> 
                          <DialogHeader className="p-6 pb-4 border-b shrink-0 sticky top-0 bg-background z-10">
                            <DialogTitle className="text-2xl text-primary">{currentProject.title}</DialogTitle>
                          </DialogHeader>
                          
                          <div className="flex-grow min-h-0 overflow-y-auto px-6 py-4 text-xs sm:text-sm text-foreground leading-relaxed space-y-2">
                                {currentProject.description.split('\n').map((paragraph, i) => (
                                  <p key={i} className={paragraph.startsWith('Key innovations include') || paragraph.startsWith('Key innovations:') ? 'font-bold mt-2' : ''}>
                                    {highlightSkillsInDescriptionInternal(
                                      paragraph,
                                      allKeywordsToHighlight,
                                      `project-desc-dialog-${currentIndex}-p-${i}`
                                    )}
                                  </p>
                                ))}
                          </div>

                          {(currentProject.githubUrl || currentProject.liveUrl) && (
                            <DialogFooter className="flex-shrink-0 flex gap-2 justify-end pt-4 pb-6 px-6 border-t border-border/30 sticky bottom-0 bg-background z-10">
                              {currentProject.githubUrl && (
                                <Button variant="outline" size="sm" asChild className="transform transition-transform hover:scale-105">
                                  <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github /> GitHub
                                  </a>
                                </Button>
                              )}
                              {currentProject.liveUrl && (
                                <Button size="sm" asChild className="text-primary-foreground bg-gradient-to-br from-primary via-accent to-ring hover:brightness-90 transform transition-transform hover:scale-105">
                                  <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink /> Live Demo
                                  </a>
                                </Button>
                              )}
                            </DialogFooter>
                          )}
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
                </div>
                <div className="flex-shrink-0 flex gap-2 justify-center md:justify-start pt-4 border-t border-border/30 mt-auto p-1 md:p-2 lg:p-4">
                  {currentProject.githubUrl && (
                    <Button variant="outline" size="sm" asChild className="transform transition-transform hover:scale-105">
                      <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github /> GitHub
                      </a>
                    </Button>
                  )}
                  {currentProject.liveUrl && (
                    <Button size="sm" asChild className="text-primary-foreground bg-gradient-to-br from-primary via-accent to-ring hover:brightness-90 transform transition-transform hover:scale-105">
                      <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Pane: Visual Placeholder */}
              <div
                className={cn(
                  "w-full md:w-1/2 h-64 md:h-full rounded-md flex flex-col items-center justify-center p-4 relative aspect-video md:aspect-auto",
                  currentIndex % 4 === 0 ? "bg-gradient-to-br from-primary/20 to-primary/5" :
                    currentIndex % 4 === 1 ? "bg-gradient-to-br from-accent/20 to-accent/5" :
                      currentIndex % 4 === 2 ? "bg-gradient-to-br from-secondary/30 to-secondary/10" :
                        "bg-gradient-to-br from-ring/20 to-ring/5",
                )}
                data-ai-hint={currentProject.imageHint}
              >
                <div className="text-center">
                  <VideoIcon className="h-16 w-16 text-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-foreground/50">Project Visual Coming Soon</p>
                </div>
              </div>
            </div>

            {projects.length > 1 && (
              <>
                <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-accent to-ring">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 p-0.5 group transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-primary via-accent to-ring">
                  <Button
                    variant="outline"
                    onClick={handleNext}
                    className="rounded-full w-full h-full p-0 flex items-center justify-center bg-background text-muted-foreground group-hover:bg-card group-hover:text-primary group-hover:border-transparent"
                    aria-label="Next Project"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {projects.length > 1 && (
          <div className="flex justify-center items-center space-x-2 py-6">
            {projects.map((_, index) => (
              <button
                key={`dot-project-${index}`}
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
                    key={`fill-project-${currentIndex}`}
                    className="h-full bg-primary rounded-full"
                    style={{ animation: 'progress-fill 9s linear forwards' }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

