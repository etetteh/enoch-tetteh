'use server';
/**
 * @fileOverview AI-powered tool to generate a resume in Markdown format from the website's content.
 *
 * - generateResumeFromWebsite - A function that generates the resume.
 * - GenerateResumeOutput - The return type for the generateResumeFromWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  portfolioOwner,
  projects,
  experiences,
  education,
  skillCategories,
} from '@/lib/data';

const GenerateResumeOutputSchema = z.object({
  resumeMarkdown: z
    .string()
    .describe('The generated resume content as a Markdown string.'),
});
export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

export async function generateResumeFromWebsite(): Promise<GenerateResumeOutput> {
  // Prepare the data to be sent to the AI
  // Convert skills into a more prompt-friendly format
  const skillsFormatted = skillCategories
    .map(
      (category) =>
        `### ${category.name}\n- ${category.skills.join('\n- ')}`
    )
    .join('\n\n');

  const projectsFormatted = projects
    .map(
      (p) =>
        `### ${p.title}\n${
          p.carouselDescription
        }\n\n**Tech Stack:** ${p.techStack.join(', ')}\n${
          p.githubUrl ? `**GitHub:** ${p.githubUrl}\n` : ''
        }${p.liveUrl ? `**Live Demo:** ${p.liveUrl}\n` : ''}`
    )
    .join('\n---\n');

  const experiencesFormatted = experiences
    .map(
      (exp) =>
        `### ${exp.role} at ${exp.company} (${exp.period})\n${exp.description
          .map((d) => `- ${d}`)
          .join('\n')}`
    )
    .join('\n\n');

  const educationFormatted = education
    .map(
      (edu) =>
        `### ${edu.degree}\n${edu.institution} (${edu.period})\n${
          edu.description ? edu.description.join('\n') : ''
        }`
    )
    .join('\n\n');

  const inputForPrompt = {
    name: portfolioOwner.name,
    title: portfolioOwner.title,
    bio: portfolioOwner.bio,
    contactEmail: portfolioOwner.contactEmail,
    linkedinUrl: portfolioOwner.linkedinUrl,
    githubUrl: portfolioOwner.githubUrl,
    skills: skillsFormatted,
    projects: projectsFormatted,
    experience: experiencesFormatted,
    education: educationFormatted,
  };

  return generateResumeFlow(inputForPrompt);
}

const GenerateResumeInputSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  contactEmail: z.string(),
  linkedinUrl: z.string(),
  githubUrl: z.string(),
  skills: z.string().describe('Formatted skills sections as a string.'),
  projects: z.string().describe('Formatted projects as a string.'),
  experience: z.string().describe('Formatted experiences as a string.'),
  education: z.string().describe('Formatted education as a string.'),
});

const prompt = ai.definePrompt({
  name: 'generateResumeFromWebsitePrompt',
  input: { schema: GenerateResumeInputSchema },
  output: { schema: GenerateResumeOutputSchema },
  prompt: `You are an expert resume writer. Based on the following portfolio information, generate a professional and concise resume in Markdown format.

The resume should include the following sections in a standard professional order:
1.  **Contact Information**: Name, Email, LinkedIn, GitHub.
2.  **Summary/Bio**: Use the provided bio.
3.  **Skills**: Grouped by category.
4.  **Experience**: Chronological or reverse chronological, clearly listing role, company, period, and achievements.
5.  **Projects**: Highlighting key projects, tech stack, and links.
6.  **Education**: Degrees, institutions, periods, and any relevant thesis or coursework.

Ensure the Markdown is well-formatted, easy to read, and uses standard Markdown syntax (headings, lists, bolding for emphasis).

**Portfolio Information:**

## {{name}}
**{{title}}**

**Contact:**
- Email: {{contactEmail}}
- LinkedIn: {{linkedinUrl}}
- GitHub: {{githubUrl}}

**Summary:**
{{bio}}

---

## Skills
{{skills}}

---

## Experience
{{experience}}

---

## Projects
{{projects}}

---

## Education
{{education}}

---

**Output the entire resume as a single Markdown string under the 'resumeMarkdown' field.**
`,
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
