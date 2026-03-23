'use client'
import { useEffect, useRef } from 'react'

const OVERLAY_SECTIONS = [
  {
    id: 'overlay-1',
    scrollRange: [0, 0.28],   // visible when scroll 0–28%
    align: 'center' as const,
    eyebrow: 'Lecturer · AFHEA · MSc · fCMgr',
    headline: 'Industry.\nMeets\nAcademia.',
    sub: 'University of East London',
  },
  {
    id: 'overlay-2',
    scrollRange: [0.32, 0.58],
    align: 'left' as const,
    eyebrow: '15+ Years',
    headline: 'I build\nglobal leaders.',
    sub: 'Operations · Supply Chain · Project Management',
  },
  {
    id: 'overlay-3',
    scrollRange: [0.62, 0.88],
    align: 'right' as const,
    eyebrow: 'From Mumbai to London',
    headline: 'Bridging design\nand engineering.',
    sub: 'Teaching the real world to the next generation.',
  },
]

export default function Overlay() {
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = document.getElementById('scrolly-container')
    if (!container) return

    const onScroll = () => {
      const rect     = container.getBoundingClientRect()
      const total    = container.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)

      OVERLAY_SECTIONS.forEach((section, i) => {
        const el = overlayRefs.current[i]
        if (!el) return

        const [start, end] = section.scrollRange
        const fadeZone = 0.06

        let opacity = 0
        let y = 0

        if (progress < start - fadeZone) {
          opacity = 0; y = 20
        } else if (progress < start) {
          const t = (progress - (start - fadeZone)) / fadeZone
          opacity = t; y = 20 * (1 - t)
        } else if (progress <= end) {
          opacity = 1; y = 0
        } else if (progress < end + fadeZone) {
          const t = (progress - end) / fadeZone
          opacity = 1 - t; y = -20 * t
        } else {
          opacity = 0; y = -20
        }

        el.style.opacity  = String(opacity)
        el.style.transform = `translateY(${y}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const alignClass = (align: 'left' | 'center' | 'right') => {
    if (align === 'left')   return 'items-start text-left pl-[8vw]'
    if (align === 'right')  return 'items-end text-right pr-[8vw]'
    return 'items-center text-center'
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ height: '500vh', top: 0, zIndex: 10 }}
      aria-hidden="true"
    >
      {OVERLAY_SECTIONS.map((section, i) => (
        <div
          key={section.id}
          className="sticky top-0 h-screen w-full flex flex-col justify-center"
          style={{ position: 'sticky' }}
        >
          <div
            ref={el => { overlayRefs.current[i] = el }}
            className={`w-full flex flex-col justify-center ${alignClass(section.align)} px-6`}
            style={{ opacity: 0, transition: 'none', willChange: 'opacity, transform' }}
          >
            {/* Eyebrow */}
            <p
              className="font-sans font-600 uppercase tracking-[0.12em] mb-3"
              style={{
                fontSize: 'clamp(10px, 1.2vw, 13px)',
                color: 'rgba(255,255,255,0.7)',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              {section.eyebrow}
            </p>

            {/* Headline */}
            <h2
              className="font-serif font-bold leading-[1.0] mb-4"
              style={{
                fontSize: 'clamp(40px, 7vw, 96px)',
                color: '#FFFFFF',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                whiteSpace: 'pre-line',
              }}
            >
              {section.headline}
            </h2>

            {/* Sub */}
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(13px, 1.5vw, 17px)',
                color: 'rgba(255,255,255,0.65)',
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                maxWidth: '480px',
              }}
            >
              {section.sub}
            </p>

            {/* Accent bar */}
            <div
              className="mt-5 rounded-full"
              style={{
                width: '48px',
                height: '3px',
                background: '#0A66C2',
                boxShadow: '0 0 12px rgba(10,102,194,0.6)',
                alignSelf: section.align === 'right' ? 'flex-end' : section.align === 'center' ? 'center' : 'flex-start',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
