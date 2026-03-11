"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code2, Server, Database, Box, Terminal, Cpu, Globe, Layout, Smartphone } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="h-5 w-5" />,
    skills: [ "React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Redux" ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend",
    icon: <Server className="h-5 w-5" />,
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "GraphQL", "Socket.io"],
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Intelligence",
    icon: <Cpu className="h-5 w-5" />,
    skills: ["Python", "NumPy", "Pandas", "Scikit-Learn", "OpenAI API", "TensorFlow"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Database",
    icon: <Database className="h-5 w-5" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Tools",
    icon: <Terminal className="h-5 w-5" />,
    skills: ["Git", "Docker", "AWS", "Vercel", "Linux", "Postman"],
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Design",
    icon: <Box className="h-5 w-5" />,
    skills: ["Figma", "Adobe XD", "Responsive Design", "UI/UX Principles"],
    color: "from-yellow-500 to-amber-500",
  }
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid text-white/[0.02] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            <Code2 size={14} />
            Technical Stack
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tighter text-white">
            My <span className="text-primary italic">Expertise</span>.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A specialized collection of tools and technologies I use to architect high-performance digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${category.color} opacity-30 group-hover:opacity-100 transition-opacity`} />
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-10 text-white`}>
                      {category.icon}
                    </div>
                    <span className="font-bold tracking-tight">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-white/[0.03] border-white/5 text-slate-300 hover:border-primary/50 hover:text-white transition-all duration-300 rounded-md py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
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

