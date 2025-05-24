
'use client';

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { ResumeTailorForm } from "./ResumeTailorForm";
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';
import { portfolioOwner } from '@/lib/data'; // Import portfolioOwner

export function ResumeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const downloadBlockRef = useRef<HTMLDivElement>(null);
  const tailorFormRef = useRef<HTMLDivElement>(null); 

  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const isDownloadBlockVisible = useFadeInOnScroll(downloadBlockRef, { threshold: 0.1 });
  const isTailorFormVisible = useFadeInOnScroll(tailorFormRef, { threshold: 0.1 });

  // Sanitize the name for use in a filename
  const sanitizedName = portfolioOwner.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const resumeFilename = `${sanitizedName}_resume.pdf`;

  return (
    <section id="resume-tailor" className="bg-secondary">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Resume & AI Tailoring
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div
            ref={downloadBlockRef}
            className={cn(
              "space-y-6",
              "transition-all duration-700 ease-out",
              isDownloadBlockVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h3 className="text-2xl font-semibold text-primary">Download My Resume</h3>
            <p className="text-muted-foreground">
              Get a copy of my full resume to learn more about my qualifications and experience.
              Please note: you need to add your resume.pdf to the public folder.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transform transition-transform hover:scale-105">
              <a href="/resume.pdf" download={resumeFilename}>
                <Download className="mr-2 h-5 w-5" />
                Download Resume (PDF)
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              If the download doesn't start, ensure `public/resume.pdf` exists.
            </p>
          </div>

          <div
            ref={tailorFormRef}
            className={cn(
              "transition-all duration-700 ease-out",
              isTailorFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <ResumeTailorForm />
          </div>
        </div>
      </div>
    </section>
  );
}

    