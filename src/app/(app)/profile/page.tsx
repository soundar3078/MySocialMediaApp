import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Edit3, Image as ImageIcon, Bookmark, ShieldCheck, Sun, Moon } from "lucide-react";
import { PostCard, type Post } from "@/components/post/PostCard";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const mockUserProfile = {
  name: "Vibe Connect User",
  username: "vibeconnect_dev",
  avatarUrl: "https://placehold.co/200x200.png?text=VC",
  coverImageUrl: "https://placehold.co/1200x400.png",
  bio: "Building the future of social connection. Connect your vibes with Vibe Connect! 🚀 #NextGenSocial #DevLife",
  followers: 1234,
  following: 567,
  mood: "💡 Inspired",
  posts: [
     {
      id: 'profile_post_1',
      user: { name: 'Vibe Connect User', avatarUrl: 'https://placehold.co/100x100.png?text=VC', username: 'vibeconnect_dev' },
      content: 'Excited to share some new features coming soon to Vibe Connect! Stay tuned. #ProductUpdate',
      timestamp: '1d ago',
      likes: 102,
      comments: 15,
      shares: 8,
      mood: '💡 Inspired',
      tags: ['update', 'feature'],
    },
  ] as Post[],
  goals: [
    { id: 'goal1', title: "Run 5km daily", progress: 60, summary: "Making good strides this week!" },
    { id: 'goal2', title: "Read 10 books this quarter", progress: 20, summary: "Just started a new novel." }
  ],
  archivedStories: [
    { id: 'story1', imageUrl: 'https://placehold.co/300x500.png', caption: 'Throwback to last summer!' },
    { id: 'story2', imageUrl: 'https://placehold.co/300x500.png', caption: 'Coding late night' },
  ]
};

export default function ProfilePage() {
  const user = mockUserProfile;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-48 md:h-64 bg-muted">
          {user.coverImageUrl && (
            <img src={user.coverImageUrl} alt={`${user.name}'s cover image`} className="w-full h-full object-cover" data-ai-hint="profile landscape" />
          )}
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="icon" className="rounded-full">
              <Edit3 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="p-6 relative">
          <Avatar className="-mt-16 md:-mt-20 h-24 w-24 md:h-32 md:w-32 border-4 border-background rounded-full shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user profile" />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-headline">{user.name}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                {user.mood && <p className="text-sm text-accent font-semibold">{user.mood}</p>}
                <Button variant="outline">Edit Profile</Button>
              </div>
            </div>
            <p className="mt-3 text-foreground max-w-prose">{user.bio}</p>
            <div className="mt-4 flex space-x-6 text-sm">
              <span><span className="font-semibold">{user.followers}</span> Followers</span>
              <span><span className="font-semibold">{user.following}</span> Following</span>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="vault">Vault</TabsTrigger>
          <TabsTrigger value="settings" className="hidden sm:inline-flex">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6 space-y-6">
          {user.posts.map(post => <PostCard key={post.id} post={post} />)}
          {user.posts.length === 0 && <p className="text-center text-muted-foreground">No posts yet.</p>}
        </TabsContent>

        <TabsContent value="goals" className="mt-6 space-y-4">
          {user.goals.map(goal => (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle>{goal.title}</CardTitle>
                <CardDescription>{goal.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                </div>
                <p className="text-xs text-right mt-1 text-muted-foreground">{goal.progress}% complete</p>
              </CardContent>
            </Card>
          ))}
          {user.goals.length === 0 && <p className="text-center text-muted-foreground">No goals tracked yet.</p>}
        </TabsContent>

        <TabsContent value="vault" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {user.archivedStories.map(story => (
                <Card key={story.id} className="overflow-hidden group relative aspect-[9/16]">
                <img src={story.imageUrl} alt={story.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="archived story mobile" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                    <p className="text-white text-xs font-medium truncate">{story.caption}</p>
                </div>
                </Card>
            ))}
            </div>
          {user.archivedStories.length === 0 && <p className="text-center text-muted-foreground">Memory Vault is empty.</p>}
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6 hidden sm:block">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
              <CardDescription>Manage your Vibe Connect preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5 text-muted-foreground hidden dark:inline-block" />
                  <Moon className="h-5 w-5 text-muted-foreground dark:hidden inline-block" />
                  <span className="font-medium">Theme</span>
                </div>
                <ThemeToggle />
              </div>
               <Button variant="outline" className="w-full">
                <ShieldCheck className="mr-2 h-4 w-4" /> Account & Privacy
              </Button>
              <Button variant="destructive" className="w-full">
                Logout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
