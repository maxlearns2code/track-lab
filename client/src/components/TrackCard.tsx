import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Track } from '@/services/api';
import { Heart, Play } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  isFavorite: boolean;
  onPlay: (track: Track) => void;
  onToggleFavorite: (track: Track) => void;
}

export function TrackCard({ track, isFavorite, onPlay, onToggleFavorite }: TrackCardProps) {
  return (
    <Card className="overflow-hidden group relative">
      <div className="relative">
        <img 
          src={track.image} 
          alt={track.name} 
          className="w-full h-48 object-cover transition-all group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Button size="icon" variant="secondary" className="rounded-full" onClick={() => onPlay(track)}>
            <Play className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>
      
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
        <div className="overflow-hidden pr-2">
          <CardTitle className="text-base truncate">{track.name}</CardTitle>
          <p className="text-xs text-muted-foreground truncate">{track.artist_name}</p>
        </div>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className={cn("shrink-0", isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground")}
          onClick={() => onToggleFavorite(track)}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </Button>
      </CardHeader>
    </Card>
  );
}
