"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
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
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent dark:via-indigo-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your next project to life? I'd love to hear about your ideas and discuss how we can create
            something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100">Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">Message Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your name"
                          value={contactFormData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          value={contactFormData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-slate-700 dark:text-slate-300">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        placeholder="What's this about?"
                        value={contactFormData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={contactFormData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 rounded-xl"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Get in touch</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                I'm always excited to discuss new opportunities, innovative projects, or just have a conversation about
                technology and development. Let's connect!
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="h-6 w-6" />,
                  title: "Email",
                  content: "priyanshurathod518@gmail.com",
                  description: "Best way to reach me",
                },
                {
                  icon: <Phone className="h-6 w-6" />,
                  title: "Phone",
                  content: "+97370451**",
                  description: "Mail me directly",
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Location",
                  content: "India",
                  description: "Open to remote opportunities",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">{item.title}</h4>
                        <p className="text-slate-900 dark:text-slate-100 font-medium">{item.content}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/50">
              <CardContent className="p-6">
                <h4 className="font-medium mb-2 text-slate-900 dark:text-slate-100">Response Time</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  I typically respond to messages within 24 hours. For urgent inquiries, feel free to call or mention
                  "URGENT" in your subject line.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
