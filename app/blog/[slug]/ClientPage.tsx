"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const blogPosts = {
  "nextjs-performance": {
    title: "Optimizing Next.js Performance: A Complete Guide",
    content: `...your markdown content...`,
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Next.js",
  },
  "react-patterns": {
    title: "Modern React Patterns Every Developer Should Know",
    content: `...your markdown content...`,
    date: "2024-01-10",
    readTime: "6 min read",
    category: "React",
  },
}

type Props = {
  params: { slug: string }
}

export default function ClientPage({ params }: Props) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) notFound()

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }} />
          </div>
        </article>
      </div>
    </div>
  )
}
