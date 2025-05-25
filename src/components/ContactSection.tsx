
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import { portfolioOwner } from "@/lib/data";
import { cn } from '@/lib/utils';

export function ContactSection() {
  const [emailHref, setEmailHref] = useState<string>('#');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setEmailHref(`mailto:${portfolioOwner.contactEmail}`);
  }, []);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isClient) {
      e.preventDefault();
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2
          className={cn(
            "section-title",
          )}
        >
          Get In Touch
        </h2>
        <div
          className={cn(
            "group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl max-w-2xl mx-auto",
          )}
        >
          <Card className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">Contact Me</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a
                  href={emailHref}
                  onClick={handleEmailClick}
                  className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors"
                >
                  {portfolioOwner.contactEmail}
                </a>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <Button variant="outline" asChild className="transform transition-transform hover:scale-105">
                  <Link href={portfolioOwner.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" asChild className="transform transition-transform hover:scale-105">
                  <Link href={portfolioOwner.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              </div>
               <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transform transition-transform hover:scale-105">
                <a
                  href={emailHref}
                  onClick={handleEmailClick}
                >
                  <Mail className="mr-2 h-5 w-5" /> Send an Email
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
