'use client'
import { useEffect, useRef } from 'react'

const SECTIONS = [
  {
    range: [0, 0.28],
    align: 'center' as const,
    eyebrow: 'AFHEA · MSc · fCMgr · Lecturer',
    title: 'Industry.\nMeets Academia.',
  },
  {
    range: [0.32, 0.58],
    align: 'left' as const,
    eyebrow: '15+ Years',
    title: 'I build\nglobal leaders.',
  },
  {
    range: [0.62, 0.88],
    align: 'right' as const,
    eyebrow: 'From Mumbai to London',
    title: 'Bridging design\nand engineering.',
  },
]

export default function ScrollyOverlay() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = document.getElementById('scrolly-container')
    if (!container) return

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const total = container.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)

      SECTIONS.forEach((section, i) => {
        const el = refs.current[i]
        if (!el) return
        const [start, end] = section.range
        const fade = 0.06
        let opacity = 0
        let y = 0

        if (progress < start - fade) { opacity = 0; y = 20 }
        else if (progress < start) { const t = (progress - (start - fade)) / fade; opacity = t; y = 20 * (1 - t) }
        else if (progress <= end) { opacity = 1; y = 0 }
        else if (progress < end + fade) { const t = (progress - end) / fade; opacity = 1 - t; y = -20 * t }
        else { opacity = 0; y = -20 }

        el.style.opacity = String(opacity)
        el.style.transform = `translateY(${y}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const alignClass = (align: 'left' | 'center' | 'right') => {
    if (align === 'left') return 'items-start text-left pl-[8vw]'
    if (align === 'right') return 'items-end text-right pr-[8vw]'
    return 'items-center text-center'
  }

  return (
    <div style={{ height: '500vh', position: 'relative' }}>
      {SECTIONS.map((section, i) => (
        <div key={i} className="sticky top-0 h-screen w-full flex flex-col justify-center pointer-events-none" style={{ position: 'sticky' }}>
          <div
            ref={el => { refs.current[i] = el }}
            className={`w-full flex flex-col justify-center ${alignClass(section.align)} px-6`}
            style={{ opacity: 0, willChange: 'opacity, transform', transition: 'none' }}
          >
            <p style={{ fontSize: 'clamp(10px,1.2vw,13px)', color: 'rgba(255,255,255,0.7)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              {section.eyebrow}
            </p>
            <h2 style={{ fontSize: 'clamp(40px,7vw,96px)', fontFamily: 'Times New Roman, serif', fontWeight: 700, color: 'white', lineHeight: 1.0, whiteSpace: 'pre-line', textShadow: '0 2px 20px rgba(0,0,0,0.4)', marginBottom: '16px' }}>
              {section.title}
            </h2>
            <div style={{ width: '48px', height: '3px', background: '#0A66C2', borderRadius: '2px', alignSelf: section.align === 'right' ? 'flex-end' : section.align === 'center' ? 'center' : 'flex-start' }} />
          </div>
        </div>
      ))}
    </div>
  )
}