import { Badge } from '@/components/ui/badge';
import { Weather } from '@/services/api';
import { Cloud, MapPin, Sun } from 'lucide-react';

interface WeatherHeaderProps {
  weather: Weather | null;
  locationName: string;
}

export function WeatherHeader({ weather, locationName }: WeatherHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white/10 backdrop-blur-md border-b border-white/20 p-4 transition-all">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          TrackLab <span className="text-primary text-xs font-normal opacity-50">v1.0</span>
        </h1>
        
        <div className="flex items-center gap-2">
          {locationName && (
            <Badge variant="outline" className="flex gap-1 items-center">
              <MapPin className="h-3 w-3" />
              {locationName}
            </Badge>
          )}
          
          {weather && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              {weather.is_day ? <Sun className="h-3 w-3" /> : <Cloud className="h-3 w-3" />}
              {weather.temperature}°C
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
}
