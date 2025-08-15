// hooks/useSettingsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TemperatureUnit = 'celsius' | 'fahrenheit';
type WindSpeedUnit = 'ms' | 'kmh';

interface SettingsState {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  favoriteCities: string[]; // <-- TAMBAHKAN INI
  toggleTemperatureUnit: () => void;
  toggleWindSpeedUnit: () => void;
  addFavoriteCity: (city: string) => void; // <-- TAMBAHKAN INI
  removeFavoriteCity: (city: string) => void; // <-- TAMBAHKAN INI
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      temperatureUnit: 'celsius',
      windSpeedUnit: 'ms',
      favoriteCities: ['Jakarta', 'Bandung'], // <-- Data awal untuk contoh
      
      toggleTemperatureUnit: () =>
        set((state) => ({
          temperatureUnit: state.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius',
        })),
      
      toggleWindSpeedUnit: () =>
        set((state) => ({
          windSpeedUnit: state.windSpeedUnit === 'ms' ? 'kmh' : 'ms',
        })),

      // <-- Fungsi baru untuk favorit -->
      addFavoriteCity: (city) =>
        set((state) => ({
          // Hindari duplikat
          favoriteCities: state.favoriteCities.includes(city)
            ? state.favoriteCities
            : [...state.favoriteCities, city],
        })),

      removeFavoriteCity: (city) =>
        set((state) => ({
          favoriteCities: state.favoriteCities.filter((favCity) => favCity !== city),
        })),
    }),
    {
      name: 'weather-app-settings', 
    }
  )
);