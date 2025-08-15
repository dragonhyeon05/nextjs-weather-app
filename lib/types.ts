// lib/types.ts
export interface UltimateWeatherData {
  location: {
    name: string;
    country: string;
    lat?: number;
    lon?: number; 
  };
  current: {
    temp: number;
    feelsLike: number;
    description: string;
    icon: string; // <-- Dulu tidak ada, tapi seharusnya ada. Dihapus karena tidak terpakai.
    tempMin: number;
    tempMax: number;
  };
  details: {
    humidity: number;
    pressure: number;
    windSpeed: number;
    windGust: number | null;
    windDirection: string;
    windDegree: number;
    uvIndex: number;
    uvDescription: string;
    cloudCover: number;
    visibility: number; 
    dewpoint_c: number;
    waveHeight?: number;
    waterTemperature?: number;
  };
  forecast: {
    chanceOfRain: number;
    sunrise: string;
    sunset: string;
    moonPhase: string;
    daily: {
      date: string;
      tempMax: number;
      tempMin: number;
      condition: string;
      icon: string;
      chanceOfRain: number; // <-- 1. TAMBAHKAN PROPERTI INI
    }[];
    hourly: {
      time: number; 
      temp: number;
      condition: string;
      icon: string;
    }[];
  };
  environment: {
    aqi: number;
    aqiDescription: string;
    pollutants: {
      pm2_5?: number;
      pm10?: number;
      no2?: number;
      o3?: number;
      co?: number;
    };
  };
  alerts: {
    event: string;
    description: string;
  }[];
}