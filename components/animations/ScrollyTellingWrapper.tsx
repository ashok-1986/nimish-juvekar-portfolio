'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ScrollyCanvas = dynamic(() => import('./ScrollyCanvas'), { ssr: false })

const SECTIONS = [
  {
    range: [0, 0.28] as [number, number],
    align: 'center' as const,
    eyebrow: 'AFHEA · MSc · fCMgr · Lecturer',
    title: 'Industry.\nMeets Academia.',
  },
  {
    range: [0.32, 0.58] as [number, number],
    align: 'left' as const,
    eyebrow: '15+ Years of Global Experience',
    title: 'I build\nglobal leaders.',
  },
  {
    range: [0.62, 0.88] as [number, number],
    align: 'right' as const,
    eyebrow: 'From Mumbai to London',
    title: 'Bridging design\nand engineering.',
  },
]

function TextOverlay() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Set initial opacity 0 on all text panels
    refs.current.forEach(el => {
      if (el) el.style.opacity = '0'
    })

    const onScroll = () => {
      const container = document.getElementById('scrolly-container')
      if (!container) return

      const rect = container.getBoundingClientRect()
      const total = container.offsetHeight - window.innerHeight
      if (total <= 0) return

      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)

      SECTIONS.forEach((section, i) => {
        const el = refs.current[i]
        if (!el) return
        const [start, end] = section.range
        const fade = 0.06
        let opacity = 0
        let y = 0

        if (progress < start - fade) {
          opacity = 0; y = 24
        } else if (progress < start) {
          const t = (progress - (start - fade)) / fade
          opacity = t; y = 24 * (1 - t)
        } else if (progress <= end) {
          opacity = 1; y = 0
        } else if (progress < end + fade) {
          const t = (progress - end) / fade
          opacity = 1 - t; y = -24 * t
        } else {
          opacity = 0; y = -24
        }

        el.style.opacity = String(Math.max(0, Math.min(1, opacity)))
        el.style.transform = `translateY(${y}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Small delay to ensure DOM is ready
    const timer = setTimeout(onScroll, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {SECTIONS.map((section, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:
              section.align === 'center'
                ? 'center'
                : section.align === 'left'
                ? 'flex-start'
                : 'flex-end',
            paddingLeft: section.align === 'left' ? '8vw' : '24px',
            paddingRight: section.align === 'right' ? '8vw' : '24px',
            textAlign: section.align,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 20,
            willChange: 'opacity, transform',
          }}
        >
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 1px 8px rgba(0,0,0,0.8)',
              marginBottom: '12px',
            }}
          >
            {section.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'Times New Roman, serif',
              fontSize: 'clamp(36px, 7vw, 88px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.0,
              whiteSpace: 'pre-line',
              textShadow: '0 2px 32px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.4)',
              marginBottom: '20px',
            }}
          >
            {section.title}
          </h2>
          <div
            style={{
              width: '48px',
              height: '3px',
              background: '#0A66C2',
              borderRadius: '2px',
              boxShadow: '0 0 12px rgba(10,102,194,0.8)',
            }}
          />
        </div>
      ))}
    </>
  )
}

export default function ScrollyTellingWrapper() {
  return (
    <div style={{ position: 'relative' }}>
      <ScrollyCanvas />
      <TextOverlay />
    </div>
  )
}
