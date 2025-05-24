
'use client';

import { useRef } from 'react';
import type { Experience } from '@/types/portfolio';
import { experiences } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const professionalKeywords = [
  "Architected", "Developed", "Implemented", "Engineered", "Optimized", "Achieved", 
  "Reduced", "Improved", "Scaled", "Spearheaded", "Led", "Managed", "Designed", 
  "Automated", "Built", "Deployed", "Integrated", "Researched", "Analyzed",
  "enterprise-grade", "production-ready", "scalable", "robust", "efficient", 
  "high-performance", "state-of-the-art", "MLOps", "CI/CD", "data pipeline", 
  "real-time", "algorithm", "framework", "optimization", "generalization", 
  "accuracy", "performance", "cross-validation", "distributed training", 
  "parameter-efficient", "fine-tuning", "hard negative mining", "model pruning",
  "adversarial training", "interpretability", "quantization", "LLMs", "NLP", "Computer Vision"
];

const highlightExperienceKeywords = (
  text: string,
  uniquePrefix: string // For generating unique keys
): ReactNode[] => {
  if (!text) return [text];

  const pattern = professionalKeywords
    .map(keyword => `\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isKeyword = professionalKeywords.some(keyword => part.toLowerCase() === keyword.toLowerCase());
    if (isKeyword) {
      return <span key={`${uniquePrefix}-kw-${part.toLowerCase().replace(/\s+/g, '-')}-${index}`} className="font-semibold text-accent">{part}</span>;
    }
    return part;
  });
};

const ExperienceCard = ({ exp, expIndex }: { exp: Experience; expIndex: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useFadeInOnScroll(cardRef, { threshold: 0.1 });

  return (
    <div
      ref={cardRef}
      className={cn(
        "group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <Card className="bg-card rounded-lg">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-primary">{exp.role}</CardTitle>
              <CardDescription className="text-md text-muted-foreground">{exp.company} | {exp.period}</CardDescription>
            </div>
            <exp.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
            {exp.description.map((desc, bulletIndex) => (
              <li key={bulletIndex}>
                {highlightExperienceKeywords(desc, `exp-${expIndex}-bullet-${bulletIndex}`)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export function ExperienceSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });

  return (
    <section id="experience" className="bg-secondary">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} expIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
