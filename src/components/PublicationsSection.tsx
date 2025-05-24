
'use client';

import { useRef } from 'react';
import type { Publication } from '@/types/portfolio';
import { publications } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, FileText as DefaultPubIcon } from 'lucide-react';
import Link from 'next/link';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

const PublicationCard = ({ pub }: { pub: Publication }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useFadeInOnScroll(cardRef, { threshold: 0.1 });
  const IconToUse = pub.icon || DefaultPubIcon;

  return (
    <div
      ref={cardRef}
      className={cn(
        "group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <Card className="bg-card rounded-lg h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <CardTitle className="text-xl font-semibold text-primary">{pub.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-2">
                Authors: <span className="italic">{pub.authors}</span>
              </CardDescription>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Conference: <span className="font-medium">{pub.conference}</span>
              </CardDescription>
            </div>
            <IconToUse className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
        {(pub.githubUrl || pub.paperUrl) && (
          <CardFooter className="mt-auto pt-4 border-t flex flex-wrap gap-2 justify-start">
            {pub.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={pub.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            )}
            {pub.paperUrl && (
              <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Read Paper
                </Link>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export function PublicationsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleVisible = useFadeInOnScroll(titleRef, { threshold: 0.1 });

  if (!publications || publications.length === 0) {
    return null; // Don't render the section if there are no publications
  }

  return (
    <section id="publications">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title",
            "transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Publications
        </h2>
        <div className="space-y-8">
          {publications.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
}
