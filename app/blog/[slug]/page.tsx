import type { Metadata } from "next"
import ClientPage from "./ClientPage"

const blogPosts = {
  "nextjs-performance": {
    title: "Optimizing Next.js Performance: A Complete Guide",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Next.js",
  },
  "react-patterns": {
    title: "Modern React Patterns Every Developer Should Know",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "React",
  },
}

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.title,
    description: `${post.title} - ${post.readTime}`,
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export default function BlogPost({ params }: Props) {
  return <ClientPage params={params} />
}
