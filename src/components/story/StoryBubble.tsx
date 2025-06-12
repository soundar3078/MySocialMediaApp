'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface StoryBubbleProps {
  imageUrl: string;
  username: string;
  altText: string;
  isActive?: boolean;
  onClick?: () => void;
  dataAiHint?: string;
}

export function StoryBubble({
  imageUrl,
  username,
  altText,
  isActive = false,
  onClick,
  dataAiHint
}: StoryBubbleProps) {
  return (
    <div
      className="flex flex-col items-center space-y-1 cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className={cn("relative p-0.5 rounded-full", isActive && "story-ring-active")}>
        <Avatar className="h-16 w-16 border-2 border-background group-hover:scale-105 transition-transform duration-200">
          <AvatarImage src={imageUrl} alt={altText} data-ai-hint={dataAiHint} />
          <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
        {username}
      </span>
    </div>
  );
}
