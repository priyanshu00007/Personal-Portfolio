"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Code, Sparkles, Terminal, Cpu } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000)
      return
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, Math.max(reverse ? 75 : subIndex === texts[index].length ? 1000 : 150, Math.random() * 200))

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, texts])

  return (
    <span className="inline-block min-h-[1.5em] text-primary">
      {texts[index].substring(0, subIndex)}
      <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
    </span>
  )
}

const FloatingIcon = ({ icon: Icon, delay, initialPos }: { icon: any, delay: number, initialPos: { top?: string, left?: string, right?: string, bottom?: string } }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      scale: 1,
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      opacity: { duration: 3, repeat: Infinity },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      scale: { duration: 0.5, delay }
    }}
    className="absolute pointer-events-none text-primary/20 p-4 border border-primary/10 rounded-2xl bg-primary/5 backdrop-blur-sm"
    style={initialPos}
  >
    <Icon size={32} />
  </motion.div>
)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 dot-grid text-white/[0.03]" />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] bg-glow" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] bg-glow" />
          
          {/* Floating Elements */}
          <FloatingIcon icon={Code} delay={0} initialPos={{ top: "20%", left: "15%" }} />
          <FloatingIcon icon={Terminal} delay={1} initialPos={{ top: "15%", right: "20%" }} />
          <FloatingIcon icon={Cpu} delay={2} initialPos={{ bottom: "25%", left: "20%" }} />
          <FloatingIcon icon={Sparkles} delay={1.5} initialPos={{ bottom: "20%", right: "15%" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div style={{ y, opacity }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              Available for new opportunities
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tighter text-white">
                Hi, my name is <br />
                <span className="text-glow bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent inline-flex overflow-hidden">
                  {"Priyanshu".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.5 + i * 0.05, 
                        ease: [0.33, 1, 0.68, 1] 
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
              
              <div className="text-lg sm:text-xl font-mono mb-10 h-8">
                <TypewriterText texts={["MERN Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Coder"]} />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-slate-400 text-base mb-10 max-w-lg leading-relaxed"
            >
              I build high-performance, visually stunning web applications with precision and creativity. Currently specializing in cloud-native solutions and interactive experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 px-8 text-sm font-bold transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.6)] hover:-translate-y-1"
                asChild
              >
                <Link href="#projects">Explore Work</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-12 px-8 text-sm font-bold border-primary/20 hover:bg-primary/5 transition-all duration-300"
                asChild
              >
                <Link href="#contact">Let's Talk</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex items-center gap-6"
            >
              {[
                { href: "https://github.com/priyanshu00007", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/priyanshu-r-b08427271", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:priyanshuratod518@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative"
                  aria-label={label}
                >
                  <div className="absolute -inset-2 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
                  <Icon size={22} className="text-slate-400 group-hover:text-primary transition-colors relative z-10" />
                </Link>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:block hidden"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] group">
              <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
              <div className="relative h-full w-full rounded-[40px] overflow-hidden border border-white/10 glass shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <Image
                  src="/dev.jpeg"
                  alt="Priyanshu"
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  priority
                />
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl border border-white/10 z-20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Experience</div>
                    <div className="text-lg font-bold text-white">2+ Years</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div 
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 group-hover:text-primary transition-colors">Discover</span>
            <div className="w-px h-12 bg-slate-800 relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

