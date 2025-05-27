
'use client';

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { portfolioOwner } from "@/lib/data";
import Balancer from 'react-wrap-balancer';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      className={cn(
        "min-h-screen flex flex-col justify-center"
      )}
    >
      <div className="container text-center">
        <h1
          ref={titleRef}
          className={cn(
            "text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl",
            "animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300"
          )}
        >
          <Balancer>{portfolioOwner.name}</Balancer>
        </h1>
        <p
          ref={subtitleRef}
          className={cn(
            "mt-6 max-w-2xl mx-auto text-lg text-foreground sm:text-xl md:text-2xl",
            "animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500"
          )}
        >
          <Balancer>{portfolioOwner.title}</Balancer>
        </p>
        <p
          ref={bioRef}
          className={cn(
            "mt-8 max-w-3xl mx-auto text-md text-muted-foreground sm:text-lg",
            "animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700"
          )}
        >
          <Balancer>{portfolioOwner.bio}</Balancer>
        </p>
        <div
          ref={buttonsRef}
          className={cn(
            "mt-10 flex flex-col sm:flex-row gap-4 justify-center",
            "animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-900"
          )}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform transition-transform hover:scale-105">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10 shadow-lg transform transition-transform hover:scale-105">
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
