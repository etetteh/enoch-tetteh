'use server';

/**
 * @fileOverview AI chatbot for searching portfolio information.
 *
 * - portfolioChatbot - A function that handles the chatbot interactions.
 * - PortfolioChatbotInput - The input type for the portfolioChatbot function.
 * - PortfolioChatbotOutput - The return type for the portfolioChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioChatbotInputSchema = z.object({
  query: z.string().describe('The user query to search for in the portfolio.'),
  portfolioContent: z
    .string()
    .describe('The content of the portfolio to search through.'),
});
export type PortfolioChatbotInput = z.infer<typeof PortfolioChatbotInputSchema>;

const PortfolioChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query based on the portfolio content.'),
});
export type PortfolioChatbotOutput = z.infer<typeof PortfolioChatbotOutputSchema>;

export async function portfolioChatbot(input: PortfolioChatbotInput): Promise<PortfolioChatbotOutput> {
  return portfolioChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioChatbotPrompt',
  input: {schema: PortfolioChatbotInputSchema},
  output: {schema: PortfolioChatbotOutputSchema},
  prompt: `You are an AI chatbot designed to answer questions about a portfolio.

  You will be given a query from the user and the content of the portfolio.
  Your goal is to answer the query based on the information in the portfolio content.
  If the answer is not found in the portfolio content, say that you cannot find the answer.

  User Query: {{{query}}}
  Portfolio Content: {{{portfolioContent}}}
  `, safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_ONLY_HIGH',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_LOW_AND_ABOVE',
    },
  ],
});

const portfolioChatbotFlow = ai.defineFlow(
  {
    name: 'portfolioChatbotFlow',
    inputSchema: PortfolioChatbotInputSchema,
    outputSchema: PortfolioChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
