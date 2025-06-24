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
    <section className="relative overflow-hidden py-20 px-4 min-h-screen flex items-center">
      <motion.div className="absolute inset-0 opacity-10" style={{ y: y1 }}>
        <div className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r ${theme.primary} rounded-full blur-3xl`} />
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
              className="rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
            />
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"
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
  )
}
