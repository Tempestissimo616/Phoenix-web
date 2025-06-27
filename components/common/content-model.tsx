`use client`
import { AnimatePresence, motion } from 'framer-motion'
import React, { use, useState } from 'react'
import { Button } from '../ui/button'
import { ExternalLink, X } from 'lucide-react'
import { is } from 'date-fns/locale'
import { createPortal } from 'react-dom'
import { Project } from '@/types'

const ContentModel = ({project} : {project: Project}) => {

  const [isOpen, setIsOpen] = useState(false)

    const projectData = {
    title: "TraceMyself Tracking System",
    period: "May 2025 – Present",
    description: [
        "Built a full-stack personal knowledge-tracking platform with Next.js and TypeScript to document my computer-science history, including features such as clear pagination with sorting, searchable categories, and progress tagging.",
        "Implemented secure, role-based authentication and session management with NextAuth.js.",
        "Built a dynamic, time-aware UI system with auto-theming and physics-based animations using Tailwind with Framer Motion, featuring real-time theme previews and cinematic transitions.",
        "Integrated Prisma with MySQL to model data relationships and ensure type-safe database interactions.",
        "Optimized web performance by implementing lazy loading, image compression, etc. in Next.js.",
        "Deploying to Vercel Cloud Server: Phoenix Web (Application is still in Progress...)"
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'NextAuth', 'Prisma', 'MySQL', 'Vercel']
    }

    const model = (
        <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-52"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-4xl h-[80vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-700">
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                    {project.detailTitle}
                  </h2>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        {project.period}
                      </h3>
                      <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                        {project.detailDescription?.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bullet">▪</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Skills/Tech Stack */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-800 dark:text-slate-200 hover: scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </> 
        )}
        </AnimatePresence>
    )


  return (
    <>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
            size="sm"
            variant="secondary"
            className="ml-2 bg-white/95 text-slate-900 hover:bg-white/90"
            onClick={() => setIsOpen(true)}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
            </Button>
        </motion.div>

      
        {/* <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed inset-0 z-50"
                />
            )}
        </AnimatePresence> */}
    
        {createPortal(model, document.body)}
    </>
    )

}

export default ContentModel