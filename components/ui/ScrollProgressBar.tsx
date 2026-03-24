'use client'
import { useEffect, useRef } from 'react'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, scrolled / total)
      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ width: '0%' }}
      aria-hidden="true"
    />
  )
}