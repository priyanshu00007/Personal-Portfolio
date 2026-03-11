"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react"
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

  useEffect(() => {
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
  }, [])

  return (
    <section id="projects" className="overflow-hidden bg-background">
      <div ref={triggerRef} className="relative">
        <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">
          {/* Intro Slide */}
          <div className="h-screen w-[100vw] flex flex-col justify-center items-center px-10 relative">
            <div className="absolute inset-0 dot-grid text-white/[0.02]" />
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
              <h2 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
                Selected <br />
                <span className="text-primary italic">Works</span>.
              </h2>
              <div className="flex items-center justify-center gap-4 text-slate-400 font-medium">
                <span>Scroll to explore</span>
                <ArrowRight className="animate-bounce-x" size={20} />
              </div>
            </motion.div>
          </div>

          {/* Project Slides */}
          {projects.map((project, index) => (
            <div key={project.id} className="h-screen w-[85vw] flex justify-center items-center flex-shrink-0 px-10 relative">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br ${project.accent} opacity-10 blur-[120px] rounded-full pointer-events-none`} />
              
              <Card className="max-w-6xl w-full h-[75vh] overflow-hidden group glass border-white/5 bg-white/[0.02] flex flex-col md:flex-row shadow-2xl relative">
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
                    <span className="text-slate-600 font-mono text-sm leading-none">0{index + 1}</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-black mb-6 text-white group-hover:text-primary transition-colors leading-none tracking-tighter">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-8 text-lg leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-bold text-slate-500 border-b border-white/10 pb-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 px-8 font-bold transition-all shadow-lg shadow-primary/20"
                      asChild
                    >
                      <Link href={project.demo} target="_blank">
                        Live Preview <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-full h-14 px-8 font-bold border-white/10 hover:bg-white/5 text-slate-300" 
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

