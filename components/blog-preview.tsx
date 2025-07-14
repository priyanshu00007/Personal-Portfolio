"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const blogPosts = [
  {
    id: "nextjs-15-features",
    title: "Exploring Next.js 15: Revolutionary Features for Modern Web Development",
    excerpt:
      "Deep dive into Next.js 15's groundbreaking features including React 19 support, improved caching strategies, and enhanced developer experience.",
    date: "2024-01-20",
    readTime: "12 min read",
    category: "Next.js",
    featured: true,
  },
  {
    id: "ai-development-workflow",
    title: "Integrating AI into Your Development Workflow: A Practical Guide",
    excerpt:
      "How to leverage AI tools like GitHub Copilot, ChatGPT, and custom models to supercharge your development productivity and code quality.",
    date: "2024-01-15",
    readTime: "10 min read",
    category: "AI/ML",
    featured: true,
  },
  {
    id: "cloud-architecture-patterns",
    title: "Modern Cloud Architecture Patterns for Scalable Applications",
    excerpt:
      "Exploring microservices, serverless, and event-driven architectures with real-world examples and implementation strategies.",
    date: "2024-01-10",
    readTime: "15 min read",
    category: "Cloud",
    featured: false,
  },
]

export default function BlogPreview() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-50/30 to-transparent dark:via-green-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Sharing knowledge about cutting-edge technologies, best practices, and industry insights to help developers
            build better applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {post.category}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2 text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    asChild
                  >
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
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
            <Link href="/blog">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
