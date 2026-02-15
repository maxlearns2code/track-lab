import { Button } from '@/components/ui/button';
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
    <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      {/* Album Art (Left) */}
      <div className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white/10">
        <img 
          src={track.image} 
          alt={track.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play Overlay - Only on Hover */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:text-white hover:bg-transparent" onClick={() => onPlay(track)}>
             <Play className="h-4 w-4 fill-current" />
           </Button>
        </div>
      </div>
      
      {/* Text Info (Middle) */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-heading font-bold text-base leading-tight truncate text-foreground/90">{track.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{track.artist_name}</p>
      </div>
      
      {/* Actions (Right) */}
      <div className="shrink-0 flex items-center gap-2">
         {/* Duration could go here if available */}
         <Button 
           size="icon" 
           variant="ghost" 
           className={cn("h-9 w-9 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10", isFavorite && "text-red-500 bg-red-500/10")}
           onClick={() => onToggleFavorite(track)}
         >
           <Heart className={cn("h-5 w-5 transition-transform active:scale-90", isFavorite && "fill-current")} />
         </Button>
      </div>
    </div>
  );
}
