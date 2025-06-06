
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import { portfolioOwner } from "@/lib/data";
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

export function ContactSection() {
  const [emailHref, setEmailHref] = useState<string>('#');
  const [isClient, setIsClient] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });
  const isCardWrapperVisible = useFadeInOnScroll(cardWrapperRef, { threshold: 0.1 });

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
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Get In Touch
        </h2>
        <div
          ref={cardWrapperRef}
          className={cn(
            "rounded-xl p-0.5 bg-gradient-to-br from-primary via-primary to-accent shadow-lg max-w-2xl mx-auto",
            "transition-all duration-700 ease-out delay-200",
            isCardWrapperVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <Card className="bg-card rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">Contact Me</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                I&apos;m driven to build impactful AI solutions and explore innovative ideas. Whether it&apos;s a challenging role, a collaborative project, or a groundbreaking venture, I&apos;m ready to connect!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
               <Button asChild size="lg" className="w-full text-primary-foreground bg-gradient-to-br from-primary via-primary to-accent hover:brightness-90 transform transition-transform hover:scale-105">
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

