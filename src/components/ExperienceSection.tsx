
'use client';

import React, { type ReactNode, useRef } from 'react';
import type { Experience } from '@/types/portfolio';
import { experiences } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';


const mlAiProfessionalKeywords = [
  // Core ML/AI Concepts
  "Machine Learning", "Deep Learning", "NLP", "Natural Language Processing", "Computer Vision", "Generative AI",
  "LLM", "Large Language Model", "Transformer", "Embedding", "Classification", "Regression", "Clustering",
  "Anomaly Detection", "Recommendation System", "Reinforcement Learning", "Semantic Similarity",
  "Textual Entailment", "Question Answering",
  // ML Techniques & Processes
  "Fine-tuning", "Pre-trained Model", "Transfer Learning", "Data Augmentation", "CutMix", "MixUp",
  "Model Pruning", "Quantization", "Adversarial Training", "Hard Negative Mining", "Parameter-Efficient",
  "LoRA", "Optimization", "Algorithm", "Generalization", "Accuracy", "Performance",
  "Cross-Validation", "Distributed Training", "Hyperparameter Tuning",
  // MLOps & Production
  "MLOps", "CI/CD", "Data Pipeline", "Deployment", "Production-Ready", "Scalable", "Robust", "Efficient",
  "Real-time", "Inference", "Monitoring", "Experiment Tracking", "Version Control", "LLMOps",
  // Tools & Frameworks (examples, as tech stack is often separate)
  "PyTorch", "TensorFlow", "Scikit-learn", "LangChain", "Hugging Face", "Transformers", "Datasets",
  "Accelerate", "PEFT", "TIMM", "Sentence-Transformers", "FAISS", "Vertex AI", "Google Gemini API",
  "MLflow", "Ray Tune", "Weights & Biases", "ONNX", "FastAPI", "Docker", "Kubernetes", "GCP",
  "Google Cloud Platform", "BigQuery",
  // Action Verbs
  "Architected", "Developed", "Implemented", "Engineered", "Optimized", "Deployed", "Integrated",
  "Researched", "Analyzed", "Spearheaded", "Led", "Managed", "Designed", "Automated", "Built",
  // Impact/Quality Descriptors
  "Enterprise-grade", "State-of-the-art", "High-performance", "Production-grade"
];

const highlightExperienceKeywords = (
  text: string,
  uniquePrefix: string 
): ReactNode[] => {
  if (!text) return [<React.Fragment key={`${uniquePrefix}-empty`}>{text}</React.Fragment>];

  const patternString = mlAiProfessionalKeywords
    .map(keyword => `\\b${keyword.replace(/[.*+?^${}()|[\]\\\\]/g, '\\$&')}\\b`)
    .join('|');
  
  if (!patternString) return [<React.Fragment key={`${uniquePrefix}-nodesc`}>{text}</React.Fragment>];

  const regex = new RegExp(`(${patternString})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const key = `${uniquePrefix}-kw-${index}`;
    if (typeof part === 'string' && part.length > 0) {
        const isKeyword = mlAiProfessionalKeywords.some(keyword => typeof keyword === 'string' && part.toLowerCase() === keyword.toLowerCase());
        if (isKeyword) {
        return <span key={key} className="font-bold text-accent">{part}</span>;
        }
        return <React.Fragment key={key}>{part}</React.Fragment>;
    }
    return <React.Fragment key={key}></React.Fragment>;
  });
};

const ExperienceCard = ({ exp, expIndex }: { exp: Experience; expIndex: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useFadeInOnScroll(cardRef, { threshold: 0.1 });

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl p-0.5 bg-gradient-to-br from-primary via-primary to-accent shadow-lg",
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <Card className="bg-card rounded-lg h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-primary">{exp.role}</CardTitle>
              <CardDescription className="text-sm sm:text-md text-muted-foreground">{exp.company} | {exp.period}</CardDescription>
            </div>
            <exp.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-foreground">
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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-1000 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
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

