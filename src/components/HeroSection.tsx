
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
        "min-h-screen flex flex-col justify-center"
      )}
    >
      <div className="container text-center">
        <h1
          className={cn(
            "text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          <Balancer>{portfolioOwner.name}</Balancer>
        </h1>
        <p
          className={cn(
            "mt-6 max-w-2xl mx-auto text-lg text-foreground sm:text-xl md:text-2xl"
          )}
        >
          <Balancer>{portfolioOwner.title}</Balancer>
        </p>
        <div
          className={cn(
            "mt-8 max-w-3xl mx-auto text-md text-muted-foreground sm:text-lg"
          )}
        >
          <Balancer>
            {Array.isArray(portfolioOwner.bio) ? (
              portfolioOwner.bio.map((line, index) => (
                <span
                  key={index}
                  className={cn(
                    "block"
                  )}
                >
                  {line}
                </span>
              ))
            ) : (
              <span
                className={cn(
                  ""
                )}
              >
                {portfolioOwner.bio}
              </span>
            )}
          </Balancer>
        </div>
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
