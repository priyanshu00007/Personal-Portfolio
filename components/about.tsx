"use client"

import { CardContent } from "@/components/ui/card"
import { Code, Globe, Award, Users, Brain, Target, Rocket, Sparkles, MoveRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, ReactNode, useState, MouseEvent, useEffect } from "react"

const achievements = [
  { icon: <Award />, title: "Specialization", value: "MERN Stack" },
  { icon: <Users />, title: "Impact", value: "10+" },
  { icon: <Brain />, title: "Intermediate", value: "AI/ML" },
]

const services = [
  {
    icon: <Globe />,
    title: "Full Stack Architecture",
    description: "Designing end-to-end solutions with the MERN stack, ensuring high scalability and seamless UX.",
    accent: "from-blue-500/20"
  },
  {
    icon: <Brain />,
    title: "AI Integration",
    description: "Infusing web platforms with intelligence using Python, NLP, and Predictive Analysis.",
    accent: "from-purple-500/20"
  },
  {
    icon: <Code />,
    title: "Technical Excellence",
    description: "Clean code, performance-first architecture, and modern deployment pipelines.",
    accent: "from-orange-500/20"
  },
]

// --- Responsive Spotlight Card ---
const SpotlightCard = ({ children, className }: { children: ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches)
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setOpacity(1)}
      onMouseLeave={() => !isMobile && setOpacity(0)}
      className={`relative overflow-hidden rounded-[2rem] border border-border bg-card/50 p-px transition-colors duration-500 ${className}`}
    >
      {!isMobile && (
        <div
          className="pointer-events-none absolute -inset-px transition duration-300"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139,92,246,0.15), transparent 40%)`,
            opacity,
          }}
        />
      )}
      {children}
    </div>
  )
}

const RevealText = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section id="about" ref={containerRef} className="py-20 lg:py-40 relative bg-background overflow-hidden theme-transition">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
      <div className="absolute inset-0 dot-grid text-foreground/[0.02] -z-10" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column */}
          <div className="lg:sticky lg:top-24 space-y-8 lg:space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
              >
                <Sparkles size={12} className="shrink-0" />
                About Priyanshu
              </motion.span>
              
              <RevealText>
                <h2 className="text-responsive-xl font-black text-foreground leading-[0.9] tracking-tighter mb-6">
                  Engineered <br /> 
                  <span className="text-primary italic">Precision.</span> <br className="hidden sm:block" />
                  Digital Soul.
                </h2>
              </RevealText>

              <RevealText>
                <p className="text-muted-foreground text-responsive-base font-light leading-relaxed max-w-xl">
                  I bridge the gap between <span className="text-foreground font-medium">complex backend logic</span> and <span className="text-foreground font-medium">breath-taking interfaces</span>. 
                </p>
              </RevealText>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
              {achievements.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-2xl bg-card/30 border-border/50 group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">{item.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{item.title}</div>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "2rem" }}
                    className="h-0.5 bg-primary/40 mt-2" 
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="space-y-4 lg:space-y-6">
            {services.map((service, index) => (
              <SpotlightCard key={index}>
                <CardContent className="p-8 lg:p-12 relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} to-transparent flex items-center justify-center text-foreground mb-6`}>
                    {service.icon}
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-foreground mb-3 tracking-tight">{service.title}</h4>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold lg:opacity-0 lg:group-hover:opacity-100 transition-all lg:-translate-x-2 lg:group-hover:translate-x-0">
                    Explore Solution <MoveRight size={14} />
                  </div>
                </CardContent>
              </SpotlightCard>
            ))}

            {/* CTA Box */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="p-px rounded-[2rem] bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 mt-8"
            >
              <div className="bg-card rounded-[calc(2rem-1px)] p-6 sm:p-8 flex items-center justify-between group theme-transition">
                <div className="pr-4">
                  <h5 className="text-foreground font-bold text-base sm:text-lg">Next-Gen Project?</h5>
                  <p className="text-muted-foreground text-xs sm:text-sm italic">Available for collaboration</p>
                </div>
                <button className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-[0_0_15px_rgba(var(--primary),0.3)] hover-scale">
                  <Rocket size={18} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}