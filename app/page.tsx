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
import { ScrollProgress } from "@/components/scrollProgress"
import { ThemeControl } from "@/components/sections/theme-controller"



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
