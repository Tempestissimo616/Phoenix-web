"use client"

import { useEffect, useState } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
}

export function TypewriterText({ text, delay = 0, className = "" }: TypewriterTextProps) {
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
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
