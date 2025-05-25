'use client';

import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2, Sparkles } from "lucide-react";
import { ResumeTailorForm } from "./ResumeTailorForm";
import { cn } from '@/lib/utils';
import { portfolioOwner } from '@/lib/data';
import { generateResumeFromWebsite } from '@/ai/flows/generate-resume-flow';
import { useToast } from '@/hooks/use-toast';

export function ResumeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const generateBlockRef = useRef<HTMLDivElement>(null);
  const tailorFormRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    try {
      const result = await generateResumeFromWebsite();
      if (result && result.resumeMarkdown) {
        const blob = new Blob([result.resumeMarkdown], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const sanitizedName = portfolioOwner.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `${sanitizedName}_Portfolio_Resume.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({
          title: "Resume Generated!",
          description: "Your resume has been generated and downloaded as a Markdown file.",
        });
      } else {
        throw new Error("No resume content generated.");
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Resume Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="resume-tailor">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
          )}
        >
          Resume & AI Tailoring
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div
            ref={generateBlockRef}
            className={cn(
              "space-y-6",
            )}
          >
            <h3 className="text-2xl font-semibold text-primary">Generate My Resume</h3>
            <p className="text-muted-foreground">
              Generate a dynamic resume in Markdown format based on the content of this portfolio.
              You can easily convert the downloaded Markdown file to PDF using various online or offline tools.
            </p>
            <Button 
              onClick={handleGenerateResume} 
              disabled={isGenerating}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transform transition-transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Generate Resume from Portfolio
                </>
              )}
            </Button>
          </div>

          <div
            ref={tailorFormRef}
            className={cn(
            )}
          >
            <ResumeTailorForm />
          </div>
        </div>
      </div>
    </section>
  );
}
