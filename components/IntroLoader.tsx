"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "./hero"

/**
 * Loading Animation Only
 * Features: Pencil SVG Animation + Cycling Text Flip
 */
export default function App() {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const words = [
    "PRIYANSHU",
    "FRONTEND DEVELOPER",
    "BACKEND DEVELOPER",
    "UI/UX DESIGNER",
    "CREATIVE ENGINEER"
  ]

  useEffect(() => {
    // Cycle through titles every 1.5 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0))
    }, 1500)
    return () => clearInterval(interval)
  }, [words.length])

  useEffect(() => {
    // Hide loader after 7.5 seconds (5 cycles)
    const timer = setTimeout(() => setLoading(false), 7500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-indigo-500/30">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <style>{`
        .pencil {
          display: block;
          width: 8em;
          height: 8em;
          margin-bottom: 2rem;
        }
        .pencil__body1,
        .pencil__body2,
        .pencil__body3,
        .pencil__eraser,
        .pencil__eraser-skew,
        .pencil__point,
        .pencil__rotate,
        .pencil__stroke {
          animation-duration: 3s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .pencil__body1 { animation-name: pencilBody1; }
        .pencil__body2 { animation-name: pencilBody2; }
        .pencil__body3 { animation-name: pencilBody3; }
        .pencil__eraser { animation-name: pencilEraser; }
        .pencil__eraser-skew {
          animation-name: pencilEraserSkew;
          animation-timing-function: ease-in-out;
        }
        .pencil__point { animation-name: pencilPoint; }
        .pencil__rotate { animation-name: pencilRotate; }
        .pencil__stroke { animation-name: pencilStroke; }

        @keyframes pencilBody1 {
          from, to { stroke-dashoffset: 351.86; transform: rotate(-90deg); }
          50% { stroke-dashoffset: 150.8; transform: rotate(-225deg); }
        }
        @keyframes pencilBody2 {
          from, to { stroke-dashoffset: 406.84; transform: rotate(-90deg); }
          50% { stroke-dashoffset: 174.36; transform: rotate(-225deg); }
        }
        @keyframes pencilBody3 {
          from, to { stroke-dashoffset: 296.88; transform: rotate(-90deg); }
          50% { stroke-dashoffset: 127.23; transform: rotate(-225deg); }
        }
        @keyframes pencilEraser {
          from, to { transform: rotate(-45deg) translate(49px,0); }
          50% { transform: rotate(0deg) translate(49px,0); }
        }
        @keyframes pencilEraserSkew {
          from, 32.5%, 67.5%, to { transform: skewX(0); }
          35%, 65% { transform: skewX(-4deg); }
          37.5%, 62.5% { transform: skewX(8deg); }
          40%, 45%, 50%, 55%, 60% { transform: skewX(-15deg); }
          42.5%, 47.5%, 52.5%, 57.5% { transform: skewX(15deg); }
        }
        @keyframes pencilPoint {
          from, to { transform: rotate(-90deg) translate(49px,-30px); }
          50% { transform: rotate(-225deg) translate(49px,-30px); }
        }
        @keyframes pencilRotate {
          from { transform: translate(100px,100px) rotate(0); }
          to { transform: translate(100px,100px) rotate(720deg); }
        }
        @keyframes pencilStroke {
          from { stroke-dashoffset: 439.82; transform: translate(100px,100px) rotate(-113deg); }
          50% { stroke-dashoffset: 164.93; transform: translate(100px,100px) rotate(-113deg); }
          75%, to { stroke-dashoffset: 439.82; transform: translate(100px,100px) rotate(112deg); }
        }
      `}</style>

      {/* Pencil SVG Animation */}
      <div className="relative">
        <svg className="pencil" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="pencil-eraser">
              <rect rx="5" ry="5" width="30" height="30"></rect>
            </clipPath>
          </defs>
          <circle className="pencil__stroke" r="70" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="439.82 439.82" strokeDashoffset="439.82" strokeLinecap="round" />
          <g className="pencil__rotate">
            <g fill="none">
              <circle className="pencil__body1" r="64" stroke="hsl(223,90%,50%)" strokeWidth="30" strokeDasharray="402.12 402.12" strokeDashoffset="402" />
              <circle className="pencil__body2" r="74" stroke="hsl(223,90%,60%)" strokeWidth="10" strokeDasharray="464.96 464.96" strokeDashoffset="465" />
              <circle className="pencil__body3" r="54" stroke="hsl(223,90%,40%)" strokeWidth="10" strokeDasharray="339.29 339.29" strokeDashoffset="339" />
            </g>
            <g className="pencil__eraser">
              <g className="pencil__eraser-skew">
                <rect fill="hsl(223,90%,70%)" rx="5" ry="5" width="30" height="30" />
                <rect fill="hsl(223,90%,60%)" width="5" height="30" clipPath="url(#pencil-eraser)" />
                <rect fill="hsl(223,10%,90%)" width="30" height="20" />
                <rect fill="hsl(223,10%,70%)" width="15" height="20" />
                <rect fill="hsl(223,10%,80%)" width="5" height="20" />
                <rect fill="hsla(223,10%,10%,0.2)" y="6" width="30" height="2" />
                <rect fill="hsla(223,10%,10%,0.2)" y="13" width="30" height="2" />
              </g>
            </g>
            <g className="pencil__point">
              <polygon fill="hsl(33,90%,70%)" points="15 0,30 30,0 30" />
              <polygon fill="hsl(33,90%,50%)" points="15 0,6 30,0 30" />
              <polygon fill="hsl(223,10%,10%)" points="15 0,20 10,10 10" />
            </g>
          </g>
        </svg>
      </div>

      {/* Cycling Flip Text */}
      <div className="h-16 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[index]}
            initial={{ y: "100%", opacity: 0, rotateX: -90 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            exit={{ y: "-100%", opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="text-foreground font-black tracking-widest text-xl md:text-4xl uppercase text-center"
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Decorative Line */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-foreground/10">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-primary origin-left"
        />
      </div>
          </motion.div>
        ) : (
          <Hero key="hero" />
        )}
      </AnimatePresence>
    </div>
  )
}