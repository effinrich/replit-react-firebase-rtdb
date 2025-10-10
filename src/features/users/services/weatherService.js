import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const weatherService = {
  async getLocationData(zipCode, countryCode = 'us') {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured. Please set VITE_OPENWEATHER_API_KEY in your environment variables.');
    }

    try {
      const response = await axios.get(BASE_URL, {
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
      throw new Error(`Failed to fetch location data: ${error.message}`);
    }
  }
};
