"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { User, Mail } from "lucide-react"
import { TimeTheme } from "@/types"

export function ContactSection({theme} : {theme: TimeTheme}) {

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
            <User className="w-8 h-8 text-blue-500" />
            <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>Let's Connect</h2>
          </motion.div>
          <p className={`text-lg ${theme.textSecondary} mb-8`}>
            Interested in working together? I'd love to hear from you.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white text-lg px-8 py-4`}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
