// components/ForecastDisplay.tsx
'use client';

import { UltimateWeatherData } from "@/lib/types";
import { getWeatherIcon, convertTemp } from "@/lib/utils";
import { useSettingsStore } from "@/hooks/useSettingsStore";

const DayItem = ({ day }: { day: UltimateWeatherData['forecast']['daily'][0] }) => {
  const { temperatureUnit } = useSettingsStore();
  const Icon = getWeatherIcon(day.condition);
  const date = new Date(day.date).toLocaleDateString('id-ID', { weekday: 'short' });
  const tempUnitLabel = temperatureUnit === 'celsius' ? '°' : '°F';
  
  const tempMax = convertTemp(day.tempMax, temperatureUnit).toFixed(0);
  const tempMin = convertTemp(day.tempMin, temperatureUnit).toFixed(0);

  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="text-sm font-semibold text-muted-foreground">{date}</p>
      <Icon className="h-10 w-10 text-blue-500 dark:text-blue-300" />
      <p className="text-base font-bold text-foreground">{tempMax}{tempUnitLabel} / {tempMin}{tempUnitLabel}</p>
    </div>
  );
};

export function ForecastDisplay({ data }: { data: UltimateWeatherData }) {
  if (!data.forecast?.daily || data.forecast.daily.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center text-center">
      <h3 className="text-2xl font-bold text-foreground">Ramalan 5 Hari</h3>
      <p className="text-muted-foreground mb-6">Perkiraan cuaca untuk hari-hari mendatang.</p>
      <div className="flex w-full justify-between items-center text-center">
        {data.forecast.daily.slice(0, 5).map((day, index) => (
          <DayItem key={index} day={day} />
        ))}
      </div>
    </div>
  );
}
