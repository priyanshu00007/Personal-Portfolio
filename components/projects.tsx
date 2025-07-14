"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
   {
    "id": "Ecommerce Website",
    "title": "Ambrosia Sweets",
    "description": "A feature-rich e-commerce platform built designed for a seamless and performant user experience Users can browse a wide range of traditional Indian sweets, add items to the cart, and check out with ease.",
    "image": "amb.png",
    "technologies": ["Next.js", "TypeScript", "Express", "Node.js"],
    "github": "https://github.com/yourproject",
    "demo": "https://demo.com",
    "featured": true
  },
  {
    "id": "Chatapp",
    "title": "AI-Powered Chatapp",
    "description":
      "A next-gen chat application combining real-time messaging with AI assistant capabilities using Gemini API and Socket.IO. Built with a modern frontend in React and a Python + WebSocket backend, the app also supports basic voice and rate-limiting features.",
    "image": "chatapp.png",
    "technologies": ["React", "Python", "Gemini", "Node js","Socket io"],
    "github": "https://github.com",
    "demo": "https://demo.com",
    "featured": true
  },
  {
    "id": "Learning Plaoform",
    "title": "Ace it",
    "description":
      "An educational web app designed to guide students through complex tech topics with clarity. It delivers step-by-step learning paths, combining theory, quizzes, and practice problems to ensure real understanding.",
    "image": "aceit.png",
    "technologies": ["React", "Node.js", "MongoDB", "Express"],
    "github": "https://aceit-eight.vercel.app/",
    "demo": "https://aceit-eight.vercel.app/",
    "featured": true
  },
  {
    "id": "Codiverse",
    "title": "Codie Verse",
    "description": "Codiverse is a tool that can be used for learning process and can learn learning and frameworks and provide projects ideas , exploring communities and recent events and jobs oppertnities.",
    "image": "codingverse.png",
    "technologies": ["Next.js", "node js", "Tailwind CSS","json"],
    "github": "https://codieverse.vercel.app/",
    "demo": "https://codieverse.vercel.app/",
    "featured": false
  },
  {
    "id": "Market",
    "title": "coming soon",
    "description":
      "A fast, responsive, and scalable e-commerce platform built to deliver seamless online shopping experiences. Market enables users to browse products, add to cart, and place orders with ease. With a clean UI, dynamic routing, and a powerful backend, it mimics real-world online marketplaces.",
    "image": "/placeholder.svg?height=300&width=500",
    "technologies": ["Node.js", "Express", "Next js ","MongoDB"],
    "github": "",
    "demo": "",
    "featured": false
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-purple-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing innovative solutions that demonstrate technical excellence, scalability, and real-world impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600/90 text-white backdrop-blur-sm">Featured</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  {/* <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{project.metrics}</p> */}
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl" asChild>
                    <Link href={project.github}>
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                    asChild
                  >
                    <Link href={project.demo}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
            asChild
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
