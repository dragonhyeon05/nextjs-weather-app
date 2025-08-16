'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Combobox } from '@headlessui/react';
import { cn } from "@/lib/utils";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') ?? 'Jakarta';
  
  // Tambahkan ref untuk mengontrol input field
  const inputRef = useRef<HTMLInputElement>(null);

  const [city, setCity] = useState(initialCity);
  const [query, setQuery] = useState(initialCity);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const cityFromUrl = searchParams.get('city') ?? 'Jakarta';
    if (cityFromUrl !== city) {
      setCity(cityFromUrl);
      setQuery(cityFromUrl);
    }
  }, [searchParams, city]);

  useEffect(() => {
    // Debounce untuk mengurangi frekuensi panggilan API saat mengetik
    const timer = setTimeout(() => {
      if (query.length > 2 && query !== city) { // Hanya cari jika query berubah
        const fetchSuggestions = async () => {
          try {
            const res = await fetch(`/api/geocoding?q=${query}`);
            if (res.ok) {
              const data = await res.json();
              setSuggestions(data.map((item: { name: string, country: string }) => `${item.name}, ${item.country}`));
            } else {
              setSuggestions([]);
            }
          } catch (error) {
            console.error("Failed to fetch suggestions:", error);
            setSuggestions([]);
          }
        };
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, city]);
  
  // FUNGSI HANDLE SELECTION YANG SUDAH DIPERBARUI
  const handleSelection = (selectedCity: string | null) => {
    // Hanya proses jika nilai tidak null atau kosong
    if (selectedCity) {
      setCity(selectedCity);
      setQuery(selectedCity);
      router.push(`/?city=${encodeURIComponent(selectedCity)}`);
      setSuggestions([]);
      // Hilangkan fokus dari input
      inputRef.current?.blur();
    }
  };
  
  // FUNGSI UNTUK MENANGANI SUBMIT DENGAN ENTER
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      handleSelection(query); // Gunakan logika yang sama dengan handleSelection
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Combobox value={city} onChange={handleSelection}>
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Combobox.Input
            as={Input}
            ref={inputRef} // kaitkan ref dengan input
            name="city"
            placeholder="Cari nama kota..."
            className="pl-11 pr-4 text-base h-12 rounded-full shadow-sm focus:shadow-md transition-shadow text-slate-900 dark:text-slate-100"
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => {
              // Jika query sama dengan city, jangan tampilkan saran
              if (query === city && suggestions.length > 0) {
                setSuggestions([]);
              }
            }}
            displayValue={(c: string) => c}
            autoComplete="off"
          />
          <AnimatePresence>
            {suggestions.length > 0 && (
              <Combobox.Options
                static
                as={motion.ul}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
              >
                {suggestions.map((suggestion) => (
                  <Combobox.Option
                    key={suggestion}
                    value={suggestion}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-slate-900 dark:text-slate-100'
                      }`
                    }
                  >
                    {suggestion}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </AnimatePresence>
        </div>
      </Combobox>
    </form>
  );
}