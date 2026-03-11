"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Smartphone, Award, Users, Brain, Zap, Target, Rocket } from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, ReactNode } from "react"

const achievements = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "Expertise",
    value: "MERN Stack",
    description: "Full-stack architecture",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Projects",
    value: "10+",
    description: "Delivered successfully",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Integration",
    value: "Python",
    description: "ML & Data Science",
  },
]

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Full Stack Development",
    description: "Building robust, scalable applications using MongoDB, Express, React, and Node.js.",
    accent: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI & Data Solutions",
    description: "Leveraging Python and machine learning to derive insights and automate processes.",
    accent: "from-purple-500 to-pink-500"
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Performance Optimization",
    description: "Streamlining code and architecture for maximum speed and efficiency.",
    accent: "from-orange-500 to-yellow-500"
  },
]

interface ScrollRevealProps {
  children: ReactNode;
}

const ScrollRevealLine = ({ children }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 40%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="mb-8"
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section id="about" ref={containerRef} className="py-40 relative bg-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="sticky top-40 h-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-10"
            >
              <Target size={14} className="animate-pulse" />
              Philosophy
            </motion.div>

            <div className="relative">
              <ScrollRevealLine>
                <h2 className="text-3xl sm:text-6xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
                  Crafting <span className="text-primary italic">digital</span> masterpieces.
                </h2>
              </ScrollRevealLine>
              
              <div className="space-y-12">
                <ScrollRevealLine>
                  <p className="text-slate-200 text-2xl lg:text-3xl font-medium leading-tight max-w-xl">
                    I am a dedicated MERN Stack Developer with a passion for building high-performance, accessible, and visually stunning web applications.
                  </p>
                </ScrollRevealLine>
                
                <ScrollRevealLine>
                  <p className="text-slate-400 text-xl lg:text-2xl font-medium leading-tight max-w-xl">
                    Beyond standard development, I explore the intersections of AI and web technology, integrating machine learning models with modern interfaces.
                  </p>
                </ScrollRevealLine>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24">
                {achievements.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="space-y-2 border-l border-white/10 pl-4 py-2"
                  >
                    <div className="text-3xl font-black text-white leading-none">{item.value}</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-primary">{item.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-10 mt-10 lg:mt-0">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="group glass border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 overflow-hidden relative border-l-2 hover:border-l-primary shadow-2xl">
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />
                  <CardContent className="p-10 flex flex-col md:flex-row items-start gap-8">
                    <div className={`p-5 rounded-3xl bg-gradient-to-br ${service.accent} bg-opacity-10 text-white shrink-0 group-hover:scale-110 transition-transform duration-700 shadow-xl`}>
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-4 text-white group-hover:text-primary transition-colors tracking-tight">{service.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed font-medium">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-10 p-10 rounded-3xl border border-dashed border-white/10 flex items-center justify-between group"
            >
              <div>
                <h5 className="text-white font-black text-xl mb-1 group-hover:text-primary transition-colors">Open for Collaboration</h5>
                <p className="text-slate-500 text-sm font-medium italic">Let's build something extraordinary together.</p>
              </div>
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Rocket size={20} className="group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

