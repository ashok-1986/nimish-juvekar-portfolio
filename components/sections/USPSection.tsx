'use client'

import { useEffect, useRef } from 'react'
import { Globe, GraduationCap, Lightbulb, HandHeart } from 'lucide-react'
import { USP_CARDS, PERSONAL } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  GraduationCap,
  Lightbulb,
  Handshake: HandHeart,
}

export default function USPSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let gsap: typeof import('gsap').gsap | undefined

    const init = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap = gsapMod.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap!.fromTo('.usp-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.usp-heading', start: 'top 82%', once: true } }
        )

        const cards = sectionRef.current?.querySelectorAll('.usp-card')
        cards?.forEach((card, i) => {
          gsap!.fromTo(card,
            { y: 40, opacity: 0, rotateX: isTouchDevice ? 0 : 8, transformPerspective: 800 },
            {
              y: 0, opacity: 1, rotateX: 0,
              duration: 0.7, delay: i * 0.12,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            }
          )
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="usp"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy"
      style={{ padding: '50px 0' }}
    >
      <div className="container relative z-10">
        <div className="usp-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>What Sets Me Apart</p>
          <h2 className="font-serif text-[clamp(28px,5vw,48px)] font-bold text-white heading-underline">
            Why Nimish
          </h2>
          <p className="font-sans text-[16px] mt-4 mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Bridging Industry & Academia
          </p>
          <blockquote className="text-base md:text-lg italic max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Times New Roman, serif', color: 'rgba(255,255,255,0.75)' }}>
            {PERSONAL.quote}
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USP_CARDS.map((card, i) => {
            const Icon = ICON_MAP[card.icon] || Globe
            return (
              <div
                key={i}
                className="usp-card group rounded-2xl p-4 md:p-6 relative overflow-hidden"
                style={{
                  opacity: 0,
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={!isTouchDevice ? e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-6px) scale(1.01)'
                  el.style.boxShadow = '0 16px 48px rgba(10,102,194,0.2)'
                  el.style.borderColor = 'rgba(10,102,194,0.3)'
                } : undefined}
                onMouseLeave={!isTouchDevice ? e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0) scale(1)'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                } : undefined}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.1) 0%, transparent 70%)' }}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(10,102,194,0.15)', color: '#6BADE6' }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif text-[17px] font-bold text-white mb-3 group-hover:text-blue/90 transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
