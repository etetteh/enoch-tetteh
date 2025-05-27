
'use client';

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from '@/lib/utils';
import { portfolioOwner } from '@/lib/data';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';


export function ResumeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const downloadBlockRef = useRef<HTMLDivElement>(null);

  const isTitleVisible = useFadeInOnScroll(titleRef);
  const isDownloadBlockVisible = useFadeInOnScroll(downloadBlockRef, { delay: 200 });

  return (
    <section id="resume">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-1000 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          My Resume
        </h2>
        <div className="flex justify-center">
          <div
            ref={downloadBlockRef}
            className={cn(
              "space-y-6 text-center max-w-md",
              "transition-all duration-1000 ease-out",
              isDownloadBlockVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <h3 className="text-2xl font-semibold text-primary">Download My Resume</h3>
            <p className="text-muted-foreground">
              Get a copy of my full resume to learn more about my qualifications and experience.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transform transition-transform hover:scale-105"
            >
              <a href="/resume.pdf" download={`${portfolioOwner.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_Resume.pdf`}>
                <Download className="mr-2 h-5 w-5" />
                Download Resume (PDF)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
