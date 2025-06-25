"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { Github, Linkedin, Mail, MapPin, Download } from "lucide-react"
import Image from "next/image"
import { personalInfo } from "@/data/resume"
import { getTimeOfDayMessage } from "@/utils/timeTheme"
import { floatingVariants } from "@/config/animations"
import type { TimeTheme } from "@/types"

interface HeroSectionProps {
  theme: TimeTheme
}

export function HeroSection({ theme }: HeroSectionProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])

  return (
    <section className="relative overflow-hidden py-16 px-4 min-h-screen flex items-center">
      <motion.div className="absolute inset-0 opacity-10" style={{ y: y1 }}>
        <div className={`absolute top-20 left-10 w-60 h-60 bg-gradient-to-r ${theme.primary} rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r ${theme.secondary} rounded-full blur-3xl`} />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
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
            <span className={`text-sm sm:text-base font-medium ${theme.textSecondary}`}>{getTimeOfDayMessage()}</span>
          </motion.div>

          <motion.div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-6" variants={floatingVariants} animate="animate">
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary} rounded-full blur-lg opacity-50`} />
            <Image
              src={personalInfo.avatar || "/placeholder.svg"}
              alt="Profile"
              fill
              className="rounded-full object-cover border-5 [object-position:50%_30%] shadow-2xl relative z-10"
            />
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <motion.h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent mb-3`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.div
            className={`text-base sm:text-lg md:text-xl ${theme.textSecondary} mb-6 min-h-[1.5rem]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TypewriterText text={personalInfo.title} delay={1000} />
          </motion.div>

          <motion.div
            className={`flex flex-wrap justify-center gap-4 text-sm sm:text-base ${theme.textSecondary} mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Button variant="outline" className={`${theme.cardBackground} backdrop-blur border-2 hover:bg-white/90`}>
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className={`${theme.cardBackground} backdrop-blur border-2 hover:bg-white/90`}>
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}>
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </motion.div>

          <motion.div
            className="mx-auto px-4 max-w-sm sm:max-w-xl md:max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <p className={`text-sm sm:text-base md:text-lg ${theme.textSecondary} leading-relaxed text-center`}>
              {personalInfo.bio}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
