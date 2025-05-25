import { config } from 'dotenv';
config();

// import '@/ai/flows/resume-tailor.ts'; // Removed
import '@/ai/flows/portfolio-chatbot.ts';
import '@/ai/flows/suggested-queries-flow.ts';
// import '@/ai/flows/generate-resume-flow.ts'; // Reverted: Static PDF download
