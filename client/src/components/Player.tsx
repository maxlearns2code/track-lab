import { Button } from '@/components/ui/button';
import { Track } from '@/services/api';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PlayerProps {
  currentTrack: Track | null;
}

export function Player({ currentTrack }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // When track changes, auto-play
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audio;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback failed", err));
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!currentTrack) return null;

  return (
    <>
      {/* Expanded View Overlay */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-all duration-500 ${isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ visibility: isPlaying ? 'visible' : 'hidden' }} // Only show when "expanded" (using isPlaying as proxy for now, or add explicit state)
      />

      {/* Capsule Player */}
      <div className="fixed bottom-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md h-16 bg-slate-900 border border-slate-800 shadow-2xl rounded-full flex items-center px-2 pr-4 gap-3 z-50 transition-all duration-500 hover:scale-105 active:scale-100">
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        
        {/* Spinning Vinyl / Art */}
        <div className={`relative shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
           <img 
             src={currentTrack.image} 
             className="w-12 h-12 rounded-full object-cover border-2 border-white/20" 
             alt="Album Art"
           />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
           </div>
        </div>
        
        <div className="flex-1 overflow-hidden pointer-events-none">
          <h4 className="text-sm font-bold truncate text-white">{currentTrack.name}</h4>
          <p className="text-xs text-white/60 truncate">{currentTrack.artist_name}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full h-10 w-10 text-white hover:bg-white/10 hover:text-white" 
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-1" />}
          </Button>
        </div>
      </div>
    </>
  );
}
