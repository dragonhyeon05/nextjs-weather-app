// app/api/weather/[...location]/route.ts
import { NextResponse } from 'next/server';
import { OpenWeatherCurrentSchema, WeatherAPIForecastSchema, OpenWeatherAirQualitySchema } from '@/lib/api-schemas';

const getUviDescription = (uvi: number) => {
  if (uvi <= 2) return "Rendah";
  if (uvi <= 5) return "Sedang";
  if (uvi <= 7) return "Tinggi";
  if (uvi <= 10) return "Sangat Tinggi";
  return "Ekstrem";
};
const getAQIDescription = (aqi: number) => {
  switch (aqi) {
    case 1: return "Baik";
    case 2: return "Cukup";
    case 3: return "Sedang";
    case 4: return "Buruk";
    case 5: return "Sangat Buruk";
    default: return "N/A";
  }
};

export async function GET(
  request: Request,
  context: { params: { location: string[] } }
) {
  const { location } = context.params;
  const url = new URL(request.url);
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');
  
  let locationQuery = '';
  if (lat && lon) {
    locationQuery = `${lat},${lon}`;
  } else {
    locationQuery = decodeURIComponent(location.join('/'));
  }

  if (!locationQuery) {
    return NextResponse.json({ error: 'City or coordinates are required' }, { status: 400 });
  }
  
  const detail = url.searchParams.get('detail') === 'true';
  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const WEATHERAPI_API_KEY = process.env.WEATHERAPI_API_KEY;

  if (!OPENWEATHER_API_KEY || !WEATHERAPI_API_KEY) {
    return NextResponse.json(
      { error: 'API keys not configured' },
      { status: 500 },
    );
  }

  try {
    const openWeatherUrl = lat && lon
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=id`
      : `https://api.openweathermap.org/data/2.5/weather?q=${locationQuery}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=id`;
      
    const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_API_KEY}&q=${locationQuery}&days=${detail ? '5' : '1'}&aqi=no&alerts=${detail ? 'yes' : 'no'}&lang=id`;

    const [openWeatherRes, weatherApiRes] = await Promise.all([
        fetch(openWeatherUrl, { next: { revalidate: 600 } }),
        fetch(weatherApiUrl, { next: { revalidate: 600 } })
    ]);

    if (!openWeatherRes.ok) throw new Error('Data cuaca saat ini tidak tersedia.');
    if (!weatherApiRes.ok) throw new Error('Data perkiraan cuaca tidak tersedia.');

    const openWeatherJson = await openWeatherRes.json();
    const openWeatherParsed = OpenWeatherCurrentSchema.safeParse(openWeatherJson);
    if (!openWeatherParsed.success) {
      console.error("Zod Validation Error (OpenWeather):", openWeatherParsed.error);
      throw new Error("Format data cuaca saat ini tidak valid.");
    }
    const openWeatherData = openWeatherParsed.data;

    const weatherApiJson = await weatherApiRes.json();
    const weatherApiParsed = WeatherAPIForecastSchema.safeParse(weatherApiJson);
    if (!weatherApiParsed.success) {
      console.error("Zod Validation Error (WeatherAPI):", weatherApiParsed.error);
      throw new Error("Format data perkiraan cuaca tidak valid.");
    }
    const weatherApiData = weatherApiParsed.data;

    let aqiData = null;
    if (detail) {
      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${openWeatherData.coord.lat}&lon=${openWeatherData.coord.lon}&appid=${OPENWEATHER_API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      if (aqiRes.ok) {
        const aqiJson = await aqiRes.json();
        const aqiParsed = OpenWeatherAirQualitySchema.safeParse(aqiJson);
        if (aqiParsed.success) {
          aqiData = aqiParsed.data;
        } else {
            console.error("Zod Validation Error (Air Quality):", aqiParsed.error);
        }
      }
    }

    const forecastData = weatherApiData.forecast.forecastday[0];
    const formattedData = {
      location: {
        name: openWeatherData.name,
        country: openWeatherData.sys.country,
        lat: openWeatherData.coord.lat,
        lon: openWeatherData.coord.lon,
      },
      current: {
        temp: openWeatherData.main.temp,
        feelsLike: openWeatherData.main.feels_like,
        description: openWeatherData.weather[0].description,
        tempMin: openWeatherData.main.temp_min,
        tempMax: openWeatherData.main.temp_max,
      },
      details: {
        humidity: openWeatherData.main.humidity,
        pressure: openWeatherData.main.pressure,
        windSpeed: openWeatherData.wind.speed,
        windGust: weatherApiData.current.gust_kph / 3.6,
        windDirection: weatherApiData.current.wind_dir,
        windDegree: weatherApiData.current.wind_degree,
        uvIndex: weatherApiData.current.uv,
        uvDescription: getUviDescription(weatherApiData.current.uv),
        cloudCover: openWeatherData.clouds.all,
        visibility: openWeatherData.visibility / 1000,
        dewpoint_c: weatherApiData.current.dewpoint_c,
        waveHeight: weatherApiData.current.wave_m,
        waterTemperature: weatherApiData.current.water_temp_c,
      },
      forecast: {
        chanceOfRain: forecastData.day.daily_chance_of_rain,
        sunrise: forecastData.astro.sunrise,
        sunset: forecastData.astro.sunset,
        moonPhase: forecastData.astro.moon_phase,
        daily: weatherApiData.forecast.forecastday.map(day => ({
          date: day.date,
          tempMax: day.day.maxtemp_c,
          tempMin: day.day.mintemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
          chanceOfRain: day.day.daily_chance_of_rain,
        })),
        hourly: weatherApiData.forecast.forecastday.flatMap(day => day.hour.map(hour => ({
          time: hour.time_epoch,
          temp: hour.temp_c,
          condition: hour.condition.text,
          icon: hour.condition.icon,
        }))),
      },
      environment: {
        aqi: aqiData?.list?.[0]?.main.aqi ?? 0,
        aqiDescription: aqiData?.list?.[0]?.main?.aqi ? getAQIDescription(aqiData.list[0].main.aqi) : 'N/A',
        pollutants: aqiData?.list?.[0]?.components ?? {},
      },
      alerts: weatherApiData.alerts?.alert.map((alert) => ({
          event: alert.event,
          description: alert.desc,
        })) ?? [],
    };

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error('Failed to fetch weather data:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch weather data' },
      { status: 500 },
    );
  }
}