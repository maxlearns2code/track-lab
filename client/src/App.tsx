import { CapsuleToast } from '@/components/CapsuleToast';
import { Layout } from '@/components/Layout';
import { Player } from '@/components/Player';
import { TrackCard } from '@/components/TrackCard';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Track, Weather, endpoints } from '@/services/api';
import { ListMusic, Loader2 } from 'lucide-react';
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

  const [notification, setNotification] = useState<{ track: Track | null, visible: boolean }>({ track: null, visible: false });

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
      // Show Notification
      setNotification({ track, visible: true });
      
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
          <h2 className="text-5xl font-heading font-black tracking-tight leading-[0.9] mb-8 mt-2">Recommended<br />for {weather?.is_day ? 'You' : 'Tonight'}</h2>
          
          {loading && (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          <div className="flex flex-col gap-2">
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

        <TabsContent value="playlists" className="space-y-4 data-[state=active]:block">
           <h2 className="text-4xl font-heading font-bold mb-6 tracking-tight">Your<br />Playlists</h2>
           <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <ListMusic className="h-8 w-8 opacity-50" />
              </div>
              <p>Create your first playlist to get started.</p>
              <Button variant="outline" className="rounded-full">Create Playlist</Button>
           </div>
        </TabsContent>

        <TabsContent value="account" className="space-y-4 data-[state=active]:block">
           <h2 className="text-4xl font-heading font-bold mb-6 tracking-tight">My<br />Account</h2>
            <div className="p-6 rounded-3xl bg-secondary/50 border border-border space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                  M
                </div>
                <div>
                  <h3 className="text-xl font-bold">Max User</h3>
                  <p className="text-muted-foreground">Premium Member</p>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between py-2">
                  <span>Plan</span>
                  <span className="font-medium">TrackLab Pro</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Quality</span>
                  <span className="font-medium">High Fidelity</span>
                </div>
              </div>
            </div>
        </TabsContent>
      </div>
      
      <Player currentTrack={currentTrack} />
      
      <CapsuleToast 
        track={notification.track} 
        isVisible={notification.visible} 
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))} 
      />
    </Layout>
  );
}

export default App;
