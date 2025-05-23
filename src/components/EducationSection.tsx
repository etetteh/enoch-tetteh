import { education } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function EducationSection() {
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <Card key={edu.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                 <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-semibold text-primary">{edu.degree}</CardTitle>
                      <CardDescription className="text-md text-muted-foreground">{edu.institution} | {edu.period}</CardDescription>
                    </div>
                    <edu.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                  </div>
              </CardHeader>
              {edu.description && (
                <CardContent>
                  <p className="text-sm text-foreground">{edu.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
