"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { projects } from "@/data/resume"
import { TimeTheme } from "@/types"
import { containerVariants, itemVariants } from "@/config/animations"

export function ProjectsSection({theme} : {theme: TimeTheme}) {

  return (
    <section className={`py-20 px-4 ${theme.cardBackground}/50`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
            <Code className="w-8 h-8 text-green-500" />
            <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>Featured Projects</h2>
          </motion.div>
          <p className={`text-lg ${theme.textSecondary}`}>Selected projects I've worked on</p>
        </motion.div>

        {/* Experience */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group"
            >
              <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="relative">
                  <motion.div
                    className="relative h-64 md:h-80 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <motion.div
                      className={`absolute inset-0 opacity-20 group-hover:  transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <motion.div
                      className="absolute bottom-6 left-6 right-6"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <motion.h3
                        className="ml-2 text-2xl md:text-3xl font-bold text-white mb-2"
                        whileHover={{ scale: 1.01 }}
                      >
                        {project.title}
                      </motion.h3>
                      <div className="flex gap-2 mb-4">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="ml-2 bg-white/20 backdrop-blur text-white border-white/30 hover:bg-white/30"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <CardContent className="p-8">
                  <motion.p
                    className={`${theme.textSecondary} mb-6 text-lg leading-relaxed`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Key Features:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className={`flex items-start gap-2 ${theme.textSecondary}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className={`w-1.5 h-1.5 bg-gradient-to-r ${theme.accent} rounded-full mt-2 flex-shrink-0`}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                          />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + i * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <Badge variant="outline" className="text-sm hover:bg-slate-100">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
