"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import type { TimeOfDay } from "@/types"
import { getTimeOfDayFromSlider, getSliderValueFromTimeOfDay, getThemeByTimeOfDay } from "@/utils/timeTheme"

interface ThemeSliderProps {
  value: TimeOfDay
  onChange: (timeOfDay: TimeOfDay) => void
}

export function ThemeSlider({ value, onChange }: ThemeSliderProps) {
  const sliderValue = getSliderValueFromTimeOfDay(value)
  const currentTheme = getThemeByTimeOfDay(value)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(event.target.value)
    const newTimeOfDay = getTimeOfDayFromSlider(newValue)
    onChange(newTimeOfDay)
  }

  const getGradientPosition = (value: number) => {
    return `${value}%`
  }

  return (
    <div className="w-80 p-6 bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-white/20">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Choose Time Theme</h3>
        <p className="text-sm text-slate-600">Drag to experience different times of day</p>
      </div>

      <div className="relative mb-6">
        {/* Slider Track */}
        <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-amber-200 via-blue-200 via-purple-200 to-indigo-800">
          {/* Active Track */}
          <motion.div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${currentTheme.primary} rounded-full`}
            style={{ width: getGradientPosition(sliderValue) }}
            layout
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer"
        />

        {/* Slider Thumb */}
        <motion.div
          className="absolute top-1/2 w-6 h-6 -mt-3 -ml-3 bg-white rounded-full shadow-lg border-2 border-slate-300 cursor-pointer"
          style={{ left: getGradientPosition(sliderValue) }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          layout
          transition={{ duration: 0.3 }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-r ${currentTheme.primary} opacity-80`} />
        </motion.div>

        {/* Icons */}
        <div className="flex justify-between items-center mt-4">
          <motion.div
            className="flex items-center gap-2 text-amber-600"
            animate={{ scale: value === "morning" ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5" />
            <span className="text-sm font-medium">Morning</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-indigo-600"
            animate={{ scale: value === "night" ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-medium">Night</span>
            <Moon className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Time Labels */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        {(["morning", "afternoon", "evening", "night"] as TimeOfDay[]).map((time) => (
          <motion.button
            key={time}
            onClick={() => onChange(time)}
            className={`p-2 rounded-lg text-center transition-all ${
              value === time
                ? `bg-gradient-to-r ${getThemeByTimeOfDay(time).primary} text-white shadow-lg`
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {time.charAt(0).toUpperCase() + time.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Current Theme Preview */}
      <motion.div
        className={`mt-4 p-3 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white text-center`}
        layout
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-medium">Current: {value.charAt(0).toUpperCase() + value.slice(1)} Theme</span>
      </motion.div>
    </div>
  )
}
