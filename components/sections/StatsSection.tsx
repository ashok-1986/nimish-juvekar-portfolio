'use client'

import { useEffect, useRef } from 'react'
import { STATS } from '@/lib/data'

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let gsap: typeof import('gsap').gsap | undefined

    const init = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap = gsapMod.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap!.fromTo('.stats-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.stats-heading', start: 'top 80%', once: true } }
        )

        const cards = statsRef.current?.children
        if (cards) {
          Array.from(cards).forEach((card, i) => {
            gsap!.fromTo(card,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true } }
            )

            // Counter animation
            const valueEl = card.querySelector('.stat-value')
            const target = STATS[i]
            if (valueEl && target) {
              const obj = { val: 0 }
              gsap!.to(obj, {
                val: target.number,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
                onUpdate() {
                  const rounded = Math.round(obj.val)
                  valueEl.textContent = rounded.toString() + target.suffix
                }
              })
            }
          })
        }
      }, containerRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  // Subtle particle background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animFrame: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []
    const PARTICLE_COUNT = 30

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx2d.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.3 + 0.05,
      })
    }

    const draw = () => {
      ctx2d.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        ctx2d.beginPath()
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx2d.fillStyle = `rgba(255,255,255,${p.o})`
        ctx2d.fill()
      })
      animFrame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 40%, #0D3B6E 100%)' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <h2 className="stats-heading text-center font-serif text-[clamp(28px,4vw,48px)] font-semibold text-white mb-4">
          By The Numbers
        </h2>
        <p className="stats-heading text-center font-sans text-[15px] text-white/60 mb-16 max-w-lg mx-auto">
          A career spanning continents, certifications, and thousands of lives impacted.
        </p>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 md:p-8 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div
                className="stat-value font-serif text-[clamp(32px,5vw,52px)] font-bold text-white mb-2"
              >
                0{stat.suffix}
              </div>
              <div className="font-sans text-[13px] text-white/60 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
