// components/SettingsToggle.tsx
'use client';

import { useSettingsStore } from '@/hooks/useSettingsStore';
import { Button } from './ui/button';

export function SettingsToggle() {
  const { 
    temperatureUnit, 
    toggleTemperatureUnit, 
    windSpeedUnit, 
    toggleWindSpeedUnit 
  } = useSettingsStore();

  return (
    <div className="flex items-center gap-2 mt-4">
      <Button onClick={toggleTemperatureUnit} variant="outline" size="sm">
        Suhu: °{temperatureUnit === 'celsius' ? 'C' : 'F'}
      </Button>
      <Button onClick={toggleWindSpeedUnit} variant="outline" size="sm">
        Angin: {windSpeedUnit === 'ms' ? 'm/s' : 'km/h'}
      </Button>
    </div>
  );
}