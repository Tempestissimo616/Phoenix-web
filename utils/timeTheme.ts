import type { TimeTheme, TimeOfDay } from "@/types"

export function getCurrentTimeTheme(): TimeTheme {
  const hour = new Date().getHours()
  return getThemeByTimeOfDay(getTimeOfDayFromHour(hour))
}

export function getTimeOfDayFromHour(hour: number): TimeOfDay {
  if (hour >= 6 && hour < 12) return "morning"
  if (hour >= 12 && hour < 18) return "afternoon"
  if (hour >= 18 && hour < 22) return "evening"
  return "night"
}

export function getThemeByTimeOfDay(timeOfDay: TimeOfDay): TimeTheme {
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
      primary: "from-indigo-400 to-purple-500",
      secondary: "from-blue-300 to-indigo-400",
      accent: "from-violet-400 to-indigo-400",
      background: "from-slate-900 via-indigo-900 to-purple-900",
      cardBackground: "bg-slate-800/80",
      textPrimary: "text-slate-100",
      textSecondary: "text-slate-300",
    },
  }

  return themes[timeOfDay]
}

export function getTimeOfDayFromSlider(value: number): TimeOfDay {
  if (value <= 25) return "morning"
  if (value <= 50) return "afternoon"
  if (value <= 75) return "evening"
  return "night"
}

export function getSliderValueFromTimeOfDay(timeOfDay: TimeOfDay): number {
  const values = {
    morning: 12.5,
    afternoon: 37.5,
    evening: 62.5,
    night: 87.5,
  }
  return values[timeOfDay]
}

export function getTimeOfDayMessage(): string {
  const hour = new Date().getHours()

  if (hour >= 6 && hour < 12) return "Good Morning! ☀️"
  if (hour >= 12 && hour < 18) return "Good Afternoon! 🌤️"
  if (hour >= 18 && hour < 22) return "Good Evening! 🌅"
  return "Good Night! 🌙"
}
