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
    <Card className="overflow-hidden group relative border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
      <div className="relative">
        <img 
          src={track.image} 
          alt={track.name} 
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Button size="icon" variant="secondary" className="rounded-full scale-90 group-hover:scale-100 transition-transform duration-300" onClick={() => onPlay(track)}>
            <Play className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>
      
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
        <div className="overflow-hidden pr-2">
          <CardTitle className="text-base truncate font-heading tracking-wide text-foreground/90">{track.name}</CardTitle>
          <p className="text-xs text-muted-foreground truncate">{track.artist_name}</p>
        </div>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className={cn("shrink-0 hover:bg-white/10", isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground")}
          onClick={() => onToggleFavorite(track)}
        >
          <Heart className={cn("h-5 w-5 transition-transform active:scale-90", isFavorite && "fill-current")} />
        </Button>
      </CardHeader>
    </Card>
  );
}
