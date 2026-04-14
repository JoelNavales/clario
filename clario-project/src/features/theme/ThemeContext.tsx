import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '../auth/hooks/useAuth'

export type ThemeName = 'default' | 'pink' | 'purple' | 'green' | 'orange'

export interface ThemeConfig {
  label: string
  previewColor: string
  vars: Record<string, string>
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  default: {
    label: 'Default',
    previewColor: '#1e293b',
    vars: {
      '--color-primary': 'hsl(222.2, 47.4%, 11.2%)',
      '--color-primary-foreground': 'hsl(210, 40%, 98%)',
      '--color-ring': 'hsl(222.2, 84%, 4.9%)',
    },
  },
  pink: {
    label: 'Pink',
    previewColor: '#e8487a',
    vars: {
      '--color-primary': 'hsl(336, 80%, 58%)',
      '--color-primary-foreground': 'hsl(0, 0%, 100%)',
      '--color-ring': 'hsl(336, 80%, 58%)',
    },
  },
  purple: {
    label: 'Purple',
    previewColor: '#7c3aed',
    vars: {
      '--color-primary': 'hsl(262, 83%, 58%)',
      '--color-primary-foreground': 'hsl(0, 0%, 100%)',
      '--color-ring': 'hsl(262, 83%, 58%)',
    },
  },
  green: {
    label: 'Green',
    previewColor: '#16a34a',
    vars: {
      '--color-primary': 'hsl(142, 71%, 30%)',
      '--color-primary-foreground': 'hsl(0, 0%, 100%)',
      '--color-ring': 'hsl(142, 71%, 30%)',
    },
  },
  orange: {
    label: 'Orange',
    previewColor: '#f97316',
    vars: {
      '--color-primary': 'hsl(24, 95%, 50%)',
      '--color-primary-foreground': 'hsl(0, 0%, 100%)',
      '--color-ring': 'hsl(24, 95%, 50%)',
    },
  },
}

interface ThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  setTheme: () => {},
})

function applyTheme(name: ThemeName) {
  const config = THEMES[name]
  Object.entries(config.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

function storageKey(userId: string | undefined) {
  return userId ? `clario_theme_${userId}` : null
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [theme, setThemeState] = useState<ThemeName>('default')

  // Load the correct theme whenever the logged-in user changes
  useEffect(() => {
    const key = storageKey(user?.id)
    const saved = key ? (localStorage.getItem(key) as ThemeName) : null
    const next = saved && THEMES[saved] ? saved : 'default'
    setThemeState(next)
    applyTheme(next)
  }, [user?.id])

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    const key = storageKey(user?.id)
    if (key) {
      localStorage.setItem(key, newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
