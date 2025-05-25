
'use client';

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from '@/lib/utils';
import { portfolioOwner } from '@/lib/data';

export function ResumeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const downloadBlockRef = useRef<HTMLDivElement>(null);

  return (
    <section id="resume">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
          )}
        >
          My Resume
        </h2>
        <div className="flex justify-center">
          <div
            ref={downloadBlockRef}
            className={cn(
              "space-y-6 text-center max-w-md",
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
