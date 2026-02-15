import { Weather } from '@/services/api';
import { Cloud, MapPin, Sun } from 'lucide-react';

interface WeatherHeaderProps {
  weather: Weather | null;
  locationName: string;
}

export function WeatherHeader({ weather, locationName }: WeatherHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background p-6 pt-8 transition-all">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2 font-heading">
          TrackLab
        </h1>
        
        <div className="flex items-center gap-2">
          {/* Minimalist Weather Icon Only */}
          {weather && (
             <div className="flex items-center gap-2 text-muted-foreground bg-secondary/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border/50">
                {weather.is_day ? <Sun className="h-3 w-3" /> : <Cloud className="h-3 w-3" />}
                <span>{weather.temperature}°</span>
                <span className="opacity-50">|</span>
                <MapPin className="h-3 w-3" />
                <span>{locationName || "Locating..."}</span>
             </div>
          )}
        </div>
      </div>
    </header>
  );
}
