import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-4xl font-headline font-bold text-primary mb-6">Welcome to Vibe Connect</h1>
      <p className="text-lg text-foreground mb-8 text-center max-w-md">
        Sync your vibes, share your moments. Discover a new way to connect.
      </p>
      <Link href="/feed" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
        Go to Feed
      </Link>
    </div>
  );
}
