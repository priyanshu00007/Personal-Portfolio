"use client"

import { Code, Globe, Award, Users, Brain, Target, Rocket, Sparkles, ArrowRight, Layout } from "lucide-react"
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"
import { useRef, ReactNode, MouseEvent } from "react"
// Assuming you have this from shadcn. If not, replace <CardContent> with <div className="p-6 h-full flex flex-col">
import { CardContent } from "@/components/ui/card"

const achievements = [
  { icon: <Award />, title: "Specialization", value: "MERN Stack" },
  { icon: <Users />, title: "Impact", value: "10+ Projects" },
  { icon: <Brain />, title: "Intermediate", value: "AI/ML" },
]

// Now explicitly 4 Qualities
const qualities = [
  {
    icon: <Globe className="text-blue-500 w-6 h-6" />,
    title: "Full Stack Architecture",
    description: "Designing highly scalable, end-to-end solutions using the modern MERN stack.",
    accent: "bg-blue-500/10 border-blue-500/20"
  },
  {
    icon: <Brain className="text-purple-500 w-6 h-6" />,
    title: "AI Integration",
    description: "Infusing web platforms with intelligence via NLP and predictive models.",
    accent: "bg-purple-500/10 border-purple-500/20"
  },
  {
    icon: <Layout className="text-emerald-500 w-6 h-6" />,
    title: "Intuitive UI/UX",
    description: "Crafting pixel-perfect, accessible, and breathtaking user interfaces.",
    accent: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    icon: <Code className="text-orange-500 w-6 h-6" />,
    title: "Technical Excellence",
    description: "Writing clean, performance-first code with modern deployment pipelines.",
    accent: "bg-orange-500/10 border-orange-500/20"
  },
]

// --- Highly Optimized 60fps Spotlight Card ---
const SpotlightCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
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
      className={`group relative overflow-hidden rounded-[1.5rem] border border-border/50 bg-card/20 backdrop-blur-md transition-all duration-300 hover:border-border hover:bg-card/40 hover:shadow-2xl hover:shadow-background/20 h-full ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px, 
              rgba(139, 92, 246, 0.12), 
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  )
}

// --- Cinematic Text Reveal ---
const RevealText = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section id="about" ref={containerRef} className="py-24 lg:py-40 relative bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* Premium Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10 lg:space-y-12">
            <div>
              <RevealText delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                  <Sparkles size={14} className="shrink-0 animate-pulse" />
                  About Priyanshu
                </div>
              </RevealText>
              
              <RevealText delay={0.2}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-6">
                  Engineered <br /> 
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent italic pr-2">Precision.</span> <br />
                  Digital Soul.
                </h2>
              </RevealText>

              <RevealText delay={0.3}>
                <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-xl">
                  I bridge the gap between <span className="text-foreground font-medium border-b border-primary/30 pb-0.5">complex backend logic</span> and <span className="text-foreground font-medium border-b border-primary/30 pb-0.5">breath-taking interfaces</span>, creating products that don't just work, but inspire.
                </p>
              </RevealText>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {achievements.map((item, i) => (
                <RevealText key={i} delay={0.4 + (i * 0.1)}>
                  <div className="p-5 rounded-2xl bg-card/20 border border-border/40 hover:border-primary/30 hover:bg-card/40 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:-rotate-12">
                      {item.icon}
                    </div>
                    <div className="text-2xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">{item.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.title}</div>
                    <div className="h-0.5 w-0 bg-primary mt-3 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </RevealText>
              ))}
            </div>
          </div>

          {/* Right Column: 2x2 Qualities Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:mt-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {qualities.map((quality, index) => (
                <RevealText key={index} delay={0.2 + (index * 0.1)}>
                  <SpotlightCard>
                    <CardContent className="p-6 sm:p-8 relative z-10 flex flex-col h-full group">
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 shrink-0 rounded-xl border ${quality.accent} flex items-center justify-center shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                        {quality.icon}
                      </div>
                      
                      {/* Text */}
                      <h4 className="text-lg font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {quality.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-light flex-grow">
                        {quality.description}
                      </p>
                      
                      {/* Animated Link */}
                      <button className="flex items-center gap-2 text-primary text-xs font-semibold opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                        <span className="relative overflow-hidden">
                          Explore
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                        </span>
                        <ArrowRight size={14} className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
                      </button>
                    </CardContent>
                  </SpotlightCard>
                </RevealText>
              ))}
            </div>

            {/* Glowing CTA Box */}
            <RevealText delay={0.6}>
              <div className="relative group mt-4 cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-blue-500/50 rounded-[1.5rem] blur opacity-30 group-hover:opacity-70 transition duration-500 group-hover:duration-200 animate-pulse" />
                <div className="relative p-px rounded-[1.5rem] bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30">
                  <div className="bg-background/90 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-6 flex items-center justify-between transition-colors hover:bg-background/60">
                    <div>
                      <h5 className="text-foreground font-bold text-base sm:text-lg mb-1">Building a Next-Gen Project?</h5>
                      <p className="text-muted-foreground text-xs sm:text-sm font-light flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Available for collaboration
                      </p>
                    </div>
                    <button className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-[0_0_20px_rgba(var(--primary),0.4)] group-hover:scale-110 transition-transform duration-300">
                      <Rocket size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </RevealText>
            
          </div>
        </div>
      </div>
    </section>
  )
}