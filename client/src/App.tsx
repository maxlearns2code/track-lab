import { Layout } from '@/components/Layout';
import { Player } from '@/components/Player';
import { TrackCard } from '@/components/TrackCard';
import { TabsContent } from '@/components/ui/tabs';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Track, Weather, endpoints } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {
  const { location } = useGeolocation();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [currentTab, setCurrentTab] = useState('explore');
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // 1. Fetch Weather
  useEffect(() => {
    if (location) {
      endpoints.getWeather(location.lat, location.lon)
        .then(res => setWeather(res.data))
        .catch(console.error);
    }
  }, [location]);

  // 2. Fetch Music
  useEffect(() => {
    if (weather) {
      setLoading(true);
      const vibe = weather.is_day ? 'pop' : 'chill';
      endpoints.getMusic(vibe)
        .then(res => {
          setTracks(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [weather]);

  // 3. Fetch Favorites
  const fetchFavorites = () => {
    endpoints.getFavorites().then(res => setFavorites(res.data));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Handlers
  const handlePlay = (track: Track) => setCurrentTrack(track);

  const handleToggleFavorite = async (track: Track) => {
    // Check if track is already in favorites (either by API ID or DB ID)
    const isFav = favorites.find(f => f.id === track.id || (f as any).jamendo_id === track.id);
    
    if (isFav) {
      // Remove
      // Optimistic Update
      setFavorites(prev => prev.filter(f => f.id !== isFav.id));
      await endpoints.removeFavorite(isFav.id);
    } else {
      // Add
      // Backend expects { jamendo_id, name, artist_name, image, audio_url }
      await endpoints.addFavorite({
        jamendo_id: track.id,
        name: track.name,
        artist_name: track.artist_name,
        image: track.image,
        audio_url: track.audio
      }).then(fetchFavorites); 
    }
  };

  return (
    <Layout 
      weather={weather} 
      locationName={location ? "Current Location" : "Locating..."}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
    >
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <TabsContent value="explore" className="space-y-4 data-[state=active]:block">
          <h2 className="text-2xl font-bold mb-4">Recommended for {weather?.is_day ? 'Day' : 'Night'}</h2>
          
          {loading && (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map(track => (
              <TrackCard 
                key={track.id} 
                track={track}
                isFavorite={!!favorites.find(f => (f as any).jamendo_id === track.id)}
                onPlay={handlePlay}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4 data-[state=active]:block">
          <h2 className="text-2xl font-bold mb-4">Your Library</h2>
          {favorites.length === 0 ? (
             <p className="text-muted-foreground text-center py-10">No favorites yet.</p>
          ) : (
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {favorites.map(fav => (
                  <TrackCard 
                    key={fav.id} 
                    // Normalize DB track to UI track
                    track={{
                        ...fav, 
                        id: (fav as any).jamendo_id || fav.id, // Use Jamendo ID for display if possible
                        audio: (fav as any).audio_url || fav.audio
                    }} 
                    isFavorite={true}
                    onPlay={handlePlay}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
             </div>
          )}
        </TabsContent>
      </div>
      
      <Player currentTrack={currentTrack} />
    </Layout>
  );
}

export default App;
