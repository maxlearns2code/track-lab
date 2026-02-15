import { Weather } from '@/services/api';
import { useMemo } from 'react';

interface BackgroundProps {
  weather: Weather | null;
}

export function Background({ weather }: BackgroundProps) {
  // Determine gradient based on time of day (is_day)
  // Default to day if no weather data yet
  const backgroundClass = useMemo(() => {
    if (!weather) return "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"; // Neutral start
    
    if (weather.is_day) {
      // Day: Warm, energetic
      // Peach -> Soft Blue -> Warm Yellow
      return "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-amber-100 to-sky-100 animate-pulse-slow";
    } else {
      // Night: Cool, deep
      // Midnight Blue -> Purple -> Dark Teal
      return "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-950";
    }
  }, [weather]);

  return (
    <div className={`fixed inset-0 -z-50 transition-all duration-1000 ease-in-out ${backgroundClass}`}>
      {/* Overlay texture for grain/noise effect */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      {/* Ambient orbs for extra dynamism */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 blur-[100px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] animate-blob animation-delay-2000" />
    </div>
  );
}
