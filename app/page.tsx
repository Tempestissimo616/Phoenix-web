"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  Download,
  Code,
  Briefcase,
  User,
  Sparkles,
  Settings,
  Sun,
  Moon,
  Clock,
  Palette,
} from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic";
import { experiences, personalInfo, projects, skills } from "@/data/resume"
import { TimeTheme } from "@/types"
import { getCurrentTimeTheme, getSliderValueFromTimeOfDay, getThemeByTimeOfDay, getTimeOfDayFromHour, getTimeOfDayFromSlider, getTimeOfDayMessage } from "@/utils/timeTheme"
import { HeroSection } from "@/components/sections/hero-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"


const FloatingElements = dynamic(() => import("@/components/FloatingElements"), {
  ssr: false, // only render on client
});






type ThemeMode = "auto" | "manual"
type TimeOfDay = "morning" | "afternoon" | "evening" | "night"

// typing effect
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      },
      delay + currentIndex * 50,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// themeSlider bar component
function ScrollProgress({ theme }: { theme: TimeTheme }) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.primary} z-40 origin-left`}
      style={{ scaleX: scrollYProgress }}
    />
  )
}


// ThemeSlider preview and apply feature
function ThemeSlider({
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

// 修改 ThemeControl 组件，添加 onApply 回调
function ThemeControl({
  mode,
  manualTimeOfDay,
  onToggleMode,
  onManualThemeChange,
}: {
  mode: ThemeMode
  manualTimeOfDay: TimeOfDay
  onToggleMode: () => void
  onManualThemeChange: (timeOfDay: TimeOfDay) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleApplyTheme = (timeOfDay: TimeOfDay) => {
    onManualThemeChange(timeOfDay)
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="bg-white/90 backdrop-blur text-slate-700 hover:bg-white border border-white/20 shadow-lg"
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <Settings className="w-5 h-5 mr-2" />
          </motion.div>
          Theme
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-16 right-0 z-50"
          >
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 p-6 min-w-80">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Theme Control</h3>

                <div className="flex gap-2">
                  <motion.button
                    onClick={onToggleMode}
                    className={`flex-1 p-3 rounded-xl transition-all ${
                      mode === "auto"
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Auto</span>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={onToggleMode}
                    className={`flex-1 p-3 rounded-xl transition-all ${
                      mode === "manual"
                        ? "bg-purple-500 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Palette className="w-4 h-4" />
                      <span className="text-sm font-medium">Manual</span>
                    </div>
                  </motion.button>
                </div>

                <p className="text-xs text-slate-500 mt-2 text-center">
                  {mode === "auto"
                    ? "Theme changes automatically based on time"
                    : "Choose your preferred theme manually"}
                </p>
              </div>

              <AnimatePresence>
                {mode === "manual" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ThemeSlider
                      value={manualTimeOfDay}
                      onChange={() => {}} // 不再使用这个回调
                      onApply={handleApplyTheme} // 新的应用回调
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {mode === "auto" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sun className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-medium text-slate-700">Auto Theme Active</span>
                        <Moon className="w-5 h-5 text-indigo-500" />
                      </div>
                      <p className="text-xs text-slate-600">
                        Theme automatically updates every minute based on your local time
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Theme Hook
function useTheme() {
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

// main component
export default function ResumePage() {
  const { theme, mode, manualTimeOfDay, toggleMode, setManualTheme } = useTheme()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} relative transition-all duration-1000`}>
      <ScrollProgress theme={theme} />
      <FloatingElements theme={theme} />
      <ThemeControl
        mode={mode}
        manualTimeOfDay={manualTimeOfDay}
        onToggleMode={toggleMode}
        onManualThemeChange={setManualTheme}
      />

    {/* Hero Section */}
    <HeroSection theme={theme} />


    {/* Skills Section */}
    <SkillsSection theme={theme} />
    

    {/* Experience Section */}
    <ExperienceSection theme={theme} />
      

    {/* Projects Section */}
    <ProjectsSection theme={theme} />
      

    {/* Contact Section */}
    <ContactSection theme={theme} />
      
    </div>
  )
}
