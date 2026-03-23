'use client'
import { useEffect, useRef } from 'react'
import { Globe, GraduationCap, Lightbulb, Handshake } from 'lucide-react'
import { USP_CARDS } from '@/lib/data'

const ICONS = { Globe, GraduationCap, Lightbulb, Handshake } as Record<string, any>

export default function USPSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Heading
        gsap.fromTo('.usp-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.usp-heading', start: 'top 82%', once: true } }
        )

        // 3D perspective flip entrance on cards
        if (gridRef.current) {
          const cards = gridRef.current.querySelectorAll('.usp-card')
          gsap.fromTo(cards,
            { rotateX: 15, y: 50, opacity: 0, transformPerspective: 800 },
            {
              rotateX: 0, y: 0, opacity: 1,
              duration: 0.8, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true },
            }
          )
        }
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-base relative overflow-hidden"
      style={{ background: 'var(--navy)' }}
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10">
        {/* Heading */}
        <div className="usp-heading text-center mb-12" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3" style={{ color: 'rgba(10,102,194,0.8)' }}>
            Value Proposition
          </p>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-white">
            Why Work With Nimish
          </h2>
          <p className="font-sans text-[15px] mt-4 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            A unique blend of academic leadership, technical expertise, and real-world international business experience.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          style={{ perspective: '1000px' }}
        >
          {USP_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon] || Globe
            return (
              <div
                key={i}
                className="usp-card group relative rounded-card p-6 border-t-[3px] border-blue transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: '#0A66C2',
                  opacity: 0,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(10,102,194,0.1)'
                  el.style.transform = 'translateY(-6px)'
                  el.style.borderTopWidth = '5px'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(255,255,255,0.04)'
                  el.style.transform = 'translateY(0)'
                  el.style.borderTopWidth = '3px'
                }}
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-btn flex items-center justify-center mb-4"
                  style={{ background: 'rgba(10,102,194,0.15)' }}>
                  <Icon size={20} style={{ color: '#0A66C2' }} />
                </div>

                {/* Content */}
                <h3 className="font-sans font-600 text-[16px] text-white mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {card.body}
                </p>

                {/* Number badge */}
                <div
                  className="absolute top-5 right-5 font-serif text-[32px] font-bold leading-none"
                  style={{ color: 'rgba(255,255,255,0.06)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom quote */}
        <blockquote className="text-center mt-12 max-w-2xl mx-auto">
          <p
            className="font-serif text-[18px] font-bold italic leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            "Combining academic excellence with practical industry experience to develop the next generation of global business leaders."
          </p>
        </blockquote>
      </div>
    </section>
  )
}
