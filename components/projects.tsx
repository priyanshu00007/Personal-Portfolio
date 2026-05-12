"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight, Layers, MoveRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
   {
    "id": "Ecommerce Website",
    "title": "Ambrosia Sweets",
    "description": "A high-end e-commerce experience for traditional Indian sweets, focusing on smooth transitions and a premium aesthetic.",
    "image": "amb.png",
    "technologies": ["Next.js", "TypeScript", "Tailwind"],
    "github": "https://github.com/priyanshu00007",
    "demo": "https://ambrosia-sweets.vercel.app/",
    "accent": "from-orange-500 to-red-500"
  },
  {
    "id": "Chatapp",
    "title": "Nexus AI Chat",
    "description": "Real-time intelligent messaging platform integrated with Gemini AI for contextual assistance and multi-modal interactions.",
    "image": "chatapp.png",
    "technologies": ["React", "Python", "Socket.io", "Gemini"],
    "github": "https://github.com/priyanshu00007",
    "demo": "https://nexus-ai-chat.vercel.app/",
    "accent": "from-blue-500 to-purple-500"
  },
  {
    "id": "Learning Platform",
    "title": "Ace It",
    "description": "An immersive educational platform with interactive learning paths and progress tracking for modern tech stacks.",
    "image": "aceit.png",
    "technologies": ["React", "Node.js", "MongoDB"],
    "github": "https://github.com/priyanshu00007",
    "demo": "https://aceit-eight.vercel.app/",
    "accent": "from-emerald-500 to-teal-500"
  },
  {
    "id": "Codiverse",
    "title": "Codie Verse",
    "description": "Hyper-connected developer ecosystem providing project insights, community events, and career opportunities.",
    "image": "codingverse.png",
    "technologies": ["Next.js", "Tailwind", "Node.js"],
    "github": "https://github.com/priyanshu00007",
    "demo": "https://codieverse.vercel.app/",
    "accent": "from-pink-500 to-indigo-500"
  }
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    )
    return () => { pin.kill() }
  }, [isMobile])

  // Mobile responsive version
  if (isMobile) {
    return (
      <section id="projects" className="py-16 relative bg-background overflow-hidden theme-transition">
        {/* Background decoration */}
        <div className="absolute inset-0 dot-grid text-foreground/[0.02]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              <Layers size={12} />
              Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-[0.9] tracking-tighter text-foreground">
              Selected <br />
              <span className="text-primary italic">Works</span>.
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              Explore my latest projects and creative solutions
            </p>
          </motion.div>

          {/* Project Cards */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br ${project.accent} opacity-5 blur-[80px] rounded-full pointer-events-none`} />
                
                <Card className="glass border-border bg-card/50 overflow-hidden shadow-2xl relative">
                  {/* Project Image */}
                  <div className="relative h-48 sm:h-64 overflow-hidden">
                    <Image
                      src={project.image.startsWith("/") ? project.image : `/${project.image}`}
                      alt={project.title}
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    
                    {/* Badge overlay */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="border-primary/30 text-primary py-1 px-3 rounded-full text-[10px] font-bold tracking-widest uppercase bg-background/80 backdrop-blur-sm">
                        0{index + 1}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl font-black mb-4 text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-bold text-muted-foreground border border-border px-2 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 flex-col sm:flex-row">
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 px-6 font-bold transition-all shadow-lg shadow-primary/20 flex-1"
                        asChild
                      >
                        <Link href={project.demo} target="_blank" className="flex items-center justify-center gap-2">
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="rounded-full h-12 px-6 font-bold border-border hover:bg-accent text-muted-foreground flex-1" 
                        asChild
                      >
                        <Link href={project.github} target="_blank" className="flex items-center justify-center gap-2">
                          <Github className="w-4 h-4" /> Code
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop horizontal scroll version
  return (
    <section id="projects" className="overflow-hidden bg-background theme-transition">
      <div ref={triggerRef} className="relative">
        <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">
          {/* Intro Slide */}
          <div className="h-screen w-[100vw] flex flex-col justify-center items-center px-10 relative">
            <div className="absolute inset-0 dot-grid text-foreground/[0.02]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-8">
                <Layers size={14} />
                Portfolio
              </div>
              <h2 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-foreground">
                Selected <br />
                <span className="text-primary italic">Works</span>.
              </h2>
              <div className="flex items-center justify-center gap-4 text-muted-foreground font-medium">
                <span>Scroll to explore</span>
                <ArrowRight className="animate-bounce-x" size={20} />
              </div>
            </motion.div>
          </div>

          {/* Project Slides */}
          {projects.map((project, index) => (
            <div key={project.id} className="h-screen w-[85vw] flex justify-center items-center flex-shrink-0 px-10 relative">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br ${project.accent} opacity-10 blur-[120px] rounded-full pointer-events-none`} />
              
              <Card className="max-w-6xl w-full h-[75vh] overflow-hidden group glass border-border bg-card/50 flex flex-col md:flex-row shadow-2xl relative">
                <div className="md:w-3/5 h-2/3 md:h-full relative overflow-hidden">
                  <Image
                    src={project.image.startsWith("/") ? project.image : `/${project.image}`}
                    alt={project.title}
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:hidden" />
                </div>
                
                <div className="md:w-2/5 p-10 flex flex-col relative z-20">
                  <div className="flex items-center justify-between mb-8">
                    <Badge variant="outline" className="border-primary/30 text-primary py-1 px-3 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      Case Study
                    </Badge>
                    <span className="text-muted-foreground font-mono text-sm leading-none">0{index + 1}</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-black mb-6 text-foreground group-hover:text-primary transition-colors leading-none tracking-tighter">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-bold text-muted-foreground border-b border-border pb-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 px-8 font-bold transition-all shadow-lg shadow-primary/20"
                      asChild
                    >
                      <Link href={project.demo} target="_blank">
                        Live Preview <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-full h-14 px-8 font-bold border-border hover:bg-accent text-muted-foreground" 
                      asChild
                    >
                      <Link href={project.github} target="_blank">
                        <Github className="w-5 h-5 mr-2" /> Source
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

