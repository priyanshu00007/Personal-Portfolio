"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Smartphone, Award, Users, Brain } from "lucide-react"
import { motion } from "framer-motion"

const achievements = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "Few Years Experience",
    description: "Building scalable web applications",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "10+ Projects Delivered",
    description: "From startups to enterprise solutions",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Open Source Contributor",
    description: "Active in the developer community",
  },
]

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Mern Stack Development",
    description: "End-to-end web application development with modern frameworks and cloud architecture.",
  },
{
  icon: <Brain className="h-8 w-8" />, // if available, otherwise use Zap or Activity
  title: "AI with Python",
  description: "Machine learning models and data processing with Python, NumPy, and scikit-learn.",
},
  {
    icon: <Code className="h-8 w-8" />,
    title: "Technical Leadership",
    description: "Leading development teams and mentoring junior developers in best practices.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-800/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate Mern stack developer with Few years of experience building scalable web applications.
            I specialize in turning complex problems into elegant, user-friendly solutions.
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">{achievement.icon}</div>
                <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">{achievement.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-slate-100">My Journey</h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
               My journey in software development has been deeply rooted in MERN stack development, where I've built end-to-end web applications using modern frameworks and cloud-native tools. 
              </p>
              <p>
               As my skills evolved, I dove into AI with Python, creating machine learning models and working with data using libraries like NumPy and scikit-learn to solve real-world problems. 
               </p> 
               <p>
               Alongside hands-on development, I’ve embraced technical leadership, mentoring junior developers, guiding teams through best practices, and ensuring high-quality code across the stack.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">{service.icon}</div>
                  <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">{service.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
