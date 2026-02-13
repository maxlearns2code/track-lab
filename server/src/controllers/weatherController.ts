import { Request, Response } from 'express';
import { getWeather } from '../services/weatherService';

export const getWeatherHandler = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  try {
    const weather = await getWeather(Number(lat), Number(lon));
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
