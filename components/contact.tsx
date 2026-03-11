"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone, Send, CheckCircle, MessageSquare, Sparkles, ArrowRight, Instagram, Github, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAppStore } from "@/lib/store"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const { contactFormData, setContactFormData, resetContactForm } = useAppStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setIsSubmitted(true)
        resetContactForm()
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setContactFormData({ [field]: value })
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dot-grid text-white/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-30" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left Column: Info & Content */}
          <div className="lg:w-2/5 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8">
                <MessageSquare size={12} />
                Get In Touch
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
                Let's <span className="text-primary italic">connect</span> and create.
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed font-medium">
                Whether you have a groundbreaking idea or just want to chat about the latest in tech, my inbox is always open.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  { icon: <Mail size={20} />, label: "Email", value: "priyanshurathod518@gmail.com", href: "mailto:priyanshurathod518@gmail.com" },
                  { icon: <Phone size={20} />, label: "Phone", value: "+91 97370 45170", href: "#" },
                  { icon: <MapPin size={20} />, label: "Location", value: "India / Remote Available", href: "#" }
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-0.5">{item.label}</div>
                      <div className="text-white font-bold group-hover:text-primary transition-colors">{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="text-[10px] uppercase tracking-widest font-bold text-slate-600 mb-6">Social Ecosystem</div>
                <div className="flex gap-4">
                  {[
                    { icon: <Github size={20} />, href: "https://github.com/priyanshu00007" },
                    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/priyanshu-r-b08427271" },
                    { icon: <Twitter size={20} />, href: "#" },
                    { icon: <Instagram size={20} />, href: "#" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:grow">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-3xl opacity-20 pointer-events-none" />
              
              <Card className="glass-morphism border-white/5 bg-white/[0.02] overflow-hidden rounded-[32px] relative z-10 shadow-2xl">
                <div className="p-8 sm:p-12">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center py-20"
                      >
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                          <CheckCircle size={48} className="animate-bounce" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Transmission Received.</h3>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10">
                          Thank you for reaching out. I'll deep dive into your request and get back to you within 24 cycles (hours).
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                          className="rounded-full px-10 h-12 border-white/10 hover:bg-white/5 font-bold"
                        >
                          Send another message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Identity</Label>
                            <div className="relative group">
                              <Input
                                id="name"
                                name="name"
                                required
                                placeholder="Priyanshu Rathod"
                                value={contactFormData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="h-14 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 rounded-2xl transition-all pl-5 placeholder:text-slate-600 font-medium text-white"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Communication Channel</Label>
                            <div className="relative group">
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="hello@example.com"
                                value={contactFormData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="h-14 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 rounded-2xl transition-all pl-5 placeholder:text-slate-600 font-medium text-white"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="subject" className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">Objective</Label>
                          <Input
                            id="subject"
                            name="subject"
                            required
                            placeholder="Project Collaboration / Quick Sync"
                            value={contactFormData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            className="h-14 bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 rounded-2xl transition-all pl-5 placeholder:text-slate-600 font-medium text-white"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="message" className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">The Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Tell me about your vision, the scope, or just say hello..."
                            value={contactFormData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className="bg-white/[0.03] border-white/5 focus:border-primary/50 focus:ring-primary/20 rounded-2xl transition-all p-5 placeholder:text-slate-600 font-medium text-white resize-none"
                          />
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] group overflow-hidden relative"
                            disabled={isSubmitting}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              {isSubmitting ? (
                                <>Sending <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /></>
                              ) : (
                                <>Initiate Launch <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                              )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </Button>
                        </motion.div>
                        
                        <div className="flex items-center justify-center gap-2 text-slate-500">
                          <Sparkles size={14} className="text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">End-to-end encrypted connection</span>
                        </div>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
