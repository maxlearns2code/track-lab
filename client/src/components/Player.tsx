import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Track } from '@/services/api';
import { Pause, Play, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PlayerProps {
  currentTrack: Track | null;
}

export function Player({ currentTrack }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([100]);

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

  const handleVolumeChange = (vals: number[]) => {
    setVolume(vals);
    if (audioRef.current) {
      audioRef.current.volume = vals[0] / 100;
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 h-16 bg-background border-t flex items-center px-4 gap-4 z-20">
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      
      <img src={currentTrack.image} className="w-10 h-10 rounded object-cover" />
      
      <div className="flex-1 overflow-hidden">
        <h4 className="text-sm font-bold truncate">{currentTrack.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{currentTrack.artist_name}</p>
      </div>

      <Button size="icon" variant="ghost" onClick={togglePlay}>
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
      </Button>

      <div className="w-20 hidden md:flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider 
          value={volume} 
          max={100} 
          step={1} 
          onValueChange={handleVolumeChange} 
        />
      </div>
    </div>
  );
}
