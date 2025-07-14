// components/CustomCursor.js
"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)      
  const followerRef = useRef(null)    
  const hoverRingRef = useRef(null)   
  const isHoveringRef = useRef(false);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    gsap.to(cursorRef.current, {
      scale: 0, // Vanish the inner dot
      duration: 0.3
    });
    gsap.to(followerRef.current, {
      scale: 1.5, // Enlarge the follower slightly
      duration: 0.3
    });
    gsap.to(hoverRingRef.current, {
      scale: 1, // Show the outer ring
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    gsap.to(cursorRef.current, {
      scale: 1, // Bring back the inner dot
      duration: 0.3
    });
    gsap.to(followerRef.current, {
      scale: 1, // Return follower to normal size
      duration: 0.3
    });
    gsap.to(hoverRingRef.current, {
      scale: 0, // Hide the outer ring
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
  }


  useEffect(() => {
    // --- THEME AND COLOR LOGIC ---
    let followerColor = 'border-slate-900';
    let ringColor = 'border-slate-900';
    let cursorColor = 'bg-slate-900';

    const setColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      cursorColor = isDark ? 'bg-white' : 'bg-slate-900';
      followerColor = isDark ? 'border-white' : 'border-slate-900';
      ringColor = isDark ? 'border-gray-400' : 'border-gray-500'; // A slightly different color for the ring

      // Apply classes directly
      if (cursorRef.current) cursorRef.current.className = `fixed w-3 h-3 rounded-full pointer-events-none z-[9999] ${cursorColor}`;
      if (followerRef.current) followerRef.current.className = `fixed w-8 h-8 rounded-full pointer-events-none z-[9999] border ${followerColor}`;
      if (hoverRingRef.current) hoverRingRef.current.className = `fixed w-16 h-16 rounded-full pointer-events-none z-[9999] border-2 ${ringColor}`;
    }

    setColor(); // Set initial colors

    // --- CURSOR MOVEMENT LOGIC ---
    const moveCursor = (e) => {
      // Move all three elements with the mouse
      gsap.to([cursorRef.current, hoverRingRef.current], { x: e.clientX, y: e.clientY, duration: 0.2, ease: "power2.out" })
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" })
    }
    window.addEventListener('mousemove', moveCursor)

    // --- HOVER DETECTION LOGIC ---
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .cursor-pointer');
      if (target && !isHoveringRef.current) {
        handleMouseEnter();
      } else if (!target && isHoveringRef.current) {
        handleMouseLeave();
      }
    };
    document.addEventListener('mouseover', handleMouseOver);

    // --- THEME CHANGE OBSERVER ---
    const observer = new MutationObserver(setColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      observer.disconnect();
    }
  }, []);

  return (
    <>
      {/* 1. The small inner dot */}
      <div
        ref={cursorRef}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* 2. The trailing middle circle */}
      <div
        ref={followerRef}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* 3. The large outer ring (initially hidden) */}
      <div
        ref={hoverRingRef}
        className="fixed w-16 h-16 rounded-full pointer-events-none z-[9999] border-2"
        style={{ transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }}
      />
    </>
  )
}