import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type FontSize = "sm" | "base" | "lg"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  defaultFontSize?: FontSize
  fontSizeStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  fontSize: "base",
  setFontSize: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  defaultFontSize = "base",
  fontSizeStorageKey = "vite-ui-fontsize",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [fontSize, setFontSize] = useState<FontSize>(
    () => (localStorage.getItem(fontSizeStorageKey) as FontSize) || defaultFontSize
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    // Remove all font size classes and add the current one
    root.classList.remove("text-sm", "text-base", "text-lg")
    // Apply a class to the root element, e.g., 'text-base'
    // Tailwind will use this to adjust sizes defined in `rem` units
    document.body.className = document.body.className.replace(/text-(sm|base|lg)/g, '');
    document.body.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    fontSize,
    setFontSize: (size: FontSize) => {
      localStorage.setItem(fontSizeStorageKey, size)
      setFontSize(size)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}