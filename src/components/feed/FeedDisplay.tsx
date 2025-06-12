'use client';

import { useState, useEffect } from 'react';
import { PostCard, type Post } from '@/components/post/PostCard';

const mockPosts: Post[] = [
  {
    id: '1',
    user: { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png?text=AW', username: 'alicew' },
    content: 'Just had a wonderful tea party! 🍵 The Mad Hatter was exceptionally mad today. #WonderlandAdventures #TeaTime',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'fantasy tea party',
    timestamp: '2h ago',
    likes: 156,
    comments: 23,
    shares: 12,
    mood: '😊 Happy',
    tags: ['wonderland', 'teaparty', 'fantasy'],
    liveViewers: 25,
  },
  {
    id: '2',
    user: { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/100x100.png?text=BB', username: 'bob_builder' },
    content: 'Finished building the new community center! Can we fix it? Yes, we can! 🛠️ #BuildingCommunity #HardWorkPaysOff',
    timestamp: '5h ago',
    likes: 289,
    comments: 45,
    shares: 30,
    mood: '🎉 Proud',
    tags: ['construction', 'community', 'achievement'],
    isLocked: true,
  },
  {
    id: '3',
    user: { name: 'Charlie Brown', avatarUrl: 'https://placehold.co/100x100.png?text=CB', username: 'charlie_b' },
    content: 'Good grief. Tried to fly a kite again. 🪁 At least Snoopy had fun. #Peanuts #KiteFlyingFail',
    imageUrl: 'https://placehold.co/600x300.png',
    imageAiHint: 'kite stuck tree',
    timestamp: '1d ago',
    likes: 78,
    comments: 12,
    shares: 5,
    mood: '😔 Sigh',
    tags: ['goodgrief', 'snoopy', 'classic'],
  },
  {
    id: '4',
    user: { name: 'Diana Prince', avatarUrl: 'https://placehold.co/100x100.png?text=DP', username: 'wonder_woman' },
    content: 'Visited Themyscira today. Always good to be home and reconnect with my Amazonian sisters. Feeling empowered! ✨ #Themyscira #WonderWoman #AmazonPower',
    imageUrl: 'https://placehold.co/600x450.png',
    imageAiHint: 'mythical island paradise',
    timestamp: '2d ago',
    likes: 450,
    comments: 55,
    shares: 20,
    mood: '💪 Empowered',
    tags: ['hero', 'mythology', 'strength'],
  },
  {
    id: '5',
    user: { name: 'Eddie Eagle', avatarUrl: 'https://placehold.co/100x100.png?text=EE', username: 'eagle_eye_eddie' },
    content: 'Just spotted a rare Golden Eagle soaring over the mountains. What a majestic sight! 🦅 #BirdWatching #NatureLovers #WildlifePhotography',
    timestamp: '3d ago',
    likes: 120,
    comments: 18,
    shares: 7,
    mood: '🤩 Awestruck',
    tags: ['nature', 'birds', 'mountains'],
    liveViewers: 10,
  },
  {
    id: '6',
    user: { name: 'Fiona Gallagher', avatarUrl: 'https://placehold.co/100x100.png?text=FG', username: 'fiona_g' },
    content: 'Another chaotic day managing the household. Somehow, we always make it work. Family over everything. ❤️ #GallagherLife #FamilyFirst #SouthSide',
    imageUrl: 'https://placehold.co/600x350.png',
    imageAiHint: 'urban family home',
    timestamp: '4d ago',
    likes: 320,
    comments: 67,
    shares: 15,
    mood: '😅 Stressed but Grateful',
    tags: ['family', 'realife', 'hustle'],
    isLocked: false,
  }
];

export function FeedDisplay() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching posts
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <PostCard key={index} isLoading={true} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No posts yet. Be the first to share!</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
