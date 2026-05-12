"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react"

export default function Footer() {
  const [year, setYear] = useState("")

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="relative bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent mb-4">
             Priyanshu 
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground/90 mb-6 leading-relaxed">
              Mern Stack Developer passionate about creating exceptional digital experiences with cutting-edge
              technologies and innovative solutions.
            </p>
            <div className="flex space-x-4">
              {[
                { href: "https://github.com", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
                { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
                { href: "mailto:priyanshurathod518@gmil.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="p-2 rounded-xl bg-card/60 dark:bg-card/40 text-muted-foreground dark:text-muted-foreground/90 hover:text-primary hover:bg-accent transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground dark:text-foreground/95">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground dark:text-muted-foreground/90 hover:text-primary dark:hover:text-primary/90 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground dark:text-foreground/95">Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Full Stack Development",
                "Cloud Architecture",
                "Mobile Development",
                "Technical Consulting",
                "Code Review",
              ].map((service) => (
                <li key={service} className="text-muted-foreground dark:text-muted-foreground/90">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground dark:text-muted-foreground/90 flex items-center justify-center space-x-2">
            <span>&copy; {year || "2024"} Priyanshu. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Built By Priyanshu</span>
              <span>using Next.js</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
