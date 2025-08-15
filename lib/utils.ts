// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, CloudDrizzle, CloudSun, CloudFog } from "lucide-react";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeatherIcon(description: string): React.ElementType {
  const normalizedDesc = description.toLowerCase();
  switch (true) {
    case normalizedDesc.includes('cerah') || normalizedDesc.includes('clear'):
      return Sun;
    case normalizedDesc.includes('sebagian berawan') || normalizedDesc.includes('partly cloudy'):
      return CloudSun;
    case normalizedDesc.includes('berawan') || normalizedDesc.includes('cloudy') || normalizedDesc.includes('mendung') ||
    normalizedDesc.includes('overcast'):
      return Cloud;
    case normalizedDesc.includes('hujan') || normalizedDesc.includes('rain'):
      return CloudRain;
    case normalizedDesc.includes('hujan rintik') || normalizedDesc.includes('drizzle'):
      return CloudDrizzle;
    case normalizedDesc.includes('guntur') ||
    normalizedDesc.includes('thunder'):
      return CloudLightning;
    case normalizedDesc.includes('salju') || normalizedDesc.includes('snow'):
      return CloudSnow;
    case normalizedDesc.includes('kabut') || normalizedDesc.includes('fog'):
      return CloudFog;
    default:
      return Sun;
  }
}

export const formatTime = (timeString: string | undefined): string => {
  if (!timeString) return "N/A";
  const parts = timeString.trim().split(" ");
  return parts.length > 0 ? parts[0] : "N/A";
};

export const convertTemp = (temp: number, unit: 'celsius' | 'fahrenheit'): number => {
  if (unit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  return temp;
};

export const convertWindSpeed = (speed: number, unit: 'ms' | 'kmh'): number => {
  if (unit === 'kmh') {
    return speed * 3.6;
  }
  return speed;
};
// KURUNG KURAWAL BERLEBIH TELAH DIHAPUS DARI SINI