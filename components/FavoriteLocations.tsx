// components/FavoriteLocations.tsx
'use client';

import { useSettingsStore } from '@/hooks/useSettingsStore';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function FavoriteLocations() {
  const { favoriteCities, removeFavoriteCity } = useSettingsStore();
  const router = useRouter();

  if (favoriteCities.length === 0) {
    return null; // Jangan tampilkan apa-apa jika tidak ada favorit
  }

  const handleSelectCity = (city: string) => {
    router.push(`/?city=${encodeURIComponent(city)}`);
  };

  const handleRemoveCity = (city: string) => {
    removeFavoriteCity(city);
  };

  return (
    <div className="w-full mt-4">
      <p className="text-sm text-muted-foreground mb-2 text-center">Lokasi Favorit:</p>
      <div className="flex flex-wrap justify-center gap-2">
        <AnimatePresence>
          {favoriteCities.map(city => (
            <motion.div
              key={city}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                "group relative inline-flex h-8 items-center justify-center gap-1.5 rounded-md border bg-background px-3 shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
              )}
            >
              <span 
                onClick={() => handleSelectCity(city)} 
                className="cursor-pointer pr-5 text-sm"
              >
                {city}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCity(city)}
                className="absolute top-1/2 right-0 h-full w-6 -translate-y-1/2 text-muted-foreground opacity-0 group-hover:opacity-100"
                aria-label={`Hapus ${city}`}
              >
                <X size={12} />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}