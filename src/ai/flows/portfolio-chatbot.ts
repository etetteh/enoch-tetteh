
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
  prompt: `You are a friendly and helpful AI chatbot designed to assist users by answering questions specifically about Enoch Tetteh's professional portfolio. Your persona is professional, yet approachable and eager to help.

  You will be given a query from the user and the content of Enoch Tetteh's portfolio.
  Your goal is to answer the query based *only* on the information found within the provided portfolio content.

  - If the user asks a question that can be answered from the portfolio, provide a concise and relevant answer.
  - If the user provides a simple greeting (e.g., "Hi", "Hello"), respond with a warm greeting and offer your assistance, for example: "Hello there! I'm Enoch's portfolio assistant. How can I help you learn more about Enoch's projects, skills, or experience today?"
  - If the answer to a specific question is not found in the portfolio content, politely state that you don't have that specific information and suggest what kind of information you *can* provide. For example: "I couldn't find specific details about that in Enoch's portfolio. I can help with questions about Enoch's projects, skills, experience, and education. Is there anything specific in those areas you'd like to know?"
  - Do not invent information or answer questions outside the scope of the portfolio content.

  User Query: {{{query}}}
  Portfolio Content: {{{portfolioContent}}}
  `,
  config: { // Corrected: safetySettings nested under config
    safetySettings: [
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
  }
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

    
