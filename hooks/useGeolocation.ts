// hooks/useGeolocation.ts
'use client';

import { useState, useCallback } from 'react'; // <-- 1. Impor useCallback

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // <-- 2. Bungkus fungsi getLocation dengan useCallback -->
  const getLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(`Gagal mendapatkan lokasi: ${err.message}`);
        setIsLoading(false);
      }
    );
  }, []); // <-- 3. Gunakan dependency array kosong

  return { coordinates, error, isLoading, getLocation };
}