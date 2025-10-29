"use client"
import React from "react"

export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
