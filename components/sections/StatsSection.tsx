'use client'
import { useEffect, useRef } from 'react'
import { STATS } from '@/lib/data'

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Section slide in
        gsap.fromTo(sectionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        )

        // Counter animations — triggered on scroll enter
        STATS.forEach((stat, i) => {
          const el = countersRef.current[i]
          if (!el) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stat.number,
            duration: 1.8,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            onUpdate() {
              if (el) el.textContent = Math.round(obj.val).toString()
            },
          })
        })
      })
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20"
      style={{ background: 'var(--navy)' }}
      aria-label="Career statistics"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center group"
            >
              {/* Number */}
              <div className="flex items-end justify-center gap-0.5 mb-2">
                <span
                  ref={el => { countersRef.current[i] = el }}
                  className="counter-num"
                  aria-live="polite"
                >
                  0
                </span>
                <span
                  className="font-serif font-bold text-white"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.1, marginBottom: '4px' }}
                >
                  {stat.suffix}
                </span>
              </div>
              {/* Divider */}
              <div className="w-8 h-[2px] bg-blue mx-auto mb-3 opacity-60" />
              {/* Label */}
              <p className="font-sans text-[13px] font-500 text-white/70 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
