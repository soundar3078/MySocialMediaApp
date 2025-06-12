'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Image as ImageIcon, Video, Smile, Tag, CalendarClock, Globe, Send, Mic, Type, Sparkles, Languages } from "lucide-react";
import { suggestHashtags, type SuggestHashtagsInput } from '@/ai/flows/ai-auto-tagging';
import { suggestMood, type MoodBasedPostingInput } from '@/ai/flows/mood-based-posting';
import { translateVoicePost, type TranslateVoicePostInput } from '@/ai/flows/ai-voice-post-translation'; // Assuming path
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function CreatePostPage() {
  const [postContent, setPostContent] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const { toast } = useToast();

  const handleSuggestTags = async () => {
    if (!postContent.trim()) {
      toast({ title: "Content needed", description: "Please write something before suggesting tags.", variant: "destructive" });
      return;
    }
    try {
      const input: SuggestHashtagsInput = { postContent };
      const result = await suggestHashtags(input);
      setTags(prev => [...new Set([...prev, ...result.suggestedHashtags])]);
      toast({ title: "Tags Suggested!", description: "AI has suggested some relevant tags." });
    } catch (error) {
      console.error("Error suggesting tags:", error);
      toast({ title: "Error", description: "Could not suggest tags at this time.", variant: "destructive" });
    }
  };

  const handleSuggestMood = async () => {
    if (!postContent.trim()) {
      toast({ title: "Content needed", description: "Please write something before suggesting a mood.", variant: "destructive" });
      return;
    }
    try {
      const input: MoodBasedPostingInput = { postText: postContent };
      const result = await suggestMood(input);
      setMood(result.suggestedMood);
      toast({ title: "Mood Suggested!", description: `AI suggested: ${result.suggestedMood}. ${result.reason}` });
    } catch (error) {
      console.error("Error suggesting mood:", error);
      toast({ title: "Error", description: "Could not suggest mood at this time.", variant: "destructive" });
    }
  };
  
  const handlePostSubmit = () => {
    if (!postContent.trim()) {
      toast({ title: "Cannot Post Empty Chirp", description: "Please write something to post.", variant: "destructive" });
      return;
    }
    // Actual post submission logic here
    console.log({ postContent, mood, tags, isScheduling, scheduledTime });
    toast({ title: "Chirp Sent!", description: "Your thoughts are now out in the world (or scheduled)!" });
    setPostContent('');
    setMood('');
    setTags([]);
    setIsScheduling(false);
    setScheduledTime('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/100x100.png?text=CS" alt="User Avatar" data-ai-hint="user avatar" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold font-headline">ChirpSync User</p>
            <Button variant="outline" size="sm" className="text-xs h-6 mt-0.5">
              <Globe className="mr-1 h-3 w-3" /> Public
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <Textarea
          placeholder="What's on your mind, @ChirpSync User?"
          className="text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[120px] p-0 resize-none shadow-none"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows={5}
        />
        
        {mood && (
          <div className="flex items-center gap-2">
            <Label>Current Mood:</Label>
            <Badge variant="secondary" className="text-sm py-1 px-2">{mood}</Badge>
            <Button variant="ghost" size="xs" onClick={() => setMood('')}>Clear</Button>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 items-center">
            <Label className="mr-1">Tags:</Label>
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="py-0.5 px-1.5">
                {tag}
                <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-1 text-muted-foreground hover:text-destructive">&times;</button>
              </Badge>
            ))}
          </div>
        )}

        {isScheduling && (
          <div className="space-y-2 rounded-md border p-3 bg-muted/50">
            <Label htmlFor="scheduleTime" className="text-sm font-medium">Schedule Post</Label>
            <Input 
              id="scheduleTime" 
              type="datetime-local" 
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-3 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2">
        <div className="flex items-center space-x-1 flex-wrap gap-1">
          {[
            { icon: ImageIcon, label: "Photo/Video", action: () => console.log("Upload media") },
            { icon: Mic, label: "Voice Post", action: () => console.log("Voice post") },
            { icon: Sparkles, label: "AI Mood", action: handleSuggestMood },
            { icon: Tag, label: "AI Tags", action: handleSuggestTags },
          ].map(item => (
            <Button key={item.label} variant="ghost" size="icon" title={item.label} onClick={item.action} className="text-muted-foreground hover:text-primary">
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
           <Button variant="ghost" size="icon" title="Schedule" onClick={() => setIsScheduling(!isScheduling)} className={cn("text-muted-foreground hover:text-primary", isScheduling && "text-accent bg-accent/10")}>
            <CalendarClock className="h-5 w-5" />
          </Button>
        </div>
        <Button 
            onClick={handlePostSubmit} 
            disabled={!postContent.trim() && !isScheduling}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Send className="mr-2 h-4 w-4" /> {isScheduling && scheduledTime ? 'Schedule' : 'Chirp'}
        </Button>
      </CardFooter>
    </Card>
  );
}
