"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import type { TimeOfDay } from "@/types"
import { getTimeOfDayFromSlider, getSliderValueFromTimeOfDay, getThemeByTimeOfDay } from "@/utils/timeTheme"
import { useEffect, useState } from "react"


// ThemeSlider preview and apply feature
interface ThemeSliderProps {
  value: TimeOfDay
  onChange: (timeOfDay: TimeOfDay) => void
  onApply: (timeOfDay: TimeOfDay) => void
}

export function ThemeSlider({
  value,
  onChange,
  onApply,
}: {
  value: TimeOfDay
  onChange: (timeOfDay: TimeOfDay) => void
  onApply: (timeOfDay: TimeOfDay) => void
}) {
  const [previewValue, setPreviewValue] = useState(value)
  const [sliderValue, setSliderValue] = useState(getSliderValueFromTimeOfDay(value))
  const currentTheme = getThemeByTimeOfDay(previewValue)

  // apply to background
  useEffect(() => {
    setPreviewValue(value)
    setSliderValue(getSliderValueFromTimeOfDay(value))
  }, [value])

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(event.target.value)
    setSliderValue(newValue)
    const newTimeOfDay = getTimeOfDayFromSlider(newValue)
    setPreviewValue(newTimeOfDay)
    // only preview
  }

  const handleQuickSelect = (timeOfDay: TimeOfDay) => {
    setPreviewValue(timeOfDay)
    setSliderValue(getSliderValueFromTimeOfDay(timeOfDay))
    // only preview
  }

  const handleApply = () => {
    onApply(previewValue)
  }

  const hasChanges = previewValue !== value

  

  return (
    <div className="w-80 p-6 bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-white/20">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Choose Time Theme</h3>
        <p className="text-sm text-slate-600">Drag to experience different times of day</p>
      </div>

      <div className="relative mb-6">
        {/* 背景轨道 */}
        <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-amber-200 via-blue-200 via-purple-200 to-slate-300">
          {/* 活动轨道 */}
          <motion.div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${currentTheme.primary} rounded-full`}
            style={{ width: `${sliderValue}%` }}
            layout
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* sliding bar input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer z-10"
          style={{ margin: 0 }}
        />

        {/* sliding controller */}
        <motion.div
          className="absolute top-1/2 w-6 h-6 -mt-3 -ml-3 bg-white rounded-full shadow-lg border-2 border-slate-300 cursor-pointer z-20 pointer-events-none"
          style={{ left: `${sliderValue}%` }}
          whileHover={{ scale: 1.2 }}
          layout
          transition={{ duration: 0.2 }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-r ${currentTheme.primary} opacity-80`} />
        </motion.div>

        {/* 图标指示器 */}
        <div className="flex justify-between items-center mt-6">
          <motion.div
            className="flex items-center gap-2 text-amber-600"
            animate={{ scale: previewValue === "morning" ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5" />
            <span className="text-sm font-medium">Morning</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-slate-600"
            animate={{ scale: previewValue === "night" ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-medium">Night</span>
            <Moon className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* 快速选择按钮 */}
      <div className="grid grid-cols-4 gap-2 text-xs mb-4">
        {(["morning", "afternoon", "evening", "night"] as TimeOfDay[]).map((time) => (
          <motion.button
            key={time}
            onClick={() => handleQuickSelect(time)}
            className={`p-2 rounded-lg text-center transition-all ${
              previewValue === time
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

      {/* 应用主题按钮 */}
      <motion.button
        onClick={handleApply}
        className={`w-full p-4 rounded-lg text-center font-medium transition-all ${
          hasChanges
            ? `bg-gradient-to-r ${currentTheme.primary} text-white shadow-lg hover:opacity-90`
            : "bg-slate-200 text-slate-500 cursor-not-allowed"
        }`}
        whileHover={hasChanges ? { scale: 1.02 } : {}}
        whileTap={hasChanges ? { scale: 0.98 } : {}}
        disabled={!hasChanges}
        layout
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2">
          {hasChanges && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-white rounded-full" />
          )}
          <span>
            {hasChanges
              ? `Apply ${previewValue.charAt(0).toUpperCase() + previewValue.slice(1)} Theme`
              : `Current: ${value.charAt(0).toUpperCase() + value.slice(1)} Theme`}
          </span>
        </div>
      </motion.button>

      {/* 预览提示 */}
      {hasChanges && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-slate-500 text-center mt-2"
        >
          Click the button above to apply changes
        </motion.p>
      )}
    </div>
  )
}
