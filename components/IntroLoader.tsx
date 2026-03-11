"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroLoader() {
  const [loading, setLoading] = useState(true)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 dot-grid text-white/[0.02] -z-10" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-black rotate-12 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                P
              </div>
            </motion.div>
          </div>

          <div className="w-64 h-px bg-white/10 relative overflow-hidden mb-4">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(139,92,246,0.8)]"
              style={{ width: `${Math.min(counter, 100)}%` }}
            />
          </div>

          <div className="flex items-center gap-4 overflow-hidden h-12">
            <span className="text-6xl font-black tracking-tighter text-white/10 select-none">
              {Math.min(counter, 100)}
            </span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary animate-pulse">
              Architecting Digital Experiences
            </span>
          </div>

          <div className="absolute bottom-10 left-10 overflow-hidden">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-500"
            >
              Portfolio &copy; 2024
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 right-10 overflow-hidden">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-500"
            >
              Priyanshu Rathod
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
