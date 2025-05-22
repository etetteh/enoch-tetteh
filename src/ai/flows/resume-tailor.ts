// 'use server';
/**
 * @fileOverview AI-powered tool that reviews uploaded resumes/job descriptions and provides tailored suggestions on portfolio content to match the specific role requirements.
 *
 * - resumeTailor - A function that handles the resume tailoring process.
 * - ResumeTailorInput - The input type for the resumeTailor function.
 * - ResumeTailorOutput - The return type for the resumeTailor function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeTailorInputSchema = z.object({
  resume: z
    .string()
    .describe("The user's resume, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  jobDescription: z.string().describe('The job description to tailor the resume to.'),
});
export type ResumeTailorInput = z.infer<typeof ResumeTailorInputSchema>;

const ResumeTailorOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Tailored suggestions on how to modify the portfolio to better match the job requirements.'),
});
export type ResumeTailorOutput = z.infer<typeof ResumeTailorOutputSchema>;

export async function resumeTailor(input: ResumeTailorInput): Promise<ResumeTailorOutput> {
  return resumeTailorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeTailorPrompt',
  input: {schema: ResumeTailorInputSchema},
  output: {schema: ResumeTailorOutputSchema},
  prompt: `You are an expert career coach specializing in resume tailoring. Review the user's resume and the job description, and provide tailored suggestions on how to modify the portfolio to better match the job requirements.\n\nResume: {{media url=resume}}\n\nJob Description: {{{jobDescription}}}\n\nSuggestions: `,
});

const resumeTailorFlow = ai.defineFlow(
  {
    name: 'resumeTailorFlow',
    inputSchema: ResumeTailorInputSchema,
    outputSchema: ResumeTailorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
