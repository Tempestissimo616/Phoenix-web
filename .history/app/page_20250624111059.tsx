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



const FloatingElements = dynamic(() => import("@/components/FloatingElements"), {
  ssr: false, // only render on client
});



type ThemeMode = "auto" | "manual"
type TimeOfDay = "morning" | "afternoon" | "evening" | "night"



// theme editor
function getCurrentTimeTheme(): TimeTheme {
  const hour = new Date().getHours()
  return getThemeByTimeOfDay(getTimeOfDayFromHour(hour))
}

function getTimeOfDayFromHour(hour: number): TimeOfDay {
  if (hour >= 6 && hour < 12) return "morning"
  if (hour >= 12 && hour < 18) return "afternoon"
  if (hour >= 18 && hour < 22) return "evening"
  return "night"
}

function getThemeByTimeOfDay(timeOfDay: TimeOfDay): TimeTheme {
  const themes = {
    morning: {
      primary: "from-amber-400 to-orange-500",
      secondary: "from-yellow-300 to-amber-400",
      accent: "from-orange-400 to-red-400",
      background: "from-amber-50 via-orange-50 to-yellow-100",
      cardBackground: "bg-amber-50/80",
      textPrimary: "text-amber-900",
      textSecondary: "text-amber-700",
    },
    afternoon: {
      primary: "from-blue-400 to-cyan-500",
      secondary: "from-sky-300 to-blue-400",
      accent: "from-cyan-400 to-teal-400",
      background: "from-sky-50 via-blue-50 to-cyan-100",
      cardBackground: "bg-sky-50/80",
      textPrimary: "text-sky-900",
      textSecondary: "text-sky-700",
    },
    evening: {
      primary: "from-purple-400 to-pink-500",
      secondary: "from-violet-300 to-purple-400",
      accent: "from-pink-400 to-rose-400",
      background: "from-purple-50 via-pink-50 to-rose-100",
      cardBackground: "bg-purple-50/80",
      textPrimary: "text-purple-900",
      textSecondary: "text-purple-700",
    },
    night: {
      primary: "from-slate-400 to-blue-500",
      secondary: "from-slate-300 to-slate-400",
      accent: "from-blue-400 to-slate-400",
      background: "from-slate-100 via-slate-200 to-blue-100",
      cardBackground: "bg-slate-100/80",
      textPrimary: "text-slate-800",
      textSecondary: "text-slate-600",
    },
  }
  return themes[timeOfDay]
}

function getTimeOfDayFromSlider(value: number): TimeOfDay {
  if (value <= 25) return "morning"
  if (value <= 50) return "afternoon"
  if (value <= 75) return "evening"
  return "night"
}

function getSliderValueFromTimeOfDay(timeOfDay: TimeOfDay): number {
  const values = {
    morning: 12.5,
    afternoon: 37.5,
    evening: 62.5,
    night: 87.5,
  }
  return values[timeOfDay]
}

function getTimeOfDayMessage(): string {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return "Good Morning! ☀️"
  if (hour >= 12 && hour < 18) return "Good Afternoon! 🌤️"
  if (hour >= 18 && hour < 22) return "Good Evening! 🌅"
  return "Good Night! 🌙"
}

// animation setting
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants : Variants= {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
}

