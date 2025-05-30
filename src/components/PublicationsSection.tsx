'use client';

import type { Publication } from '@/types/portfolio';
import { publications } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

const PublicationCard = ({ pub, pubIndex }: { pub: Publication, pubIndex: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl p-0.5 bg-gradient-to-br from-primary via-primary to-accent shadow-lg",
        "opacity-100 scale-100"
      )}
    >
      <Card className="bg-card rounded-xl h-full flex flex-col"> {/* Changed from rounded-lg */}
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <CardTitle className="text-lg sm:text-xl font-semibold text-primary">{pub.title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-2">
                Authors: <span className="italic">{pub.authors}</span>
              </CardDescription>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                Conference: <span className="font-medium">{pub.conference}</span>
              </CardDescription>
            </div>
            <pub.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
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
              <Button size="sm" asChild className="text-primary-foreground bg-gradient-to-br from-primary via-primary to-accent hover:brightness-90">
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

  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section id="publications">
      <div className="container">
        <h2
          ref={titleRef}
          className={cn(
            "section-title opacity-100 translate-y-0"
          )}
        >
          Publications
        </h2>
        <div className="space-y-8">
          {publications.map((pub, index) => (
            <PublicationCard key={pub.id} pub={pub} pubIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
