`use client`
import { ThemeMode, TimeOfDay } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Button } from "../ui/button"
import { Clock, Moon, Palette, Settings, Sun } from "lucide-react"
import { ThemeSlider } from "../theme-slider"

// ThemeControl Component
export function ThemeControl({
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

  const 
  handleApplyTheme = (timeOfDay: TimeOfDay) => {
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