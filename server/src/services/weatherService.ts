import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

interface WeatherData {
  temperature: number;
  weathercode: number;
  is_day: number;
}

export const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
      },
    });

    return response.data.current_weather;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
};
