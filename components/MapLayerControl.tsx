// components/MapLayerControl.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { Button } from './ui/button';
import { Cloud, CloudRain, Map } from 'lucide-react';

type WeatherLayer = 'clouds_new' | 'precipitation_new' | 'none';

export function MapLayerControl() {
  const map = useMap();
  const [activeLayer, setActiveLayer] = useState<WeatherLayer>('none');
  const layerRef = useRef<L.TileLayer | null>(null);
  
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {
    // Hapus layer yang ada sebelumnya jika ada
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    // Jika layer yang dipilih bukan 'none', tambahkan layer baru
    if (activeLayer !== 'none' && apiKey) {
      const tileUrl = `https://tile.openweathermap.org/map/${activeLayer}/{z}/{x}/{y}.png?appid=${apiKey}`;
      const newLayer = L.tileLayer(tileUrl, {
        attribution: 'Map data &copy; OpenWeatherMap',
      });
      
      layerRef.current = newLayer;
      map.addLayer(newLayer);
    }
  }, [activeLayer, map, apiKey]);

  const toggleLayer = (layer: WeatherLayer) => {
    setActiveLayer(prev => (prev === layer ? 'none' : layer));
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar p-1.5 bg-background/80 backdrop-blur-sm rounded-lg flex flex-col gap-1.5">
        <Button
            size="icon"
            variant={activeLayer === 'none' ? 'secondary' : 'ghost'}
            onClick={() => setActiveLayer('none')}
            aria-label="Peta Standar"
            className="h-9 w-9"
        >
            <Map className="h-5 w-5" />
        </Button>
        <Button
            size="icon"
            variant={activeLayer === 'clouds_new' ? 'secondary' : 'ghost'}
            onClick={() => toggleLayer('clouds_new')}
            aria-label="Lapisan Awan"
            className="h-9 w-9"
        >
            <Cloud className="h-5 w-5" />
        </Button>
        <Button
            size="icon"
            variant={activeLayer === 'precipitation_new' ? 'secondary' : 'ghost'}
            onClick={() => toggleLayer('precipitation_new')}
            aria-label="Lapisan Hujan"
            className="h-9 w-9"
        >
            <CloudRain className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}