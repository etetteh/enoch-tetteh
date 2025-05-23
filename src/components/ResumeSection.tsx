
'use client';

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { ResumeTailorForm } from "./ResumeTailorForm";
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

export function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useFadeInOnScroll(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="resume-tailor"
      className={cn(
        "bg-secondary transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="container">
        <h2 className="section-title">Resume & AI Tailoring</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">Download My Resume</h3>
            <p className="text-muted-foreground">
              Get a copy of my full resume to learn more about my qualifications and experience.
              Please note: you need to add your resume.pdf to the public folder.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              {/* User needs to add resume.pdf to the public folder */}
              <a href="/resume.pdf" download="AlexJohnson_Resume.pdf">
                <Download className="mr-2 h-5 w-5" />
                Download Resume (PDF)
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              If the download doesn't start, ensure `public/resume.pdf` exists.
            </p>
          </div>

          <div>
            <ResumeTailorForm />
          </div>
        </div>
      </div>
    </section>
  );
}
