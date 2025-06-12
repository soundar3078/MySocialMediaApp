'use server';

/**
 * @fileOverview Mood-Based Posting AI agent.
 *
 * - suggestMood - A function that suggests a mood based on post text.
 * - MoodBasedPostingInput - The input type for the suggestMood function.
 * - MoodBasedPostingOutput - The return type for the suggestMood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodBasedPostingInputSchema = z.object({
  postText: z
    .string()
    .describe('The text content of the post for which a mood is suggested.'),
});
export type MoodBasedPostingInput = z.infer<typeof MoodBasedPostingInputSchema>;

const MoodBasedPostingOutputSchema = z.object({
  suggestedMood: z
    .string()
    .describe(
      'The suggested mood that best matches the sentiment of the post text.'
    ),
  reason: z
    .string()
    .describe('The reason the mood was suggested based on the post text.'),
});
export type MoodBasedPostingOutput = z.infer<typeof MoodBasedPostingOutputSchema>;

export async function suggestMood(input: MoodBasedPostingInput): Promise<MoodBasedPostingOutput> {
  return moodBasedPostingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodBasedPostingPrompt',
  input: {schema: MoodBasedPostingInputSchema},
  output: {schema: MoodBasedPostingOutputSchema},
  prompt: `You are an AI assistant that analyzes the text of social media posts and suggests a mood that best matches the post's sentiment.

  Given the following post text, suggest a mood and explain your reasoning.

  Post Text: {{{postText}}}

  Format your response as a JSON object with "suggestedMood" and "reason" fields.
  `, // Ensure the prompt requests a JSON output
});

const moodBasedPostingFlow = ai.defineFlow(
  {
    name: 'moodBasedPostingFlow',
    inputSchema: MoodBasedPostingInputSchema,
    outputSchema: MoodBasedPostingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
