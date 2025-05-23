import { Button } from "@/components/ui/button";
import Link from "next/link";
import { portfolioOwner } from "@/lib/data";
import Balancer from 'react-wrap-balancer';


export function HeroSection() {
  return (
    <section id="hero" className="bg-gradient-to-b from-background to-secondary py-20 md:py-32">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          <Balancer>{portfolioOwner.name}</Balancer>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground sm:text-xl md:text-2xl">
          <Balancer>{portfolioOwner.title}</Balancer>
        </p>
        <p className="mt-8 max-w-3xl mx-auto text-md text-muted-foreground sm:text-lg">
          <Balancer>{portfolioOwner.bio}</Balancer>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
