// app/page.tsx
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UltimateWeatherData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/SearchForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsToggle } from '@/components/SettingsToggle';
import { ArrowRight, LoaderCircle, MapPin } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { WeatherSkeleton } from "@/components/WeatherSkeleton";
import { CurrentWeatherDisplay } from "@/components/CurrentWeatherDisplay";
import { FavoriteLocations } from '@/components/FavoriteLocations';

export default function WeatherPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const [data, setData] = useState<UltimateWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { coordinates, error: geoError, isLoading: isGeoLoading, getLocation } = useGeolocation();

  useEffect(() => {
    const fetchData = async (apiUrl: string) => {
      setIsLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || `Lokasi tidak ditemukan.`);
        }
        setData(result);
        if (coordinates && !city) {
          router.replace(`/?city=${encodeURIComponent(result.location.name)}`, { scroll: false });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (city) {
      fetchData(`/api/weather/${city}`);
    } else if (coordinates) {
      fetchData(`/api/weather/by-coords?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
    } else if (!isGeoLoading && !geoError) {
      getLocation();
    }
  }, [city, coordinates, router, geoError, isGeoLoading, getLocation]);
  
  useEffect(() => {
    if (geoError && !city && !coordinates) {
        router.replace('/?city=Jakarta', { scroll: false });
    }
  }, [geoError, city, router, coordinates]);

  const displayCityName = data?.location?.name || city || 'Memuat Lokasi...';

  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-between p-6 sm:p-8 bg-background text-foreground overflow-y-auto transition-colors duration-300">
      {/* BAGIAN ATAS: PENCARIAN & KONTROL */}
      <div className="w-full max-w-md flex-shrink-0">
        <div className="flex items-center gap-2">
            <SearchForm />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => router.push('/')}
              disabled={isGeoLoading}
              className="rounded-full h-12 w-12 flex-shrink-0"
              aria-label="Gunakan lokasi saat ini"
            >
              {isGeoLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
            </Button>
            <ThemeToggle />
        </div>
        <SettingsToggle />
      </div>

      {/* BAGIAN KONTEN UTAMA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayCityName}
          className="flex-grow flex flex-col items-center justify-center w-full py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {(isLoading || (isGeoLoading && !city)) && !error && <WeatherSkeleton />}

          {(error || (geoError && !city)) && !isLoading && (
            <motion.p className="text-red-500 text-center text-lg mt-4" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {error || geoError}
            </motion.p>
          )}

          {data && !isLoading && (
            // Gunakan fragment <> untuk mengelompokkan beberapa komponen
            <>
              <CurrentWeatherDisplay data={data} />

              {/* POSISI BARU YANG LEBIH BAIK UNTUK LOKASI FAVORIT */}
              <div className="mt-12 w-full max-w-md">
                <FavoriteLocations />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* BAGIAN BAWAH: TOMBOL AKSI */}
      <div className="w-full max-w-md flex-shrink-0">
        {data && !error && !isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link href={`/details/${encodeURIComponent(data.location.name)}`} passHref>
              <Button variant="outline" size="lg" className="w-full text-base cursor-pointer">
                Lihat Detail Lengkap <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}