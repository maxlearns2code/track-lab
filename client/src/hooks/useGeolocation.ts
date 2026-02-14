import { useEffect, useState } from 'react';

export interface Location {
  lat: number;
  lon: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
        // Fallback to Paris for dev/demo purposes if blocked
        console.warn('Geolocation blocked, defaulting to Paris for demo', err);
        setLocation({ lat: 48.8566, lon: 2.3522 }); 
      }
    );
  }, []);

  return { location, error, loading };
};
