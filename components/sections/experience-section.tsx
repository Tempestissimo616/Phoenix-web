"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { experiences } from "@/data/resume"
import { containerVariants, itemVariants } from "@/config/animations"
import { TimeTheme } from "@/types"

export function ExperienceSection({theme} : {theme: TimeTheme}) {

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
            <Briefcase className="w-8 h-8 text-purple-500" />
            <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>Work Experience</h2>
          </motion.div>
          <p className={`text-lg ${theme.textSecondary}`}>My professional journey</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-xl">
                <motion.div
                  className={`bg-gradient-to-r ${theme.primary} text-white p-6`}
                  whileHover={{ backgroundPosition: "200% center" }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{exp.title}</CardTitle>
                      <CardDescription className="text-white/80 text-lg">{exp.company}</CardDescription>
                    </div>
                    <div className="text-right text-white/80">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <CardContent className="p-6">
                  <p className={`${theme.textSecondary} mb-6 text-lg leading-relaxed`}>{exp.description}</p>

                  <div className="mb-6">
                    <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Key Achievements:</h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className={`flex items-start gap-3 ${theme.textSecondary}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className={`w-2 h-2 bg-gradient-to-r ${theme.accent} rounded-full mt-2 flex-shrink-0`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                          />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge
                            variant="secondary"
                            className={`${theme.cardBackground} ${theme.textPrimary} hover:opacity-80`}
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
