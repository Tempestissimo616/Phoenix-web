"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { skills } from "@/data/resume"
import { TimeTheme } from "@/types"

export function SkillsSection({theme} : {theme: TimeTheme} ) {

  return (
    <section className={`py-20 px-4 min-h-screen`}>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, y: -5 }}
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
                  transition={{ duration: 1.2, delay: index * 0.05 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
