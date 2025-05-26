
'use client';

import { certifications } from '@/lib/data';
import type { Certification } from '@/types/portfolio';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CertificationCard = ({ cert }: { cert: Certification }) => {
  const IconToUse = cert.icon || Award; // Default to Award if no specific icon

  return (
    <div
      className={cn(
        "rounded-lg p-0.5 bg-gradient-to-br from-primary via-accent to-accent shadow-lg",
      )}
    >
      <Card className="bg-card rounded-xl h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <CardTitle className="text-xl font-semibold text-primary">{cert.title}</CardTitle>
              <CardDescription className="text-sm sm:text-md text-muted-foreground mt-1">
                Issuer: <span className="font-medium">{cert.issuer}</span>
              </CardDescription>
              {cert.dateObtained && (
                <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Date: {cert.dateObtained}
                </CardDescription>
              )}
            </div>
            <IconToUse className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
        <CardFooter className="mt-auto pt-4 border-t">
          <Button size="sm" asChild className="text-primary-foreground bg-gradient-to-br from-primary via-accent to-accent hover:brightness-90 w-full sm:w-auto">
            <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> View Credential
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export function CertificationsSection() {
  if (!certifications || certifications.length === 0) {
    return null; // Don't render the section if there are no certifications
  }

  return (
    <section id="certifications">
      <div className="container">
        <h2
          className={cn(
            "section-title",
          )}
        >
          Certifications & Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
