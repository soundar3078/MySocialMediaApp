import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Zap, Users, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const trendingTopics = [
  { name: "TechInnovation", posts: "125K" },
  { name: "SustainableLiving", posts: "88K" },
  { name: "ArtOfTheDay", posts: "72K" },
  { name: "MindfulMoments", posts: "65K" },
  { name: "FutureOfWork", posts: "50K" },
];

const suggestedUsers = [
  { name: "Innovator_X", avatar: "https://placehold.co/100x100.png?text=IX", bio: "Exploring the next big thing.", dataAiHint: "tech user" },
  { name: "EcoWarrior", avatar: "https://placehold.co/100x100.png?text=EW", bio: "Living green, one step at a time.", dataAiHint: "nature profile" },
  { name: "PixelArtist", avatar: "https://placehold.co/100x100.png?text=PA", bio: "Creating worlds, one pixel at a time.", dataAiHint: "digital art" },
];

export default function DiscoverPage() {
  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Discover new chirps, users, or topics..." 
          className="pl-10 text-base h-12 rounded-xl shadow-sm"
        />
      </div>

      <section>
        <h2 className="text-xl font-bold font-headline mb-4 uppercase tracking-wider flex items-center">
          <TrendingUp className="mr-2 h-6 w-6 text-primary" /> Trending Now
        </h2>
        <div className="space-y-2">
          {trendingTopics.map(topic => (
            <Card key={topic.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-primary">#{topic.name}</h3>
                  <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                </div>
                <Zap className="h-5 w-5 text-accent" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold font-headline mb-4 uppercase tracking-wider flex items-center">
          <Users className="mr-2 h-6 w-6 text-primary" /> Suggested For You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedUsers.map(user => (
            <Card key={user.name} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="items-center">
                <Image src={user.avatar} alt={user.name} width={80} height={80} className="rounded-full border-2 border-primary" data-ai-hint={user.dataAiHint} />
                <CardTitle className="mt-2 text-base">{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs h-10 overflow-hidden">{user.bio}</CardDescription>
                <Button variant="outline" size="sm" className="mt-3 w-full">Follow</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold font-headline mb-4 uppercase tracking-wider flex items-center">
            <Hash className="mr-2 h-6 w-6 text-primary" /> Explore Tags
        </h2>
        <div className="flex flex-wrap gap-2">
            {['Photography', 'Travel', 'Foodie', 'Gaming', 'Music', 'Fitness', 'DIY', 'Startups'].map(tag => (
                <Badge key={tag} variant="outline" className="text-sm p-2 px-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                    {tag}
                </Badge>
            ))}
        </div>
      </section>

    </div>
  );
}
