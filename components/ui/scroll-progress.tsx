"use client"

import { motion, useScroll } from "framer-motion"
import type { TimeTheme } from "@/types"

interface ScrollProgressProps {
  theme: TimeTheme
}

export function ScrollProgress({ theme }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.primary} z-40 origin-left`}
      style={{ scaleX: scrollYProgress }}
    />
  )
}
