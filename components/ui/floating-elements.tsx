"use client"

import { motion } from "framer-motion"
import type { TimeTheme } from "@/types"

interface FloatingElementsProps {
  theme: TimeTheme
}

export function FloatingElements({ theme }: FloatingElementsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r ${theme.secondary} rounded-full opacity-20`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
