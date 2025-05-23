import { experiences } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-secondary">
      <div className="container mx-auto">
        <h2 className="section-title">Professional Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card key={exp.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-primary">{exp.role}</CardTitle>
                    <CardDescription className="text-md text-muted-foreground">{exp.company} | {exp.period}</CardDescription>
                  </div>
                  <exp.icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                  {exp.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
