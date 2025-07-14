import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { CSPHeader } from "@/components/csp-header"
import ChatApp from "./chatapp/page"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "Priyanshu -  Mern Developer",
    template: "%s | Priyanshu",
  },
  description:
    "Mern Stack Developer specializing in React, Next.js, and cloud architecture. Building exceptional digital experiences with modern technologies.",
  keywords: [
    "Mern  Stack Developer",
    "React Expert",
    "Next.js Specialist",
    "TypeScript",
    "Web Development",
    "Software Engineer",
  ],
  authors: [{ name: "Priyanshu "}],
  creator: "Priyanshu",
  publisher: "Priyanshu",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Priyanshu - Mern Full Stack Developer",
    description: "Mern Full Stack Developer specializing in React, Next.js, and cloud architecture.",
    siteName: "Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Priyanshu - Mern Stack Developer",
      },
    ],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Priyanshu ",
  jobTitle: "Mern Stack Developer",
  description:""
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} `}>
      <head>
        <CSPHeader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-segoe antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <Navigation />
            <main className="relative">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
