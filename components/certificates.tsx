"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NextImage from "next/image"
import type { ReactNode } from "react"

interface Certificate {
  title: string
  issuer: string
  date: string
  image?: string
  icon?: ReactNode
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
    icon: <ShieldCheck className="text-purple-500" />,
    url: "#",
    skills: ["React", "Express", "MongoDB", "Node.js"]
  }
]

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/20 bg-primary/5 text-primary tracking-widest uppercase font-bold text-[10px]">
            Credentials
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
            Professional <span className="text-primary italic">Certifications</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            Validated expertise through industry-recognized certifications and intensive training programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity z-10">
                   <Award size={40} className="text-primary" />
                </div>
                
                <CardContent className="p-0 flex flex-col h-full">
                  {cert.image ? (
                    <div className="h-48 relative overflow-hidden bg-white/5">
                      <NextImage 
                        src={cert.image} 
                        alt={cert.title} 
                        fill 
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-48 bg-white/5 flex items-center justify-center border-b border-white/5 relative">
                      <div className="p-5 rounded-3xl bg-primary/10 text-primary shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                        {cert.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col grow">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                      <span className="font-bold text-slate-400">{cert.issuer}</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {cert.date}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {cert.skills.map(skill => (
                        <span key={skill} className="text-[10px] uppercase tracking-wider font-bold text-slate-500 border-b border-white/10 pb-1">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors group/link"
                      >
                        Verify Credential
                        <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
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
