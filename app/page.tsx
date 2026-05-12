import Loader from "@/components/Loader"
// import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import Contact from "@/components/contact"
import Skills from "@/components/skills"
import "@/styles/loader.css"

export default function Home() {
  return (
    <>
      <Loader />
      {/* <Hero /> */}
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </>
  )
}
