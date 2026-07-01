"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Code, Sparkles, Terminal, Cpu, ChevronDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion"
import Image from "next/image"

// --- Enhanced Typewriter (Smoother Transitions) ---
const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (subIndex === texts[index].length + 1 && !reverse) {
        setReverse(true)
        return
      }
      if (subIndex === 0 && reverse) {
        setReverse(false)
        setIndex((prev) => (prev + 1) % texts.length)
        return
      }
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 40 : subIndex === texts[index].length ? 2000 : 80)
    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, texts])

  return (
    <div className="h-10 flex items-center">
      <span className="text-xl md:text-2xl font-mono text-primary dark:text-primary/80 font-medium">
        {texts[index].substring(0, subIndex)}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] h-[1.1em] bg-primary ml-1 align-middle"
        />
      </span>
    </div>
  )
}

// --- Interactive Profile Card (Tilt Effect) ---
const ProfileCard = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[4/5] max-w-[420px] mx-auto group cursor-none md:cursor-default"
    >
      <div className="absolute -inset-2 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-2xl group">
        <Image
          src="/dev.jpeg" 
          alt="Priyanshu"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        <motion.div 
          style={{ translateZ: 50 }}
          className="absolute bottom-6 left-6 right-6 p-4 glass-morphism rounded-2xl group-hover:bg-card/60 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20"><Sparkles className="text-primary size-5" /></div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Currently Building</p>
              <p className="text-sm font-semibold text-foreground">full stack web Apps</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <motion.section 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground theme-transition"
    >
      
      {/* 1. Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[150px] dark:bg-purple-400/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-blue-500/3 rounded-full blur-[100px] animate-float" />
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dot-grid" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10 top-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div style={{ y: yContent, opacity }}>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-responsive-2xl font-black dark:font-extrabold mb-6 tracking-tighter leading-[0.8]"
            >
              Hi, I'm <br />
              <span className="gradient-text-primary dark:gradient-text-primary-light">Priyanshu Rathod</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-responsive-base text-foreground/90 mb-8 max-w-2xl"
            >
              Full-Stack Developer passionate about creating innovative digital solutions that blend creativity with cutting-edge technology
            </motion.p>

            <TypewriterText texts={["MERN Stack Developer", "Problem Solver", "Innovator"]} />

            <p className="mt-8 text-muted-foreground text-lg max-w-md font-light leading-relaxed">
              Transforming complex problems into <span className="text-foreground font-medium italic">elegant digital solutions</span>. Based in India, working globally.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-10 shadow-xl shadow-primary/20 transition-all hover-scale hover-glow">
                <Link href="#projects">My Work</Link>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-full border border-border hover:bg-accent dark:border-border/50 dark:hover:bg-accent/80 group theme-transition">
                <Link href="#contact" className="flex items-center gap-2">
                  Contact <ExternalLink size={16} className="text-muted-foreground dark:text-muted-foreground/90 group-hover:text-primary dark:group-hover:text-primary/90 transition-colors" />
                </Link>
              </Button>
            </div>

            {/* Socials */}
            <div className="mt-12 flex gap-6">
              {[
                { icon: Github, href: "https://github.com/priyanshu00007" },
                { icon: Linkedin, href: "https://linkedin.com/in/priyanshu-r-b08427271" },
                { icon: Mail, href: "mailto:priyanshuratod518@gmail.com" }
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href={s.href} className="text-muted-foreground dark:text-muted-foreground/90 hover:text-primary dark:hover:text-primary/90 transition-colors p-2 rounded-lg hover:bg-accent/20 dark:hover:bg-accent/10">
                    <s.icon size={22} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block perspective-1000"
          >
            <ProfileCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={32} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </motion.div>
    </motion.section>
  )
}