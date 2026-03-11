"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Home, User, Briefcase, Mail, Zap, Award } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Zap },
  { name: "Certificates", href: "#certificates", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { sidebarOpen, setSidebarOpen } = useAppStore()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 pt-6 ${
          scrolled ? "pb-2" : "pb-0"
        }`}
      >
        <div className={`max-w-5xl mx-auto transition-all duration-500 ${
          scrolled 
            ? "glass rounded-full px-6 py-3 shadow-2xl shadow-primary/10 border-white/5" 
            : "bg-transparent px-2 py-4"
        }`}>
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-black tracking-tighter flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                P
              </div>
              <span className="text-white hidden sm:block">Priyanshu.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 relative group overflow-hidden"
                >
                  <span className="relative z-10 text-slate-400 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  />
                </a>
              ))}
              <div className="ml-4 h-6 w-px bg-white/10 mx-2" />
              <ThemeToggle />
            </nav>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 rounded-full glass border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-white/5"
                aria-label="Open menu"
              >
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-3 h-0.5 bg-white rounded-full self-end mr-2.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="absolute inset-0 dot-grid text-white/[0.03]" />
            <div className="relative z-10 h-full flex flex-col p-8">
              <div className="flex justify-between items-center mb-20">
                <span className="text-xl font-black tracking-tighter text-white">MENU.</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <a
                      href={item.href}
                      className="text-5xl font-black tracking-tighter text-slate-800 hover:text-primary transition-colors block"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.name}.
                    </a>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-10 border-t border-white/5">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500 mb-6">Socials</p>
                <div className="flex gap-8">
                  {["Github", "LinkedIn", "Twitter"].map((social) => (
                    <a key={social} href="#" className="text-sm font-bold text-white hover:text-primary transition-colors">
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

