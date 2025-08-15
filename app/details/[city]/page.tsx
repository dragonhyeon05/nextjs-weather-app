// app/details/[city]/page.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { UltimateWeatherData } from "@/lib/types"; // Tipe untuk forecast
import { DetailsDisplay } from "@/components/DetailsDisplay";
import { ForecastDisplay } from "@/components/ForecastDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { getWeatherIcon } from "@/lib/utils";
import { motion } from "framer-motion";
import MapDisplay from '@/components/MapDisplay';
import { DailyRainChart } from '@/components/ui/DailyRainChart';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function DetailsPage() {
  const params = useParams();
  const [forecastData, setForecastData] = useState<UltimateWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const city = decodeURIComponent(params.city as string);

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setForecastData(null);

      try {
        // Ambil data forecast
        const response = await fetch(`/api/weather/${city}?detail=true`);
        
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || `Gagal memuat data.`);
        }
        
        setForecastData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [city]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-background text-foreground">
        <LoaderCircle className="h-16 w-16 animate-spin text-blue-500" />
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-background text-foreground">
        <h2 className="text-2xl font-bold">Gagal Memuat Detail</h2>
        <p className="text-red-500">{error}</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
          </Button>
        </Link>
      </div>
    );
  }

  const data = forecastData;
  if (!data) return null; // Handle case data kosong

  const location = data.location;
  const currentCondition = data.current.description;
  const currentTemp = data.current.temp;
  const CurrentWeatherIcon = getWeatherIcon(currentCondition);

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-6 sm:p-8 bg-background text-foreground overflow-y-auto">
      <motion.div 
        className="w-full max-w-4xl flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="w-full flex justify-between items-center mb-6">
          <Link href="/" passHref>
            <Button variant="outline" className="cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center sm:justify-start w-full mb-8">
          <CurrentWeatherIcon className="w-28 h-28 text-blue-500 dark:text-blue-300" />
          <div className="ml-6 text-center sm:text-left">
            <h1 className="text-5xl font-extrabold text-blue-500 dark:text-blue-300">{location.name}</h1>
            <p className="text-2xl text-muted-foreground capitalize">{currentCondition}</p>
            <p className="text-xl font-semibold mt-2">{currentTemp.toFixed(1)}°C</p>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="w-full space-y-12">
          {forecastData && (
            <>
              <ForecastDisplay data={forecastData} />
              <hr className="border-border" />
              <DailyRainChart data={forecastData} />
              <hr className="border-border" />
              <DetailsDisplay data={forecastData} />
            </>
          )}
          
          {/* Tampilkan peta jika ada koordinat (hanya dari data forecast) */}
          {forecastData?.location.lat && forecastData?.location.lon && (
            <>
              <hr className="border-border" />
              <MapDisplay lat={forecastData.location.lat} lon={forecastData.location.lon} locationName={location.name} />
            </>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}