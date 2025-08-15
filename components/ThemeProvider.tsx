// components/ThemeProvider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Ambil tipe props langsung dari komponen NextThemesProvider
type NextThemesProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}