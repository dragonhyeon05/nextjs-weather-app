'use client'

import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-8 w-14 rounded-full bg-slate-800" />;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div
      onClick={toggleTheme}
      // Rel atau jalur untuk tombol geser
      className={cn(
        'relative flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        theme === 'dark' ? 'bg-slate-700 justify-end' : 'bg-blue-500 justify-start'
      )}
      aria-label="Toggle theme"
    >
      {/* Tombol bulat yang bergeser */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg"
      >
        {/* Animasi ikon di dalam tombol bulat */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? (
              <Moon className="h-4 w-4 text-slate-700" />
            ) : (
              <Sun className="h-4 w-4 text-yellow-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}