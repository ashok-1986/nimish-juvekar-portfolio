'use client'
import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'

type OverlayAlign = 'left' | 'center' | 'right'

const OVERLAY_SECTIONS: Array<{
  id: string
  scrollRange: [number, number]
  align: OverlayAlign
  eyebrow: string
  headline: string
  sub: string
}> = [
  {
    id: 'overlay-1',
    scrollRange: [0, 0.28], // visible when scroll 0–28%
    align: 'center',
    eyebrow: 'Lecturer · AFHEA · MSc · fCMgr',
    headline: 'Industry.\nMeets\nAcademia.',
    sub: 'University of East London',
  },
  {
    id: 'overlay-2',
    scrollRange: [0.32, 0.58],
    align: 'left',
    eyebrow: '15+ Years',
    headline: 'I build\nglobal leaders.',
    sub: 'Operations · Supply Chain · Project Management',
  },
  {
    id: 'overlay-3',
    scrollRange: [0.62, 0.88],
    align: 'right',
    eyebrow: 'From Mumbai to London',
    headline: 'Bridging design\nand engineering.',
    sub: 'Teaching the real world to the next generation.',
  },
]

export default function Overlay() {
  const progress = useMotionValue(0)

  useEffect(() => {
    const container = document.getElementById('scrolly-container')
    if (!container) return

    const onScroll = () => {
      const rect     = container.getBoundingClientRect()
      const total    = container.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const safeTotal = Math.max(1, total)
      const p = Math.min(1, scrolled / safeTotal)
      progress.set(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial
    return () => window.removeEventListener('scroll', onScroll)
  }, [progress])

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
      {OVERLAY_SECTIONS.map((section) => (
        <OverlayBlock
          key={section.id}
          section={section}
          progress={progress}
          alignClass={alignClass}
        />
      ))}
    </div>
  )
}

function OverlayBlock({
  section,
  progress,
  alignClass,
}: {
  section: {
    id: string
    scrollRange: [number, number]
    align: OverlayAlign
    eyebrow: string
    headline: string
    sub: string
  }
  progress: MotionValue<number>
  alignClass: (align: OverlayAlign) => string
}) {
  const fadeZone = 0.06
  const [start, end] = section.scrollRange

  const opacity = useTransform(progress, (p) => {
    if (p < start - fadeZone) return 0
    if (p < start) {
      const t = (p - (start - fadeZone)) / fadeZone
      return t
    }
    if (p <= end) return 1
    if (p < end + fadeZone) {
      const t = (p - end) / fadeZone
      return 1 - t
    }
    return 0
  })

  const y = useTransform(progress, (p) => {
    if (p < start - fadeZone) return 20
    if (p < start) {
      const t = (p - (start - fadeZone)) / fadeZone
      return 20 * (1 - t)
    }
    if (p <= end) return 0
    if (p < end + fadeZone) {
      const t = (p - end) / fadeZone
      return -20 * t
    }
    return -20
  })

  return (
    <div className="sticky top-0 h-screen w-full flex flex-col justify-center" style={{ position: 'sticky' }}>
      <motion.div
        className={`w-full flex flex-col justify-center ${alignClass(section.align)} px-6`}
        style={{ opacity, y }}
        aria-hidden="true"
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
            alignSelf:
              section.align === 'right' ? 'flex-end' : section.align === 'center' ? 'center' : 'flex-start',
          }}
        />
      </motion.div>
    </div>
  )
}
