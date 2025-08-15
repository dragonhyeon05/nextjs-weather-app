// components/MapDisplay.tsx
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function MapDisplay({ lat, lon, locationName }: { lat: number; lon: number; locationName: string }) {
  const Map = useMemo(() => dynamic(
    () => import('@/components/WeatherMap'),
    { 
      loading: () => <div className="h-[250px] w-full bg-slate-800 animate-pulse rounded-lg flex items-center justify-center"><p>Memuat Peta...</p></div>,
      ssr: false
    }
  ), []);

  return <Map lat={lat} lon={lon} locationName={locationName} />;
}