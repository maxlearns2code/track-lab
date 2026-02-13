import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export interface Weather {
  temperature: number;
  weathercode: number;
  is_day: number;
}

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  image: string;
  audio: string;
}

export const endpoints = {
  getWeather: (lat: number, lon: number) => 
    API.get<Weather>('/weather', { params: { lat, lon } }),
  
  getMusic: (vibe: string) => 
    API.get<Track[]>('/music', { params: { vibe } }),
    
  getFavorites: () => 
    API.get('/favorites'),
    
  addFavorite: (track: any) => 
    API.post('/favorites', track),
    
  removeFavorite: (id: string) => 
    API.delete(`/favorites/${id}`),
};

export default API;
