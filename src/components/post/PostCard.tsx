import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Heart, Repeat, Send, Smile, MoreHorizontal, Tag, Lock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ShimmerPlaceholder } from '@/components/common/ShimmerPlaceholder';
import { cn } from '@/lib/utils';

export interface Post {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
    username: string;
  };
  content: string;
  imageUrl?: string;
  imageAiHint?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  mood?: string; // e.g., "😊 Happy", "😔 Sad"
  tags?: string[];
  isLocked?: boolean; // For Post Unlocking feature
  liveViewers?: number; // For Live Reactions
}

interface PostCardProps {
  post?: Post;
  isLoading?: boolean;
}

export function PostCard({ post, isLoading = false }: PostCardProps) {
  if (isLoading || !post) {
    return (
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center space-x-3 p-4">
          <ShimmerPlaceholder className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-1">
            <ShimmerPlaceholder height="h-5" width="w-3/4" />
            <ShimmerPlaceholder height="h-4" width="w-1/2" />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <ShimmerPlaceholder height="h-4" width="w-full" />
          <ShimmerPlaceholder height="h-4" width="w-5/6" />
          <ShimmerPlaceholder height="h-48" width="w-full" rounded="rounded-lg" />
        </CardContent>
        <CardFooter className="flex justify-between p-4 border-t">
          <ShimmerPlaceholder height="h-8" width="w-1/4" />
          <ShimmerPlaceholder height="h-8" width="w-1/4" />
          <ShimmerPlaceholder height="h-8" width="w-1/4" />
        </CardFooter>
      </Card>
    );
  }

  // Placeholder for mood-based card tinting
  const moodStyles: React.CSSProperties = post.mood ? {
    borderLeftColor: `hsla(var(--${post.mood === '😊 Happy' ? 'primary' : 'accent' }), 0.5)`, // Example
    borderLeftWidth: '4px'
  } : {};

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" style={moodStyles}>
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.user.avatarUrl} alt={post.user.name} data-ai-hint="user avatar"/>
          <AvatarFallback>{post.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold font-headline leading-tight">{post.user.name}</CardTitle>
          <p className="text-xs text-muted-foreground">@{post.user.username} · {post.timestamp}</p>
        </div>
        {post.mood && (
          <Badge variant="outline" className="text-sm flex items-center gap-1">
            <Smile className="h-4 w-4" /> {post.mood}
          </Badge>
        )}
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-3">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <Image src={post.imageUrl} alt="Post image" layout="fill" objectFit="cover" data-ai-hint={post.imageAiHint}/>
            {post.isLocked && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center frosted-glass">
                <Lock className="h-12 w-12 text-white mb-2" />
                <p className="text-white font-semibold">Content Locked</p>
                <Button variant="secondary" size="sm" className="mt-2">Unlock</Button>
              </div>
            )}
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3 w-3" /> {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 border-t">
        <div className="flex space-x-1 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
            <Heart className="h-5 w-5" />
            <span className="text-xs">{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
            <Repeat className="h-5 w-5" />
            <span className="text-xs">{post.shares}</span>
          </Button>
        </div>
        {post.liveViewers && (
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Eye className="h-4 w-4 text-accent" />
            <span>{post.liveViewers} viewing</span>
            {/* Add emoji burst placeholder here */}
          </div>
        )}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Send className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
