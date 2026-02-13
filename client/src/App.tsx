import { Layout } from '@/components/Layout';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Track, Weather, endpoints } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {
  const { location, error: locationError } = useGeolocation();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState('explore');
  const [loading, setLoading] = useState(false);

  // 1. Fetch Weather when Location is ready
  useEffect(() => {
    if (location) {
      endpoints.getWeather(location.lat, location.lon)
        .then(res => setWeather(res.data))
        .catch(err => console.error('Weather error:', err));
    }
  }, [location]);

  // 2. Fetch Music when Weather is ready (Context-Aware)
  useEffect(() => {
    if (weather) {
      setLoading(true);
      // Simple mapping: Clear sky -> 'happy', Rain -> 'calm', etc.
      // For now, we just use a default or 'pop' if undefined
      const vibe = weather.is_day ? 'pop' : 'chill';
      
      endpoints.getMusic(vibe)
        .then(res => {
          setTracks(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Music error:', err);
          setLoading(false);
        });
    }
  }, [weather]);

  // 3. Fetch Favorites on load
  useEffect(() => {
    endpoints.getFavorites()
      .then(res => setFavorites(res.data))
      .catch(console.error);
  }, []);

  return (
    <Layout 
      weather={weather} 
      locationName={location ? "Current Location" : "Locating..."}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
    >
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <TabsContent value="explore" className="space-y-4 data-[state=active]:block">
          <h2 className="text-2xl font-bold mb-4">Recommended for {weather?.is_day ? 'Day' : 'Night'}</h2>
          
          {loading && (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map(track => (
              <Card key={track.id} className="overflow-hidden">
                <img 
                  src={track.image} 
                  alt={track.name} 
                  className="w-full h-48 object-cover transition-all hover:scale-105"
                />
                <CardHeader className="p-4">
                  <CardTitle className="text-lg truncate">{track.name}</CardTitle>
                  <p className="text-sm text-muted-foreground truncate">{track.artist_name}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4 data-[state=active]:block">
          <h2 className="text-2xl font-bold mb-4">Your Library</h2>
          {favorites.length === 0 ? (
             <p className="text-muted-foreground text-center py-10">No favorites yet.</p>
          ) : (
             <div className="grid gap-4">
                {favorites.map(fav => (
                  <Card key={fav.id} className="flex items-center p-2 gap-4">
                     <img src={fav.image} className="w-16 h-16 rounded object-cover" />
                     <div>
                        <h3 className="font-bold">{fav.name}</h3>
                        <p className="text-sm">{fav.artist_name}</p>
                     </div>
                  </Card>
                ))}
             </div>
          )}
        </TabsContent>
      </div>
    </Layout>
  );
}

export default App;
