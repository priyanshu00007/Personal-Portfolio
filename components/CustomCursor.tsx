"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)      
  const followerRef = useRef<HTMLDivElement>(null)    
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 })

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      })
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, .cursor-pointer, input, textarea')
      
      if (isClickable) {
        gsap.to(cursor, { 
          scale: 0, 
          opacity: 0,
          duration: 0.3 
        })
        gsap.to(follower, { 
          scale: 2.5, 
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "rgba(139, 92, 246, 0.5)",
          borderWidth: "1px",
          duration: 0.3 
        })
      } else {
        gsap.to(cursor, { 
          scale: 1, 
          opacity: 1,
          duration: 0.3 
        })
        gsap.to(follower, { 
          scale: 1, 
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: "1px",
          duration: 0.3 
        })
      }
    }

    const handleMouseDown = () => {
      gsap.to(follower, { scale: 0.8, duration: 0.2 })
    }

    const handleMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.2 })
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  return (
    <div className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        ref={cursorRef}
        className="fixed w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_15px_rgba(139,92,246,1)] z-10"
      />
      <div
        ref={followerRef}
        className="fixed w-10 h-10 border border-white/30 rounded-full backdrop-blur-[1px] mix-blend-difference"
      />
    </div>
  )
}
