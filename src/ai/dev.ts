import { config } from 'dotenv';
config();

import '@/ai/flows/ai-auto-tagging.ts';
import '@/ai/flows/mood-based-posting.ts';
import '@/ai/flows/ai-voice-post-translation.ts';
import '@/ai/flows/goal-tracker-summaries.ts';