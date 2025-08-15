// components/WeatherMap.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapLayerControl } from './MapLayerControl'; // <-- Impor komponen baru

// Fix untuk ikon default Leaflet yang rusak dengan Next.js
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

interface WeatherMapProps {
  lat: number;
  lon: number;
  locationName: string;
}

export default function WeatherMap({ lat, lon, locationName }: WeatherMapProps) {
  return (
    <MapContainer 
        center={[lat, lon]} 
        zoom={10} 
        scrollWheelZoom={true} // <-- Kita aktifkan scroll zoom agar lebih interaktif
        style={{ height: '350px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>{locationName}</Popup>
      </Marker>
      
      {/* Tambahkan komponen kontrol lapisan di sini */}
      <MapLayerControl />
    </MapContainer>
  );
}