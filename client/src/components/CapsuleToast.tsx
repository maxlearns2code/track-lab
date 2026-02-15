import { Track } from '@/services/api';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CapsuleToastProps {
  track: Track | null;
  isVisible: boolean;
  onClose: () => void;
}

export function CapsuleToast({ track, isVisible, onClose }: CapsuleToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!track && !show) return null;

  return (
    <div 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${
        show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-20 opacity-0 scale-90'
      }`}
    >
      <div className="relative bg-slate-900/95 backdrop-blur-xl text-white rounded-full p-2 pr-6 shadow-2xl flex items-center gap-4 border border-white/10 min-w-[320px] max-w-[90vw]">
        {/* Golden Glow Effect behind */}
        <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-xl -z-10" />
        
        {/* Album Art (Spinning) */}
        <div className="relative shrink-0">
          <img 
            src={track?.image} 
            alt={track?.name} 
            className="w-12 h-12 rounded-full object-cover border border-white/10 animate-spin-slow"
          />
          {/* Center hole for vinyl look */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 bg-slate-900 rounded-full" />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="text-sm font-bold truncate leading-tight text-white">{track?.name}</h4>
          <p className="text-xs text-white/50 truncate flex items-center gap-1">
            {track?.artist_name} <span className="w-1 h-1 rounded-full bg-white/30" /> Liked
          </p>
        </div>

        {/* Heart Icon */}
        <div className="shrink-0 relative">
          <Heart className="h-6 w-6 fill-yellow-500 text-yellow-500 animate-pulse" />
          {/* Simple Particle Dots (Static for now, could be animated) */}
          <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-400 rounded-full opacity-80" />
          <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-400 rounded-full opacity-60" />
        </div>
      </div>
    </div>
  );
}
