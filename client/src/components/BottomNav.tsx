import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Search } from 'lucide-react';

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-md border-t border-white/20 z-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="explore">
          <Search className="h-4 w-4 mr-2" /> Explore
        </TabsTrigger>
        <TabsTrigger value="favorites">
          <Heart className="h-4 w-4 mr-2" /> Library
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
