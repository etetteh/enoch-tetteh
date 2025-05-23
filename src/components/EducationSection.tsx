import { education } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function EducationSection() {
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <div 
              key={edu.id} 
              className="group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <Card className="bg-card rounded-lg">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
