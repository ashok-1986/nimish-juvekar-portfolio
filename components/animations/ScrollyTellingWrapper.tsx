'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { SCROLLY_SECTIONS } from '@/lib/data'

const ScrollyCanvas = dynamic(() => import('./ScrollyCanvas'), { ssr: false })

const SECTIONS = SCROLLY_SECTIONS

function getOverlayLayout(align: 'left' | 'center' | 'right') {
  if (align === 'left') {
    return {
      alignItems: 'flex-start' as const,
      textAlign: 'left' as const,
    }
  }

  if (align === 'right') {
    return {
      alignItems: 'flex-end' as const,
      textAlign: 'right' as const,
    }
  }

  return {
    alignItems: 'center' as const,
    textAlign: 'center' as const,
  }
}

function TextOverlay() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  const hideAll = () => {
    refs.current.forEach(el => {
      if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(24px)' }
    })
  }

  useEffect(() => {
    hideAll()

    const onScroll = () => {
      const container = document.getElementById('scrolly-container')
      if (!container) { hideAll(); return }

      const rect = container.getBoundingClientRect()
      const vh = window.visualViewport?.height ?? window.innerHeight

      // Hide when canvas is fully above viewport (user scrolled past it)
      if (rect.bottom <= 0) { hideAll(); return }

      // Hide when canvas has not entered viewport yet (user is on hero)
      if (rect.top >= vh) { hideAll(); return }

      const total = container.offsetHeight - vh
      if (total <= 0) { hideAll(); return }

      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)

      SECTIONS.forEach((section, i) => {
        const el = refs.current[i]
        if (!el) return
        const [start, end] = section.range
        const fade = 0.05
        let opacity = 0
        let y = 24

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
    const timer = setTimeout(onScroll, 200)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {SECTIONS.map((section, i) => {
        const layout = getOverlayLayout(section.align)

        return (
        <div
          key={i}
          ref={el => { refs.current[i] = el }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: layout.alignItems,
            paddingLeft: '24px',
            paddingRight: '24px',
            textAlign: layout.textAlign,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 20,
            willChange: 'opacity, transform',
          }}
        >
          <div style={{ width: 'min(100%, 980px)' }}>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 1px 8px rgba(0,0,0,0.9)',
              marginBottom: '12px',
            }}>
              {section.eyebrow}
            </p>
            <h2 style={{
              fontFamily: 'Times New Roman, serif',
              fontSize: 'clamp(28px, 6vw, 88px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.0,
              whiteSpace: 'pre-line',
              textShadow: '0 2px 32px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)',
              marginBottom: '20px',
            }}>
              {section.title}
            </h2>
            <div style={{
              width: '48px',
              height: '3px',
              background: '#0A66C2',
              borderRadius: '2px',
              boxShadow: '0 0 12px rgba(10,102,194,0.9)',
              marginLeft: section.align === 'right' || section.align === 'center' ? 'auto' : 0,
              marginRight: section.align === 'left' || section.align === 'center' ? 'auto' : 0,
            }} />
          </div>
        </div>
        )
      })}
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
