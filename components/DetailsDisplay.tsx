// components/DetailsDisplay.tsx
'use client';

import { HourlyTemperatureChart } from "@/components/ui/HourlyTemperatureChart";
import { UltimateWeatherData } from "@/lib/types";
import {
  Cloud,
  Droplets,
  Gauge,
  Eye,
  Wind,
  Sun,
  Thermometer,
} from "lucide-react";
import { convertTemp, convertWindSpeed } from "@/lib/utils";
import { useSettingsStore } from "@/hooks/useSettingsStore";


export function DetailsDisplay({ data }: { data: UltimateWeatherData }) {
  const { temperatureUnit, windSpeedUnit } = useSettingsStore();

  const tempUnitLabel = temperatureUnit === 'celsius' ? '°C' : '°F';
  const windUnitLabel = windSpeedUnit === 'ms' ? 'm/s' : 'km/h';

  return (
    <div className="w-full max-w-4xl space-y-12">
      
      {/* Bagian Suhu Harian */}
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-foreground">Suhu Harian</h3>
        <p className="text-muted-foreground mb-6">Suhu tertinggi, terendah, dan yang terasa hari ini.</p>
        <div className="flex w-full max-w-md items-center justify-around gap-6 text-center">
          <div className="flex flex-col items-center space-y-1">
            <Thermometer className="h-8 w-8 text-red-400" />
            <p className="text-2xl font-bold">{convertTemp(data.current.tempMax, temperatureUnit).toFixed(0)}{tempUnitLabel}</p>
            <span className="text-sm text-muted-foreground">Tertinggi</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Sun className="h-8 w-8 text-yellow-400" />
            <p className="text-2xl font-bold">{convertTemp(data.current.feelsLike, temperatureUnit).toFixed(0)}{tempUnitLabel}</p>
            <span className="text-sm text-muted-foreground">Terasa</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Thermometer className="h-8 w-8 text-blue-400" />
            <p className="text-2xl font-bold">{convertTemp(data.current.tempMin, temperatureUnit).toFixed(0)}{tempUnitLabel}</p>
            <span className="text-sm text-muted-foreground">Terendah</span>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Bagian Suhu Per Jam */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <Thermometer className="h-7 w-7 text-blue-400" />
          <h3 className="text-2xl font-bold text-foreground">Suhu Per Jam</h3>
        </div>
        <p className="text-muted-foreground mb-4">Perkiraan suhu untuk 24 jam ke depan.</p>
        <div className="w-full h-[200px] pl-0 pr-4 sm:pr-6">
            <HourlyTemperatureChart data={data} />
        </div>
      </div>

      <hr className="border-border" />

      {/* Bagian Detail Cuaca */}
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-foreground">Detail Cuaca</h3>
        <p className="text-muted-foreground mb-8">Informasi cuaca tambahan untuk hari ini.</p>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
          <div className="flex flex-col items-center text-center">
            <Droplets className="h-8 w-8 text-blue-400" />
            <p className="mt-2 text-lg font-bold">{data.details.humidity}%</p>
            <p className="text-xs text-muted-foreground">Kelembapan</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Wind className="h-8 w-8 text-slate-400" />
            <p className="mt-2 text-lg font-bold">{convertWindSpeed(data.details.windSpeed, windSpeedUnit).toFixed(1)} {windUnitLabel}</p>
            <p className="text-xs text-muted-foreground">Kecepatan Angin</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Gauge className="h-8 w-8 text-orange-400" />
            <p className="mt-2 text-lg font-bold">{data.details.pressure} hPa</p>
            <p className="text-xs text-muted-foreground">Tekanan</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Cloud className="h-8 w-8 text-slate-500" />
            <p className="mt-2 text-lg font-bold">{data.details.cloudCover}%</p>
            <p className="text-xs text-muted-foreground">Tutupan Awan</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Eye className="h-8 w-8 text-green-400" />
            <p className="mt-2 text-lg font-bold">{data.details.visibility} km</p>
            <p className="text-xs text-muted-foreground">Visibilitas</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Sun className="h-8 w-8 text-yellow-300" />
            <p className="mt-2 text-lg font-bold">{data.details.uvIndex}</p>
            <p className="text-xs text-muted-foreground">Indeks UV</p>
          </div>
        </div>
      </div>

    </div>
  );
}