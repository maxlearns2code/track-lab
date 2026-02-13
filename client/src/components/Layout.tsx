import { Tabs } from '@/components/ui/tabs';
import { Weather } from '@/services/api';
import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { WeatherHeader } from './WeatherHeader';

interface LayoutProps {
  children: ReactNode;
  weather: Weather | null;
  locationName: string; // e.g. "Paris"
  currentTab: string;
  onTabChange: (val: string) => void;
}

export function Layout({ children, weather, locationName, currentTab, onTabChange }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-20">
       <WeatherHeader weather={weather} locationName={locationName} />
       
       <Tabs value={currentTab} onValueChange={onTabChange} className="flex-1 flex flex-col">
          {children}
          <BottomNav />
       </Tabs>
    </div>
  );
}
