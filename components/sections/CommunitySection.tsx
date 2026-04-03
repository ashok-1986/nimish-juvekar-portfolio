'use client'
import { useEffect, useRef } from 'react'
import { Heart, Users, Calendar, MapPin } from 'lucide-react'
import { COMMUNITY } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Users,
  Calendar,
  MapPin,
}

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let gsap: typeof import('gsap').gsap | undefined

    const init = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap = gsapMod.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap!.fromTo('.community-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.community-heading', start: 'top 82%', once: true } }
        )

        const cards = sectionRef.current?.querySelectorAll('.community-card')
        cards?.forEach((card, i) => {
          gsap!.fromTo(card,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.6, delay: i * 0.1,
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
      id="community"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '50px 0', background: 'linear-gradient(135deg, #F9F8F6 0%, #F5F2EC 100%)' }}
    >
      <div className="container relative z-10">
        <div className="community-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3">Giving Back</p>
          <h2 className="font-serif font-bold text-navy heading-underline" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>
            Community & Volunteering
          </h2>
          <p className="font-sans text-[15px] text-slate mt-6 max-w-xl">
            Active UK community service spanning 3+ years — organising events for 4,000+ attendees and supporting diaspora initiatives across London.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMUNITY.map((role, i) => {
            const Icon = ICON_MAP[Object.keys(ICON_MAP)[i % Object.keys(ICON_MAP).length]]
            return (
              <div
                key={i}
                className="community-card group block rounded-2xl p-4 md:p-6 h-auto relative overflow-hidden"
                style={{
                  opacity: 0,
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 4px 24px rgba(10,102,194,0.07)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-6px) scale(1.01)'
                  el.style.boxShadow = '0 16px 48px rgba(10,102,194,0.14)'
                  el.style.borderColor = 'rgba(10,102,194,0.25)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0) scale(1)'
                  el.style.boxShadow = '0 4px 24px rgba(10,102,194,0.07)'
                  el.style.borderColor = 'rgba(255,255,255,0.6)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.06) 0%, transparent 70%)' }}
                />

                <div className="flex items-start gap-3 mb-5 relative z-10">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[18px] font-bold text-navy mb-1 group-hover:text-blue transition-colors duration-200">
                      {role.role}
                    </h3>
                    <p className="font-sans text-[13px] font-600 text-blue">{role.organisation}</p>
                    <p className="font-sans text-[12px] text-slate">{role.period}</p>
                  </div>
                </div>

                <ul className="space-y-2 relative z-10">
                  {role.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span style={{ color: '#0A66C2', marginTop: '5px', flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="2"/></svg>
                      </span>
                      <span className="font-sans text-[13px] text-slate leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
