export interface Experience {
  type: string
  title: string
  company: string
  location: string
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  achievements: string[]
  github: string
  demo: string
  color: string
  display?: boolean
}

export interface Skill {
  name: string
  level: number
}

export interface TimeTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  cardBackground: string
  textPrimary: string
  textSecondary: string
}

export type ThemeMode = "auto" | "manual"
export type TimeOfDay = "morning" | "afternoon" | "evening" | "night"
