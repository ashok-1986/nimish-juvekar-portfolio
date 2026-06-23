'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let gsap: typeof import('gsap').gsap | undefined

    const init = async () => {
      const gsapMod = await import('gsap')
      gsap = gsapMod.gsap

      if (!cursorRef.current) return

      // Pre-bind setters for maximum performance
      const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.15, ease: 'power3' })
      const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.15, ease: 'power3' })

      const onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }

      window.addEventListener('mousemove', onMouseMove)

      ctx = gsap.context(() => {}) // For cleanup if needed

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        ctx?.revert()
      }
    }
    
    // Disable on touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      init()
    }

    return () => {
      ctx?.revert()
    }
  }, [])

  useEffect(() => {
    // Add event listeners to all interactive elements to trigger hover state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if the target is a link, button, or has a specific class/dataset
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive-cursor')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive-cursor')
      ) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [pathname])

  // Don't render on mobile devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] hidden md:block"
        style={{
          backgroundColor: '#FF4103',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
          width: isHovering ? '48px' : '12px',
          height: isHovering ? '48px' : '12px',
        }}
      />
    </>
  )
}
