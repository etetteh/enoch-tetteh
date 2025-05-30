
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
        "relative min-h-screen flex flex-col justify-center py-12 md:py-20 overflow-hidden" // Added relative and overflow-hidden
      )}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="particle"
          style={{
            width: '150px',
            height: '150px',
            top: '10%',
            left: '15%',
            animationDuration: '25s',
            animationDelay: '0s',
            backgroundColor: 'hsl(var(--primary))',
          }}
        />
        <div
          className="particle"
          style={{
            width: '200px',
            height: '200px',
            top: '60%',
            left: '70%',
            animationDuration: '30s',
            animationDelay: '-5s',
            backgroundColor: 'hsl(var(--accent))',
          }}
        />
        <div
          className="particle"
          style={{
            width: '100px',
            height: '100px',
            top: '30%',
            left: '40%',
            animationDuration: '20s',
            animationDelay: '-10s',
            backgroundColor: 'hsl(var(--primary))',
          }}
        />
        <div
          className="particle"
          style={{
            width: '120px',
            height: '120px',
            bottom: '5%',
            left: '5%',
            animationDuration: '28s',
            animationDelay: '-15s',
            backgroundColor: 'hsl(var(--accent))',
          }}
        />
        <div
          className="particle"
          style={{
            width: '80px',
            height: '80px',
            top: '50%',
            left: '50%',
            animationDuration: '22s',
            animationDelay: '-3s',
            backgroundColor: 'hsl(var(--primary))',
          }}
        />
      </div>

      <div className="container relative z-0 text-center"> {/* Ensured content is above background */}
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
            "mt-6 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground space-y-3"
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
