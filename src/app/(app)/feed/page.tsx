'use client';

import { StoriesRail } from '@/components/story/StoriesRail';
import { FeedDisplay } from '@/components/feed/FeedDisplay';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import Link from 'next/link';

export default function FeedRoutePage() {
  return (
    <div className="w-full">
      <div className="md:hidden sticky top-0 bg-background/80 backdrop-blur-md z-10 -mx-4 px-4 pt-2 pb-1 mb-2">
         <Link href="/create-post">
          <Button className="w-full">
            <PenSquare className="mr-2 h-5 w-5" /> Create Post
          </Button>
        </Link>
      </div>
      <StoriesRail />
      <div className="mt-6">
        <h2 className="text-2xl font-bold font-headline mb-4 uppercase tracking-wider">Latest Vibes</h2>
        <FeedDisplay />
      </div>
    </div>
  );
}
