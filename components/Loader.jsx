"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * MAIN APP COMPONENT
 * Manages the transition from Intro to Hero
 */
export default function Loader() {
  return <IntroPreloader />
}

/**
 * INTRO PRELOADER
 * Featuring the Pencil Animation + Cycling Titles
 */
function IntroPreloader() {
  const [index, setIndex] = useState(0)
  const [shouldHide, setShouldHide] = useState(false)
  const words = [
    "PRIYANSHU",
    "FRONTEND DEVELOPER",
    "BACKEND DEVELOPER",
    "UI/UX DESIGNER",
    "CREATIVE ENGINEER"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Hide loader after 7.5 seconds (5 cycles)
    const timer = setTimeout(() => {
      setShouldHide(true)
    }, 7500)
    return () => clearTimeout(timer)
  }, [])

  if (shouldHide) {
    return null
  }

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f0f4ff]"
    >
      <style>{`
        .pencil { display: block; width: 6em; height: 6em; margin-bottom: 2rem; }
        .pencil__body1, .pencil__body2, .pencil__body3, .pencil__eraser, .pencil__eraser-skew, .pencil__point, .pencil__rotate, .pencil__stroke {
          animation-duration: 3s; animation-timing-function: linear; animation-iteration-count: infinite;
        }
        .pencil__body1 { animation-name: pencilBody1; }
        .pencil__body2 { animation-name: pencilBody2; }
        .pencil__body3 { animation-name: pencilBody3; }
        .pencil__eraser { animation-name: pencilEraser; }
        .pencil__eraser-skew { animation-name: pencilEraserSkew; animation-timing-function: ease-in-out; }
        .pencil__point { animation-name: pencilPoint; }
        .pencil__rotate { animation-name: pencilRotate; }
        .pencil__stroke { animation-name: pencilStroke; }

        @keyframes pencilBody1 { from, to { stroke-dashoffset: 351.86; transform: rotate(-90deg); } 50% { stroke-dashoffset: 150.8; transform: rotate(-225deg); } }
        @keyframes pencilBody2 { from, to { stroke-dashoffset: 406.84; transform: rotate(-90deg); } 50% { stroke-dashoffset: 174.36; transform: rotate(-225deg); } }
        @keyframes pencilBody3 { from, to { stroke-dashoffset: 296.88; transform: rotate(-90deg); } 50% { stroke-dashoffset: 127.23; transform: rotate(-225deg); } }
        @keyframes pencilEraser { from, to { transform: rotate(-45deg) translate(49px,0); } 50% { transform: rotate(0deg) translate(49px,0); } }
        @keyframes pencilEraserSkew { from, 32.5%, 67.5%, to { transform: skewX(0); } 35%, 65% { transform: skewX(-4deg); } 37.5%, 62.5% { transform: skewX(8deg); } 40%, 45%, 50%, 55%, 60% { transform: skewX(-15deg); } 42.5%, 47.5%, 52.5%, 57.5% { transform: skewX(15deg); } }
        @keyframes pencilPoint { from, to { transform: rotate(-90deg) translate(49px,-30px); } 50% { transform: rotate(-225deg) translate(49px,-30px); } }
        @keyframes pencilRotate { from { transform: translate(100px,100px) rotate(0); } to { transform: translate(100px,100px) rotate(720deg); } }
        @keyframes pencilStroke { from { stroke-dashoffset: 439.82; transform: translate(100px,100px) rotate(-113deg); } 50% { stroke-dashoffset: 164.93; transform: translate(100px,100px) rotate(-113deg); } 75%, to { stroke-dashoffset: 439.82; transform: translate(100px,100px) rotate(112deg); } }
      `}</style>

      <svg className="pencil" viewBox="0 0 200 200">
        <circle className="pencil__stroke" r="70" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="439.82" strokeDashoffset="439.82" />
        <g className="pencil__rotate">
          <circle className="pencil__body1" r="64" fill="none" stroke="#3b82f6" strokeWidth="30" strokeDasharray="402" />
          <g className="pencil__eraser">
             <rect fill="#6366f1" rx="5" ry="5" width="30" height="30" />
             <rect fill="#e5e7eb" width="30" height="20" />
          </g>
          <g className="pencil__point">
            <polygon fill="#fbbf24" points="15 0,30 30,0 30" />
            <polygon fill="#1f2937" points="15 0,20 10,10 10" />
          </g>
        </g>
      </svg>

      <div className="h-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-black font-black tracking-widest text-xl md:text-3xl uppercase text-center"
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/**
 * 2. TYPEWRITER EFFECT
 */
const TypewriterText = ({ texts }) => {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (subIndex === texts[index].length + 1 && !reverse) {
        setReverse(true)
        return
      }
      if (subIndex === 0 && reverse) {
        setReverse(false)
        setIndex((prev) => (prev + 1) % texts.length)
        return
      }
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 40 : subIndex === texts[index].length ? 2000 : 80)
    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, texts])

  return (
    <div className="h-10 flex items-center">
      <span className="text-xl md:text-2xl font-mono text-indigo-400 font-medium">
        {texts[index].substring(0, subIndex)}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] h-[1.1em] bg-indigo-500 ml-1 align-middle"
        />
      </span>
    </div>
  )
}

/**
 * 3. INTERACTIVE PROFILE CARD
 */
const ProfileCard = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[4/5] max-w-[420px] mx-auto group"
    >
      <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
        {/* Placeholder for /dev.jpeg using a stylized SVG since external images aren't allowed */}
        <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
           <Cpu className="w-24 h-24 text-indigo-500/20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <motion.div 
          style={{ translateZ: 50 }}
          className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20"><Sparkles className="text-indigo-400 w-5 h-5" /></div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Currently Building</p>
              <p className="text-sm font-semibold text-white">Cloud-Native Apps</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
