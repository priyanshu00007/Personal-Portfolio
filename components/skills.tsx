"use client"

import { Server, Database, Box, Terminal, Cpu, Layout, Sparkles } from "lucide-react"
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"
import { useRef, ReactNode, MouseEvent } from "react"

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="h-5 w-5" />,
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Redux"],
    // Spotlight and icon colors
    glowColor: "rgba(59, 130, 246, 0.15)", // Blue
    accent: "text-blue-500",
    bgAccent: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Backend",
    icon: <Server className="h-5 w-5" />,
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "GraphQL", "Socket.io"],
    glowColor: "rgba(168, 85, 247, 0.15)", // Purple
    accent: "text-purple-500",
    bgAccent: "bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Intelligence",
    icon: <Cpu className="h-5 w-5" />,
    skills: ["Python", "NumPy", "Pandas", "Scikit-Learn", "OpenAI API", "TensorFlow"],
    glowColor: "rgba(249, 115, 22, 0.15)", // Orange
    accent: "text-orange-500",
    bgAccent: "bg-orange-500/10 border-orange-500/20",
  },
  {
    title: "Database",
    icon: <Database className="h-5 w-5" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Tools",
    icon: <Terminal className="h-5 w-5" />,
    skills: ["Git", "Docker", "AWS", "Vercel", "Linux", "Postman"],
    glowColor: "rgba(244, 63, 94, 0.15)", // Rose
    accent: "text-rose-500",
    bgAccent: "bg-rose-500/10 border-rose-500/20",
  },
  {
    title: "Design",
    icon: <Box className="h-5 w-5" />,
    skills: ["Figma", "Adobe XD", "Responsive", "UI/UX Principles"],
    glowColor: "rgba(245, 158, 11, 0.15)", // Amber
    accent: "text-amber-500",
    bgAccent: "bg-amber-500/10 border-amber-500/20",
  }
]

// --- Dynamic Spotlight Card ---
const SpotlightCard = ({ children, glowColor }: { children: ReactNode, glowColor: string }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative h-full overflow-hidden rounded-[1.5rem] border border-border/50 bg-card/20 backdrop-blur-md transition-all duration-300 hover:border-border hover:bg-card/40 hover:shadow-2xl hover:shadow-background/20"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px, 
              ${glowColor}, 
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  )
}

// --- Cinematic Reveal Wrapper ---
const RevealText = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// --- Framer Motion Variants for Staggered Badges ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="skills" ref={sectionRef} className="py-24 lg:py-40 relative overflow-hidden bg-background selection:bg-primary/20 selection:text-primary">
      
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 dot-grid text-foreground/[0.02] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <RevealText delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
              <Sparkles size={14} className="shrink-0 animate-pulse" />
              Technical Stack
            </div>
          </RevealText>
          
          <RevealText delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
              My <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent italic pr-2">Expertise.</span>
            </h2>
          </RevealText>
          
          <RevealText delay={0.3}>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              A specialized collection of tools and technologies I use to architect high-performance, scalable digital experiences.
            </p>
          </RevealText>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <RevealText key={category.title} delay={0.2 + (index * 0.1)}>
              <SpotlightCard glowColor={category.glowColor}>
                <div className="p-8 relative z-10 h-full flex flex-col">
                  
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 shrink-0 rounded-xl border ${category.bgAccent} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 ease-out ${category.accent}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Staggered Skills Badges */}
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-wrap gap-2.5 mt-auto"
                  >
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={badgeVariants}
                        className="px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground hover:shadow-[0_0_15px_rgba(var(--primary),0.1)] cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                </div>
              </SpotlightCard>
            </RevealText>
          ))}
        </div>
        
      </div>
    </section>
  )
}