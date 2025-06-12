'use server';
/**
 * @fileOverview Translates transcribed voice post text into multiple languages.
 *
 * - translateVoicePost - A function that translates voice post text.
 * - TranslateVoicePostInput - The input type for the translateVoicePost function.
 * - TranslateVoicePostOutput - The return type for the translateVoicePost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateVoicePostInputSchema = z.object({
  text: z.string().describe('The transcribed text from the voice post.'),
  targetLanguages: z
    .array(z.string())
    .describe('An array of language codes to translate the text into.'),
});
export type TranslateVoicePostInput = z.infer<typeof TranslateVoicePostInputSchema>;

const TranslateVoicePostOutputSchema = z.object({
  translations: z.record(z.string()).describe(
    'A map of language codes to translated text.  For example: {es: "Hola mundo", fr: "Bonjour le monde"}.'
  ),
});
export type TranslateVoicePostOutput = z.infer<typeof TranslateVoicePostOutputSchema>;

export async function translateVoicePost(input: TranslateVoicePostInput): Promise<TranslateVoicePostOutput> {
  return translateVoicePostFlow(input);
}

const translationPrompt = ai.definePrompt({
  name: 'translationPrompt',
  input: {schema: TranslateVoicePostInputSchema},
  output: {schema: TranslateVoicePostOutputSchema},
  prompt: `You are a multilingual translation expert. Translate the given text into the following languages: {{{targetLanguages}}}.

  Text to translate: {{{text}}}

  Return a JSON object mapping the language code to the translated text.`,
});

const translateVoicePostFlow = ai.defineFlow(
  {
    name: 'translateVoicePostFlow',
    inputSchema: TranslateVoicePostInputSchema,
    outputSchema: TranslateVoicePostOutputSchema,
  },
  async input => {
    const {output} = await translationPrompt(input);
    return output!;
  }
);
