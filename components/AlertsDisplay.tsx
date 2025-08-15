// components/AlertsDisplay.tsx
import { UltimateWeatherData } from '@/lib/types';
import { TriangleAlert } from 'lucide-react';

interface AlertsDisplayProps {
  alerts: UltimateWeatherData['alerts'];
}

export function AlertsDisplay({ alerts }: AlertsDisplayProps) {
  if (!alerts || alerts.length === 0) {
    return null; // Jangan render apa pun jika tidak ada peringatan
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3 justify-center">
        <TriangleAlert className="h-7 w-7 text-yellow-400" />
        <h3 className="text-2xl font-bold text-foreground">Peringatan Cuaca</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg text-left">
            <p className="font-bold text-yellow-300">{alert.event}</p>
            <p className="text-sm text-foreground mt-1">{alert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}