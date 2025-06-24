"use client"

import { useState, useEffect } from "react"
import type { TimeTheme, ThemeMode, TimeOfDay } from "@/types"
import { getCurrentTimeTheme, getThemeByTimeOfDay, getTimeOfDayFromHour } from "@/utils/timeTheme"

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("auto")
  const [manualTimeOfDay, setManualTimeOfDay] = useState<TimeOfDay>("morning")
  const [theme, setTheme] = useState<TimeTheme>(getCurrentTimeTheme())

  useEffect(() => {
    if (mode === "auto") {
      const currentTheme = getCurrentTimeTheme()
      setTheme(currentTheme)
    } else {
      const manualTheme = getThemeByTimeOfDay(manualTimeOfDay)
      setTheme(manualTheme)
    }
  }, [mode, manualTimeOfDay])

  useEffect(() => {
    if (mode === "auto") {
      const interval = setInterval(() => {
        const currentTheme = getCurrentTimeTheme()
        setTheme(currentTheme)
      }, 60000)

      return () => clearInterval(interval)
    }
  }, [mode])

  const toggleMode = () => {
    if (mode === "auto") {
      const hour = new Date().getHours()
      const currentTimeOfDay = getTimeOfDayFromHour(hour)
      setManualTimeOfDay(currentTimeOfDay)
      setMode("manual")
    } else {
      setMode("auto")
    }
  }

  const setManualTheme = (timeOfDay: TimeOfDay) => {
    setManualTimeOfDay(timeOfDay)
  }

  return {
    theme,
    mode,
    manualTimeOfDay,
    toggleMode,
    setManualTheme,
  }
}
