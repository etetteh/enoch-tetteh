import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { portfolioOwner } from "@/lib/data";

export function ContactSection() {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl max-w-2xl mx-auto">
          <Card className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">Contact Me</CardTitle>
              <CardDescription>
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a href={`mailto:${portfolioOwner.contactEmail}`} className="text-foreground hover:text-primary transition-colors">
                  {portfolioOwner.contactEmail}
                </a>
              </div>
              {/* Add other contact details if needed, e.g., phone, location */}
              {/* 
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-foreground">San Francisco, CA</span>
              </div>
              */}
              <div className="flex gap-4 pt-4 border-t">
                <Button variant="outline" asChild>
                  <Link href={portfolioOwner.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={portfolioOwner.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              </div>
               <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={`mailto:${portfolioOwner.contactEmail}`}>
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
