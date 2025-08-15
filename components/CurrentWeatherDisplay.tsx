// components/CurrentWeatherDisplay.tsx
'use client';

import { motion } from "framer-motion";
import { UltimateWeatherData } from "@/lib/types";
import { Droplets, Wind, Gauge, Sunrise, Sunset, Sun, Star } from "lucide-react";
import { convertTemp, convertWindSpeed, getWeatherIcon, formatTime } from '@/lib/utils';
import { useSettingsStore } from '@/hooks/useSettingsStore';
import { InfoItem } from "@/components/InfoItem";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

interface CurrentWeatherDisplayProps {
  data: UltimateWeatherData;
}

export function CurrentWeatherDisplay({ data }: CurrentWeatherDisplayProps) {
  const { 
    temperatureUnit, 
    windSpeedUnit,
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity
  } = useSettingsStore();

  const CurrentWeatherIcon = getWeatherIcon(data.current.description) || Sun;

  const isFavorite = favoriteCities.includes(data.location.name);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavoriteCity(data.location.name);
    } else {
      addFavoriteCity(data.location.name);
    }
  };


  return (
    <motion.div 
      className="flex flex-col items-center text-center space-y-10" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col items-center space-y-2">
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold">{data.location.name}, {data.location.country}</p>
          <button onClick={handleFavoriteToggle} aria-label="Toggle Favorite" className="focus:outline-none">
            <Star className={cn(
              "h-6 w-6 transition-colors",
              isFavorite ? "text-yellow-400 fill-yellow-400" : "text-slate-400 hover:text-yellow-400"
            )} />
          </button>
        </div>
        
        <CurrentWeatherIcon className="w-32 h-32 text-blue-500 dark:text-blue-300" />
        <h1 className="text-8xl font-extrabold -mt-4">
           {convertTemp(data.current.temp, temperatureUnit).toFixed(0)}°
          <span className="text-7xl">{temperatureUnit === 'celsius' ? 'C' : 'F'}</span>
        </h1>
        <p className="capitalize text-xl text-muted-foreground">{data.current.description}</p>
      </motion.div>
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-x-12 gap-y-6">
        <InfoItem icon={Droplets} label="Kelembapan" value={`${data.details.humidity}%`} />
        <InfoItem 
          icon={Wind} 
          label="Angin" 
          value={`${convertWindSpeed(data.details.windSpeed, windSpeedUnit).toFixed(1)} ${windSpeedUnit === 'ms' ? 'm/s' : 'km/h'}`} 
        />
        <InfoItem icon={Gauge} label="Tekanan" value={`${data.details.pressure} hPa`} />
        <InfoItem icon={Sunrise} label="Terbit" value={formatTime(data.forecast.sunrise)} />
        <InfoItem icon={Sunset} label="Terbenam" value={formatTime(data.forecast.sunset)} />
      </motion.div>
    </motion.div>
  );
}