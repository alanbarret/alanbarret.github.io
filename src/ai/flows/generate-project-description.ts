'use server';

/**
 * @fileOverview An AI agent for generating compelling project descriptions with tailored tones.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDetails: z.string().describe('Detailed information about the project, including technologies used and key features.'),
  desiredTone: z.string().describe('The desired tone for the project description (e.g., professional, casual, technical).'),
  pastExperience: z.string().describe('Summary of past experiences to use as context.'),
});
export type GenerateProjectDescriptionInput = z.infer<typeof GenerateProjectDescriptionInputSchema>;

const GenerateProjectDescriptionOutputSchema = z.object({
  projectDescription: z.string().describe('A compelling project description with the tailored tone.'),
});
export type GenerateProjectDescriptionOutput = z.infer<typeof GenerateProjectDescriptionOutputSchema>;

export async function generateProjectDescription(input: GenerateProjectDescriptionInput): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling project descriptions for software developers.

  Given the following information about a project, generate a project description with the specified tone. Leverage the provided past experience to inform the description, and incorporate information from the public domain as necessary to enhance the description.

  Project Name: {{{projectName}}}
  Project Details: {{{projectDetails}}}
  Desired Tone: {{{desiredTone}}}
  Past Experience: {{{pastExperience}}}

  Generate a detailed and engaging project description that highlights the key features and technologies used, while maintaining the desired tone.  The project description must be suitable for display on a professional developer portfolio.
  `,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
