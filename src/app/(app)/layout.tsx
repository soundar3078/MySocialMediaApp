import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mb-16 md:mb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