const floatingVariants : Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

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
          className="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer z-10"
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
      <section className="relative overflow-hidden py-20 px-4 min-h-screen flex items-center">
        <motion.div className="absolute inset-0 opacity-10" style={{ y: y1 }}>
          <div
            className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r ${theme.primary} rounded-full blur-3xl`}
          />
          <div
            className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r ${theme.secondary} rounded-full blur-3xl`}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-block px-4 py-2 rounded-full ${theme.cardBackground} backdrop-blur mb-6`}
            >
              <span className={`text-sm font-medium ${theme.textSecondary}`}>{getTimeOfDayMessage()}</span>
            </motion.div>

            <motion.div className="relative w-40 h-40 mx-auto mb-8" variants={floatingVariants} animate="animate">
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary} rounded-full blur-lg opacity-50`} />
              <Image
                src={personalInfo.avatar || "/placeholder.svg"}
                alt="Profile"
                fill
                className=" rounded-full object-cover border-5 [object-position:50%_10% shadow-2xl relative z-10 "
              />
              <motion.div
                className=" absolute -top-1 -right-0 w-7 h-7 bg-green-500 rounded-full border-4 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <motion.h1
              className={`text-6xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent mb-4`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {personalInfo.name}
            </motion.h1>

            <motion.div
              className={`text-2xl ${theme.textSecondary} mb-6 h-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <TypewriterText text={personalInfo.title} delay={1000} />
            </motion.div>

            <motion.div
              className={`flex items-center justify-center gap-8 ${theme.textSecondary} mb-8`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <MapPin className="w-5 h-5" />
                <span>{personalInfo.location}</span>
              </motion.div>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <Mail className="w-5 h-5" />
                <span>{personalInfo.email}</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className={`${theme.cardBackground} backdrop-blur border-2 hover:bg-white/90`}
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className={`${theme.cardBackground} backdrop-blur border-2 hover:bg-white/90`}
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}>
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <p className={`text-xl ${theme.textSecondary} leading-relaxed`}>{personalInfo.bio}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`py-20 px-4 ${theme.cardBackground} backdrop-blur`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
              <Sparkles className="w-8 h-8 text-blue-500" />
              <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>Skills & Expertise</h2>
            </motion.div>
            <p className={`text-lg ${theme.textSecondary}`}>Technologies I work with</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-semibold ${theme.textPrimary}`}>{skill.name}</span>
                  <span className={`text-sm ${theme.textSecondary}`}>{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${theme.primary} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
              <Briefcase className="w-8 h-8 text-purple-500" />
              <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>Work Experience</h2>
            </motion.div>
            <p className={`text-lg ${theme.textSecondary}`}>My professional journey</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-xl">
                  <motion.div
                    className={`bg-gradient-to-r ${theme.primary} text-white p-6`}
                    whileHover={{ backgroundPosition: "200% center" }}
                    style={{ backgroundSize: "200% 100%" }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl mb-2">{exp.title}</CardTitle>
                        <CardDescription className="text-white/80 text-lg">{exp.company}</CardDescription>
                      </div>
                      <div className="text-right text-white/80">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <CardContent className="p-6">
                    <p className={`${theme.textSecondary} mb-6 text-lg leading-relaxed`}>{exp.description}</p>

                    <div className="mb-6">
                      <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Key Achievements:</h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className={`flex items-start gap-3 ${theme.textSecondary}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className={`w-2 h-2 bg-gradient-to-r ${theme.accent} rounded-full mt-2 flex-shrink-0`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                            />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="secondary"
                              className={`${theme.cardBackground} ${theme.textPrimary} hover:opacity-80`}
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🎯 修改后的 Projects Section - 使用与 Experience 相同的动画 */}
      <section className={`py-20 px-4 ${theme.cardBackground}/50`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
              <Code className="w-8 h-8 text-green-500" />
              <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>Featured Projects</h2>
            </motion.div>
            <p className={`text-lg ${theme.textSecondary}`}>Selected projects I've worked on</p>
          </motion.div>

          {/* 🔄 使用与 Experience 相同的动画系统 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group"
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="relative">
                    <motion.div
                      className="relative h-64 md:h-80 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <motion.div
                        className="absolute bottom-6 left-6 right-6"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <motion.h3
                          className="text-2xl md:text-3xl font-bold text-white mb-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          {project.title}
                        </motion.h3>
                        <div className="flex gap-2 mb-4">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur text-white border-white/30 hover:bg-white/30"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  <CardContent className="p-8">
                    <motion.p
                      className={`${theme.textSecondary} mb-6 text-lg leading-relaxed`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>

                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Key Features:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className={`flex items-start gap-2 ${theme.textSecondary}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className={`w-1.5 h-1.5 bg-gradient-to-r ${theme.accent} rounded-full mt-2 flex-shrink-0`}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                            />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge variant="outline" className="text-sm hover:bg-slate-100">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
              <User className="w-8 h-8 text-blue-500" />
              <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>Let's Connect</h2>
            </motion.div>
            <p className={`text-lg ${theme.textSecondary} mb-8`}>
              Interested in working together? I'd love to hear from you.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white text-lg px-8 py-4`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
