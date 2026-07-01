"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, ArrowRight, Layers, Sparkles } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP Plugin outside component lifecycle
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Upgraded data with Images, Colors, and dynamic glowing accents
const projects = [
  {
    id: "Creative agency",
    title: "Creative Ops",
    description: "A creative agency website that showcases the company's portfolio, services, and team. Built with Next.js and TypeScript, it features a modern design, smooth animations, and responsive layouts. The backend is powered by Express and Node.js, ensuring fast performance and scalability.",
    technologies: ["React.js", "TypeScript", "Express", "Node.js", "Framer Motion"],
    github: "https://creative-ops-six.vercel.app/",
    demo: "https://creative-ops-six.vercel.app/",
    featured: true,
    image: "creative.png",
    accent: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.2)"
  },
  {
    id: "Lms platform",
    title: "Edu-Platform",
    description: "An online learning management system (LMS) providing a comprehensive platform for educators and students. Built with React and Python, it offers features like course creation, student enrollment, progress tracking, and interactive quizzes. Powered by Gemini AI.",
    technologies: ["React", "Python", "GSAP", "Node.js", "Gemini AI", "Express"],
    github: "https://edu-platform-spark-uni.vercel.app/",
    demo: "https://edu-platform-spark-uni.vercel.app/",
    featured: true,
    image: "edu.png",
    accent: "from-orange-500 to-rose-500",
    glow: "rgba(249, 115, 22, 0.2)"
  },
  {
    id: "aiassitant",
    title: "Spark AI Assistant",
    description: "A comprehensive web application platform featuring AI-powered whiteboards, collaborative tools, real-time analytics, and modern user experiences designed for remote engineering teams.",
    technologies: ["Next.js", "MongoDB", "Clerk Auth", "Tldraw", "Zustand"],
    github: "https://spark-lemon.vercel.app/",
    demo: "https://spark-lemon.vercel.app/",
    featured: false,
    image: "spark.png",
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.2)"
  }
]

// Cinematic Text Reveal Component
const RevealText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Responsive Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024) // Trigger horizontal scroll only on LG screens
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Robust GSAP Horizontal Scroll Setup
  useEffect(() => {
    if (isMobile || !containerRef.current || !sliderRef.current) return

    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".project-panel")
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          snap: 1 / (panels.length - 1), // Snaps perfectly to each project
          end: () => "+=" + sliderRef.current!.offsetWidth,
        }
      })
    }, containerRef)

    return () => ctx.revert() // Crucial for React 18 / Next.js Strict Mode
  }, [isMobile])

  // Global Noise Texture
  const NoiseTexture = () => (
    <svg className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.15] mix-blend-overlay">
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )

  // --- MOBILE / TABLET LAYOUT (Vertical Scroll) ---
  if (isMobile) {
    return (
      <section id="projects" className="py-24 relative bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
        <NoiseTexture />
        <div className="absolute inset-0 dot-grid text-foreground/[0.02] -z-10" />
        
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center mb-20">
            <RevealText delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                <Layers size={14} className="shrink-0" />
                Portfolio
              </div>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight text-foreground">
                Selected <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent italic pr-2">Works.</span>
              </h2>
            </RevealText>
          </div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <RevealText key={project.id} delay={0.1}>
                <div className="group relative rounded-[2rem] border border-border/50 bg-card/20 backdrop-blur-md overflow-hidden flex flex-col hover:border-border hover:bg-card/40 hover:shadow-2xl hover:shadow-background/20 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-border/50">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border border-border px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary">
                      0{index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 sm:p-8 relative">
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none -z-10 bg-gradient-to-br ${project.accent} opacity-20`} />
                    <h3 className="text-2xl sm:text-3xl font-black mb-4 text-foreground leading-tight tracking-tight">{project.title}</h3>
                    <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed font-light">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 text-xs font-medium text-muted-foreground backdrop-blur-sm cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <Link href={project.demo} target="_blank" className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-12 rounded-full font-bold transition-all duration-300">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link href={project.github} target="_blank" className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border hover:bg-muted text-foreground h-12 rounded-full font-bold transition-all duration-300">
                        <Github className="w-4 h-4" /> Source
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // --- DESKTOP LAYOUT (GSAP Horizontal Scroll) ---
  return (
    <section id="projects" className="bg-background overflow-hidden selection:bg-primary/20 selection:text-primary" ref={containerRef}>
      <NoiseTexture />
      <div className="absolute inset-0 dot-grid text-foreground/[0.02] -z-10" />

      {/* The scrolling track */}
      <div ref={sliderRef} className="h-screen flex flex-row w-[calc((100vw*4))]"> 
        {/* Intro Panel (Panel 1) */}
        <div className="project-panel h-screen w-screen flex flex-col justify-center items-center px-10 relative shrink-0">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
              <Sparkles size={14} className="animate-pulse" /> Showcase
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-foreground">
              Selected <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent italic pr-4">Works.</span>
            </h2>
            <div className="flex items-center justify-center gap-3 text-muted-foreground font-medium uppercase tracking-widest text-xs mt-12">
              <span className="animate-pulse">Scroll to explore</span>
              <ArrowRight className="animate-bounce-x" size={16} />
            </div>
          </div>
        </div>

        {/* Project Panels (Panels 2, 3, 4...) */}
        {projects.map((project, index) => (
          <div key={project.id} className="project-panel h-screen w-screen flex justify-center items-center shrink-0 px-10 relative">
            
            {/* Giant Ambient Glow attached to each project */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${project.accent} opacity-10 blur-[120px] rounded-full pointer-events-none -z-10`} />
            
            {/* Massive Cinematic Project Card */}
            <div className="max-w-[85vw] w-full h-[80vh] rounded-[2rem] border border-border/40 bg-card/10 backdrop-blur-2xl flex flex-row overflow-hidden shadow-2xl relative group">
              
              {/* Left Side: Full-bleed Image */}
              <div className="w-[55%] h-full relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-background/20 z-10 group-hover:opacity-0 transition-opacity duration-700" />
                <img src={project.image} alt={project.title} className="w-full h-full object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                <div className="absolute top-8 left-8 z-20">
                  <div className="bg-background/80 backdrop-blur-md border border-border px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-primary">
                    Case Study 0{index + 1}
                  </div>
                </div>
              </div>
              
              {/* Right Side: Editorial Content */}
              <div className="w-[45%] h-full p-12 lg:p-16 flex flex-col relative z-20 border-l border-border/20">
                <div className="mt-auto mb-auto">
                  <h3 className="text-5xl lg:text-6xl font-black mb-8 text-foreground group-hover:text-primary transition-colors duration-500 leading-none tracking-tighter">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-10 text-lg leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2.5 mb-12">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg border border-border/50 bg-background/30 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Fixed Footer Buttons */}
                <div className="flex gap-4 mt-auto pt-8 border-t border-border/30">
                  <Link href={project.demo} target="_blank" className="group/btn relative overflow-hidden flex-1 flex items-center justify-center gap-2 bg-foreground text-background h-14 rounded-full font-bold transition-all duration-300 shadow-xl shadow-background/5">
                    <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-primary-foreground transition-colors">
                      Live Preview <ExternalLink className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-primary -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out" />
                  </Link>
                  
                  <Link href={project.github} target="_blank" className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border hover:bg-muted text-foreground h-14 rounded-full font-bold transition-all duration-300">
                    <Github className="w-5 h-5" /> Source Code
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}