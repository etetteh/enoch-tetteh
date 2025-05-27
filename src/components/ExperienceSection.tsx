
'use client';

import type { Experience } from '@/types/portfolio';
import { experiences } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { type ReactNode } from 'react'; // Added full React import

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
  uniquePrefix: string // For generating unique keys
): ReactNode[] => {
  if (!text) return [<React.Fragment key={`${uniquePrefix}-empty`}>{text}</React.Fragment>];

  const pattern = mlAiProfessionalKeywords
    .map(keyword => `\\b${keyword.replace(/[.*+?^${}()|[\]\\\\]/g, '\\$&')}\\b`)
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  
  if (!pattern) return [<React.Fragment key={`${uniquePrefix}-nodesc`}>{text}</React.Fragment>];

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
    // Return a fragment for empty or non-string parts to ensure a valid ReactNode array
    return <React.Fragment key={key}></React.Fragment>;
  });
};

const ExperienceCard = ({ exp, expIndex }: { exp: Experience; expIndex: number }) => {

  return (
    <div
      className={cn(
        "rounded-xl p-0.5 bg-gradient-to-br from-primary via-accent to-ring shadow-lg",
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

  return (
    <section id="experience">
      <div className="container">
        <h2
          className={cn(
            "section-title",
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
