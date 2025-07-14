import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import BlogPreview from "@/components/blog-preview"
import Contact from "@/components/contact"
import Skills from "@/components/skills"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <BlogPreview />
      <Contact />
    </>
  )
}
