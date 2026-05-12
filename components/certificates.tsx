"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Award, ExternalLink, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NextImage from "next/image"
import { MouseEvent } from "react"

interface Certificate {
  title: string
  issuer: string
  date: string
  image?: string
  url: string
  skills: string[]
}

const certificates: Certificate[] = [
  {
    title: "AWS Academy Graduate - Machine Learning Foundations",
    issuer: "Amazon Web Services",
    date: "March 2024",
    image: "/aws-academy-graduate-machine-learning-foundations-t.png",
    url: "https://www.credly.com/badges/31da00bc-d51a-43d4-bb01-9e891728492b/public_url",
    skills: ["Machine Learning", "AWS SageMaker", "Data Science"]
  },
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "Feb 2024",
    image: "/aws-academy-graduate-cloud-foundations-training-bad.png",
    url: "#",
    skills: ["Cloud Concepts", "Security", "AWS Core Services"]
  },
  {
    title: "Complete MERN Full-Stack Dev",
    issuer: "Udemy Professional",
    date: "Jan 2024",
    image: "/UC-c3ae2669-f3e0-4251-8558-04b61d9bed9e.jpg",
    url: "#",
    skills: ["React", "Express", "MongoDB", "Node.js"]
  }
]

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-background theme-transition">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] dark:bg-blue-400/3" />
      </div>
      <div className="absolute inset-0 dot-grid text-foreground/[0.02] -z-10" />
      
      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 dark:border-border/30 bg-white/5 dark:bg-card/30 mb-6">
            <CheckCircle2 size={12} className="text-primary" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-muted-foreground/80">Verified Credentials</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black dark:font-extrabold mb-6 tracking-tighter text-foreground">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 dark:from-primary dark:to-primary/80 italic">Proof.</span>
          </h2>
          <p className="text-slate-500 dark:text-muted-foreground max-w-xl mx-auto text-lg font-light leading-relaxed">
            A curated list of industry-standard certifications validating my technical architecture and development expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificateCard({ cert, index }: { cert: Certificate; index: number }) {
  // Mouse tracking for the spotlight effect
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      <Card className="relative h-full overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 group-hover:border-primary/50 group-hover:bg-white/[0.04]">
        
        {/* SpotLight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(var(--primary-rgb), 0.15),
                transparent 80%
              )
            `,
          }}
        />

        <CardContent className="p-0 flex flex-col h-full">
          {/* Image/Icon Container */}
          <div className="aspect-video relative overflow-hidden bg-gradient-to-b from-white/[0.05] dark:from-card/10 to-transparent p-6 flex items-center justify-center">
            {cert.image ? (
              <NextImage 
                src={cert.image} 
                alt={cert.title} 
                width={200}
                height={200}
                className="object-contain z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
            ) : (
              <ShieldCheck size={64} className="text-primary z-10 opacity-50 dark:opacity-70 group-hover:opacity-100 transition-opacity" />
            )}
            
            {/* Watermark Background Icon */}
            <Award size={120} className="absolute -bottom-4 -right-4 text-white/[0.02] dark:text-foreground/5 rotate-12 group-hover:text-primary/[0.05] transition-colors duration-700" />
          </div>
          
          <div className="p-8 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-4">
               <span className="h-px w-8 bg-primary/50" />
               <p className="text-[10px] font-bold tracking-widest text-primary dark:text-primary/90 uppercase">{cert.issuer}</p>
            </div>

            <h3 className="text-xl font-bold text-white dark:text-foreground mb-3 leading-tight tracking-tight group-hover:text-primary dark:group-hover:text-primary/90 transition-colors">
              {cert.title}
            </h3>
            
            <div className="flex items-center gap-2 text-slate-500 dark:text-muted-foreground/70 text-xs mb-8">
              <Calendar size={14} className="text-primary/60 dark:text-primary/50" />
              <span className="font-medium uppercase tracking-tighter text-foreground dark:text-foreground/90">{cert.date}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {cert.skills.map(skill => (
                <span key={skill} className="px-2 py-1 rounded-md bg-white/5 dark:bg-card/30 border border-white/10 dark:border-border text-[9px] font-black dark:font-extrabold uppercase tracking-tighter text-slate-400 dark:text-muted-foreground/80 group-hover:text-slate-200 dark:group-hover:text-foreground/90 transition-colors">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto">
              <a 
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.1em] text-white/70 hover:text-primary transition-all"
              >
                Verify Credential
                <div className="p-2 rounded-full bg-white/5 group-hover/link:bg-primary group-hover/link:text-black transition-all">
                    <ExternalLink size={12} />
                </div>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}