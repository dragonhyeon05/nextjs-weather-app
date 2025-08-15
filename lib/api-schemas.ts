// lib/api-schemas.ts
import { z } from 'zod';

// Skema untuk data cuaca saat ini dari OpenWeatherMap
export const OpenWeatherCurrentSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  weather: z.array(z.object({
    description: z.string(),
    icon: z.string(),
  })).min(1),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  visibility: z.number(),
  wind: z.object({
    speed: z.number(),
  }),
  clouds: z.object({
    all: z.number(),
  }),
  sys: z.object({
    country: z.string(),
  }),
  name: z.string(),
});

// Skema untuk data polusi udara dari OpenWeatherMap
export const OpenWeatherAirQualitySchema = z.object({
  list: z.array(z.object({
    main: z.object({
      aqi: z.number().int().min(1).max(5),
    }),
    // -- PERBAIKAN DI SINI --
    components: z.record(z.string(), z.number()), 
  })).min(1),
});

// Skema untuk data forecast dari WeatherAPI
export const WeatherAPIForecastSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
  }),
  current: z.object({
    uv: z.number(),
    gust_kph: z.number(),
    wind_dir: z.string(),
    wind_degree: z.number(),
    dewpoint_c: z.number(),
    wave_m: z.number().optional(),
    water_temp_c: z.number().optional(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
  }),
  forecast: z.object({
    forecastday: z.array(z.object({
      date: z.string(),
      day: z.object({
        maxtemp_c: z.number(),
        mintemp_c: z.number(),
        daily_chance_of_rain: z.number(),
        condition: z.object({
          text: z.string(),
          icon: z.string(),
        }),
      }),
      astro: z.object({
        sunrise: z.string(),
        sunset: z.string(),
        moon_phase: z.string(),
      }),
      hour: z.array(z.object({
        time_epoch: z.number(),
        temp_c: z.number(),
        condition: z.object({
          text: z.string(),
          icon: z.string(),
        }),
      })),
    })),
  }),
  alerts: z.object({
    alert: z.array(z.object({
      headline: z.string(),
      event: z.string(),
      desc: z.string(),
    })),
  }).optional(),
});