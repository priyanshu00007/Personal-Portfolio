"use client"

import type { Metadata } from "next"
import ClientPage from "./ClientPage"

// This would typically come from a CMS or markdown files
const blogPosts = {
  "nextjs-performance": {
    title: "Optimizing Next.js Performance: A Complete Guide",
    content: `
# Optimizing Next.js Performance: A Complete Guide

Performance is crucial for modern web applications. In this comprehensive guide, we'll explore advanced techniques to optimize your Next.js applications and achieve perfect Lighthouse scores.

## Image Optimization

Next.js provides built-in image optimization through the \`next/image\` component:

\`\`\`jsx
import Image from 'next/image'

export default function MyComponent() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority
    />
  )
}
\`\`\`

## Code Splitting

Next.js automatically splits your code, but you can optimize further with dynamic imports:

\`\`\`jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
})
\`\`\`

## Server-Side Rendering

Leverage SSR for better performance and SEO:

\`\`\`jsx
export async function getServerSideProps() {
  const data = await fetchData()
  return { props: { data } }
}
\`\`\`

## Conclusion

By implementing these techniques, you can significantly improve your Next.js application's performance and user experience.
    `,
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Next.js",
  },
  "react-patterns": {
    title: "Modern React Patterns Every Developer Should Know",
    content: `
# Modern React Patterns Every Developer Should Know

React has evolved significantly, and with it, the patterns we use to build applications. Let's explore the most important modern React patterns.

## Custom Hooks

Custom hooks allow you to extract component logic into reusable functions:

\`\`\`jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initialValue)
  
  return { count, increment, decrement, reset }
}
\`\`\`

## Compound Components

This pattern allows you to create flexible, reusable components:

\`\`\`jsx
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  return (
    <div className="tabs">
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  )
}
\`\`\`

## Render Props

Share code between components using a prop whose value is a function:

\`\`\`jsx
function DataFetcher({ render, url }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [url])
  
  return render({ data, loading })
}
\`\`\`

These patterns will help you write more maintainable and reusable React code.
    `,
    date: "2024-01-10",
    readTime: "6 min read",
    category: "React",
  },
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: `${post.title} - ${post.readTime}`,
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default function BlogPost({ params }: Props) {
  return <ClientPage params={params} />
}
