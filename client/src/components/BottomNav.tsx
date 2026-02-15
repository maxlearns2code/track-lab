import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Home, ListMusic, User } from 'lucide-react';

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-10">
      <TabsList className="grid w-full grid-cols-4 h-auto bg-transparent p-0 gap-8">
        <TabsTrigger value="explore" className="flex flex-col gap-1 data-[state=active]:text-primary data-[state=active]:bg-transparent hover:bg-transparent hover:text-foreground/80 transition-colors">
          <Home className="h-6 w-6" /> 
        </TabsTrigger>
        <TabsTrigger value="playlists" className="flex flex-col gap-1 data-[state=active]:text-primary data-[state=active]:bg-transparent hover:bg-transparent hover:text-foreground/80 transition-colors">
          <ListMusic className="h-6 w-6" /> 
        </TabsTrigger>
        <TabsTrigger value="favorites" className="flex flex-col gap-1 data-[state=active]:text-primary data-[state=active]:bg-transparent hover:bg-transparent hover:text-foreground/80 transition-colors">
          <Heart className="h-6 w-6" /> 
        </TabsTrigger>
        <TabsTrigger value="account" className="flex flex-col gap-1 data-[state=active]:text-primary data-[state=active]:bg-transparent hover:bg-transparent hover:text-foreground/80 transition-colors">
          <User className="h-6 w-6" /> 
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
