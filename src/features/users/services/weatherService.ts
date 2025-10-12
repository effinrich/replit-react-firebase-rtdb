import axios, { AxiosError } from 'axios';
import { LocationData } from '../../../types/user';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherResponse {
  coord: {
    lat: number;
    lon: number;
  };
  timezone: number;
}

export const weatherService = {
  async getLocationData(zipCode: string, countryCode: string = 'us'): Promise<LocationData> {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured. Please set VITE_OPENWEATHER_API_KEY in your environment variables.');
    }

    try {
      const response = await axios.get<WeatherResponse>(BASE_URL, {
        params: {
          zip: `${zipCode},${countryCode}`,
          appid: API_KEY
        }
      });

      const { coord, timezone } = response.data;

      return {
        latitude: coord.lat,
        longitude: coord.lon,
        timezone: timezone
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error(`Invalid zip code: ${zipCode}. Please enter a valid US zip code.`);
      } else if (axiosError.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API configuration.');
      } else if (axiosError.response) {
        throw new Error(`Failed to fetch location data: ${(axiosError.response.data as any).message || axiosError.message}`);
      } else if (axiosError.request) {
        throw new Error('Network error: Unable to reach weather service. Please check your internet connection.');
      } else {
        throw new Error(`Failed to fetch location data: ${axiosError.message}`);
      }
    }
  }
};
