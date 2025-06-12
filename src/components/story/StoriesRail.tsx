'use client';

import { StoryBubble } from './StoryBubble';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Mock data for stories
const mockStories = [
  { id: '1', username: 'user123', imageUrl: 'https://placehold.co/150x150.png', altText: 'User 123 story', isActive: true, dataAiHint: 'profile story' },
  { id: '2', username: 'creativa', imageUrl: 'https://placehold.co/150x150.png', altText: 'Creativa story', isActive: true, dataAiHint: 'artistic profile' },
  { id: '3', username: 'journeyer', imageUrl: 'https://placehold.co/150x150.png', altText: 'Journeyer story', dataAiHint: 'travel adventure' },
  { id: '4', username: 'techwiz', imageUrl: 'https://placehold.co/150x150.png', altText: 'Techwiz story', isActive: true, dataAiHint: 'gadget tech' },
  { id: '5', username: 'foodiegal', imageUrl: 'https://placehold.co/150x150.png', altText: 'Foodiegal story', dataAiHint: 'delicious food' },
  { id: '6', username: 'musiclover', imageUrl: 'https://placehold.co/150x150.png', altText: 'Musiclover story', dataAiHint: 'concert festival' },
  { id: '7', username: 'fitfam', imageUrl: 'https://placehold.co/150x150.png', altText: 'Fitfam story', isActive: true, dataAiHint: 'gym workout' },
  { id: '8', username: 'bookworm', imageUrl: 'https://placehold.co/150x150.png', altText: 'Bookworm story', dataAiHint: 'library books' },
];

export function StoriesRail() {
  const handleStoryClick = (storyId: string) => {
    // Navigate to story view or open modal
    console.log(`Clicked story ${storyId}`);
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md py-4">
      <div className="flex space-x-4">
        {mockStories.map((story) => (
          <StoryBubble
            key={story.id}
            username={story.username}
            imageUrl={story.imageUrl}
            altText={story.altText}
            isActive={story.isActive}
            onClick={() => handleStoryClick(story.id)}
            dataAiHint={story.dataAiHint}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
