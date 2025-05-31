
'use server';
/**
 * @fileOverview AI-powered tool to generate suggested queries based on portfolio content.
 *
 * - suggestedQueriesFlow - A function that generates suggested queries.
 * - SuggestedQueriesInput - The input type for the suggestedQueriesFlow function.
 * - SuggestedQueriesOutput - The return type for the suggestedQueriesFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestedQueriesInputSchema = z.object({
  portfolioContent: z
    .string()
    .describe('The content of the portfolio to generate suggested queries from.'),
});
export type SuggestedQueriesInput = z.infer<typeof SuggestedQueriesInputSchema>;

const SuggestedQueriesOutputSchema = z.object({
  queries: z
    .array(z.string())
    .describe('An array of 3-5 concise suggested query strings.'),
});
export type SuggestedQueriesOutput = z.infer<typeof SuggestedQueriesOutputSchema>;

const generateQueriesPrompt = ai.definePrompt({
  name: 'suggestedQueriesPrompt',
  input: {schema: SuggestedQueriesInputSchema},
  output: {schema: SuggestedQueriesOutputSchema},
  prompt: `You are an AI assistant tasked with generating 3 to 5 engaging and relevant suggested questions a user might ask a chatbot about Enoch Tetteh's professional portfolio.
The portfolio content is provided below.
Based *only* on this content, generate diverse questions that highlight key aspects like Enoch's skills, projects, experience, or education.
Ensure the questions are **very concise** (ideally 3-6 words) and phrased as if a user is asking them.

Portfolio Content:
{{{portfolioContent}}}

Output the questions as a JSON array of strings. For example:
{
  "queries": [
    "Enoch's main skills?",
    "Latest project details?",
    "Enoch's Google Cloud experience?"
  ]
}`,
  config: { // Correctly nested safetySettings
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    ],
  }
});

const _internalSuggestedQueriesFlow = ai.defineFlow(
  {
    name: '_internalSuggestedQueriesFlow', // internal name
    inputSchema: SuggestedQueriesInputSchema,
    outputSchema: SuggestedQueriesOutputSchema,
  },
  async (flowInput) => {
    const {output} = await generateQueriesPrompt(flowInput);
    if (!output || !output.queries || output.queries.length === 0) {
      // Fallback if AI fails to generate queries or returns an empty/invalid structure
      return { queries: ["Enoch's key skills?", "Recent project?", "Enoch's experience?"] };
    }
    // Ensure we always return an object matching SuggestedQueriesOutputSchema, even if AI provides extra fields
    return { queries: output.queries };
  }
);

export async function suggestedQueriesFlow(input: SuggestedQueriesInput): Promise<SuggestedQueriesOutput> {
  return _internalSuggestedQueriesFlow(input);
}

    
