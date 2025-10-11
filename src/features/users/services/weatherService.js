import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getLocationData = async (zipCode, countryCode = "us") => {
  if (!API_KEY) {
    throw new Error(
      "OpenWeatherMap API key is not configured. Please set VITE_OPENWEATHER_API_KEY in your environment variables.",
    );
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        zip: `${zipCode},${countryCode}`,
        appid: API_KEY,
      },
    });

    const { coord, timezone } = response.data;

    return {
      latitude: coord.lat,
      longitude: coord.lon,
      timezone: timezone,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(
        `Invalid zip code: ${zipCode}. Please enter a valid US zip code.`,
      );
    } else if (error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your OpenWeatherMap API configuration.",
      );
    } else if (error.response) {
      throw new Error(
        `Failed to fetch location data: ${error.response.data.message || error.message}`,
      );
    } else if (error.request) {
      throw new Error(
        "Network error: Unable to reach weather service. Please check your internet connection.",
      );
    } else {
      throw new Error(`Failed to fetch location data: ${error.message}`);
    }
  }
};
