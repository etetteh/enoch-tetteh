
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { portfolioOwner } from "@/lib/data";
import Balancer from 'react-wrap-balancer';
import { cn } from '@/lib/utils';

export function HeroSection() {
  return (
    <section
      id="hero"
      className={cn(
        "min-h-screen flex flex-col justify-center py-12 md:py-20"
      )}
    >
      <div className="container text-center">
        {/* Main Heading */}
        <h1
          className={cn(
            "text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          <Balancer>{portfolioOwner.heroMainHeading}</Balancer>
        </h1>

        {/* Sub Heading */}
        <p
          className={cn(
            "mt-6 max-w-3xl mx-auto text-lg text-foreground sm:text-xl md:text-2xl"
          )}
        >
          <Balancer>{portfolioOwner.heroSubHeading}</Balancer>
        </p>

        {/* Hero Tagline */}
        <p
          className={cn(
            "mt-8 max-w-3xl mx-auto text-md font-semibold text-foreground sm:text-lg md:text-xl"
          )}
        >
          <Balancer>{portfolioOwner.heroTagline}</Balancer>
        </p>

        {/* Detailed Bio Paragraphs */}
        <div
          className={cn(
            "mt-6 max-w-3xl mx-auto text-base text-muted-foreground sm:text-lg space-y-3"
          )}
        >
          <Balancer>
            {portfolioOwner.heroDetailedBio.map((line, index) => (
              <span
                key={index}
                className={cn(
                  "block"
                )}
              >
                {line}
              </span>
            ))}
          </Balancer>
        </div>
        
        {/* Final Call To Action */}
        <p
          className={cn(
            "mt-6 max-w-3xl mx-auto text-md font-medium text-foreground sm:text-lg"
          )}
        >
          <Balancer>{portfolioOwner.heroFinalCallToAction}</Balancer>
        </p>

        {/* Buttons */}
        <div
          className={cn(
            "mt-10 flex flex-col sm:flex-row gap-4 justify-center"
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

