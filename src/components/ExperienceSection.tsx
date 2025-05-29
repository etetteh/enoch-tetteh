
'use client';

import React, { type ReactNode, useRef } from 'react'; // Ensure React is imported
import type { Experience } from '@/types/portfolio';
import { experiences } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';


const mlAiProfessionalKeywords = [
  "Machine Learning", "Deep Learning", "NLP", "Natural Language Processing", "Computer Vision", "Generative AI",
  "LLM", "Large Language Model", "Transformer", "Embedding", "Classification", "Regression", "Clustering",
  "Anomaly Detection", "Recommendation System", "Reinforcement Learning", "Semantic Similarity",
  "Textual Entailment", "Question Answering",
  "Fine-tuning", "Pre-trained Model", "Transfer Learning", "Data Augmentation", "CutMix", "MixUp",
  "Model Pruning", "Quantization", "Adversarial Training", "Hard Negative Mining", "Parameter-Efficient",
  "LoRA", "Optimization", "Algorithm", "Generalization", "Accuracy", "Performance",
  "Cross-Validation", "Distributed Training", "Hyperparameter Tuning",
  "MLOps", "CI/CD", "Data Pipeline", "Deployment", "Production-Ready", "Scalable", "Robust", "Efficient",
  "Real-time", "Inference", "Monitoring", "Experiment Tracking", "Version Control", "LLMOps",
  "PyTorch", "TensorFlow", "Scikit-learn", "LangChain", "Hugging Face", "Transformers", "Datasets",
  "Accelerate", "PEFT", "TIMM", "Sentence-Transformers", "FAISS", "Vertex AI", "Google Gemini API",
  "MLflow", "Ray Tune", "Weights & Biases", "ONNX", "FastAPI", "Docker", "Kubernetes", "GCP",
  "Google Cloud Platform", "BigQuery",
  "Architected", "Developed", "Implemented", "Engineered", "Optimized", "Deployed", "Integrated",
  "Researched", "Analyzed", "Spearheaded", "Led", "Managed", "Designed", "Automated", "Built",
  "Enterprise-grade", "State-of-the-art", "High-performance", "Production-grade"
];

const highlightExperienceKeywords = (
  text: string,
  uniquePrefix: string 
): ReactNode[] => {
  if (typeof text !== 'string' || !text) {
    return [React.createElement(React.Fragment, { key: `${uniquePrefix}-empty` }, text)];
  }

  const patternString = mlAiProfessionalKeywords
    .map(keyword => `\\b${keyword.replace(/[.*+?^${}()|[\]\\\\]/g, '\\$&')}\\b`)
    .join('|');
  
  if (!patternString) {
    return [React.createElement(React.Fragment, { key: `${uniquePrefix}-nodesc` }, text)];
  }

  const regex = new RegExp(`(${patternString})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const key = `${uniquePrefix}-kw-${index}`;
    if (typeof part === 'string' && part.length > 0) {
        const isKeyword = mlAiProfessionalKeywords.some(keyword => typeof keyword === 'string' && part.toLowerCase() === keyword.toLowerCase());
        if (isKeyword) {
          return React.createElement('span', { key: key, className: "font-bold text-accent" }, part);
        }
        return React.createElement(React.Fragment, { key: key }, part);
    }
    return React.createElement(React.Fragment, { key: key }); 
  });
};

const ExperienceCard = ({ exp, expIndex }: { exp: Experience; expIndex: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // const isVisible = useFadeInOnScroll(cardRef, { threshold: 0.1, delay: expIndex * 100 }); // Fade-in removed by user request

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl p-0.5 bg-gradient-to-br from-primary via-accent to-ring shadow-lg",
        // "transition-all duration-1000 ease-out", // Fade-in removed
        // isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95" // Fade-in removed
        "opacity-100 scale-100" // Ensure it's visible
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  // const isTitleVisible = useFadeInOnScroll(titleRef); // Fade-in removed

  return (
    <section id="experience">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title"
            // "transition-all duration-1000 ease-out", // Fade-in removed
            // isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4" // Fade-in removed
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
