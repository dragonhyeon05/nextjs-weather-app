// components/EnvironmentDisplay.tsx
import { UltimateWeatherData } from "@/lib/types";
import { Wind, Mountain, Brain, ShieldAlert } from 'lucide-react';

// Helper untuk memberikan nama dan deskripsi yang lebih mudah dibaca untuk polutan
const pollutantDetails: { [key: string]: { name: string; icon: React.ElementType } } = {
  co: { name: 'Karbon Monoksida', icon: Wind },
  no2: { name: 'Nitrogen Dioksida', icon: Wind },
  o3: { name: 'Ozon', icon: Mountain },
  pm2_5: { name: 'Partikel Halus (PM2.5)', icon: Brain },
  pm10: { name: 'Partikel Kasar (PM10)', icon: Brain },
};

interface EnvironmentDisplayProps {
  data: UltimateWeatherData['environment'];
}

export function EnvironmentDisplay({ data }: EnvironmentDisplayProps) {
  if (!data || !data.aqi) {
    return null;
  }

  const pollutants = Object.entries(data.pollutants).filter(
    ([key]) => pollutantDetails[key]
  );

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="flex items-center gap-3">
        <ShieldAlert className="h-7 w-7 text-green-400" />
        <h3 className="text-2xl font-bold text-foreground">Kualitas Udara</h3>
      </div>
      <p className="text-muted-foreground mb-4">
        Indeks Kualitas Udara (AQI) saat ini adalah {data.aqi} ({data.aqiDescription}).
      </p>
      
      {pollutants.length > 0 && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 mt-4">
          {pollutants.map(([key, value]) => {
            const detail = pollutantDetails[key];
            const Icon = detail.icon;
            return (
              <div key={key} className="flex flex-col items-center text-center">
                <Icon className="h-8 w-8 text-slate-400" />
                <p className="mt-2 text-lg font-bold">
                  {value.toFixed(2)}
                  <span className="text-xs"> µg/m³</span>
                </p>
                <p className="text-xs text-muted-foreground">{detail.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}