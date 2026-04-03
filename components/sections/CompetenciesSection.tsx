'use client'

import { useEffect, useRef } from 'react'
import { COMPETENCIES } from '@/lib/data'

const CATEGORY_ICONS = ['BookOpen', 'Briefcase', 'Wrench', 'Palette']

const ICON_COLORS = ['#0A66C2', '#1A1A2E', '#5A5A6E', '#0A66C2']

const ICON_SVGS: Record<string, React.ReactNode> = {
  BookOpen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <circle cx="13.5" cy="6.5" r="2"/><circle cx="17.5" cy="10.5" r="2"/><circle cx="8.5" cy="7.5" r="2"/><circle cx="6.5" cy="12.5" r="2"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
}

export default function CompetenciesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let gsap: typeof import('gsap').gsap | undefined

    const init = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap = gsapMod.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap!.fromTo('.comp-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.comp-heading', start: 'top 82%', once: true } }
        )

        const cats = sectionRef.current?.querySelectorAll('.comp-category')
        cats?.forEach((cat, i) => {
          gsap!.fromTo(cat,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: cat, start: 'top 85%', once: true } }
          )

          const tags = cat.querySelectorAll('.skill-tag')
          gsap!.fromTo(tags,
            { scale: 0.85, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.3,
              stagger: 0.03, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: cat, start: 'top 85%', once: true },
            }
          )
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  const entries = Object.entries(COMPETENCIES)

  return (
    <section
      id="competencies"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '50px 0', background: 'linear-gradient(135deg, #EAF2FB 0%, #F9F8F6 50%, #EAF2FB 100%)' }}
    >
      <div className="container relative z-10">
        <div className="comp-heading mb-10 md:mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3">Expertise</p>
          <h2 className="font-serif font-bold text-navy heading-underline" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>
            Core Competencies
          </h2>
          <p className="font-sans text-[15px] text-slate mt-4 md:mt-6 max-w-xl mx-auto">
            A multidisciplinary skill set spanning academia, business operations, technical engineering, and digital innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {entries.map(([name, skills], catIndex) => {
            const iconKey = CATEGORY_ICONS[catIndex] || 'BookOpen'
            const color = ICON_COLORS[catIndex] || '#0A66C2'
            return (
              <div key={name} className="comp-category">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
                  <div
                    className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, color }}
                  >
                    {ICON_SVGS[iconKey]}
                  </div>
                  <h3 className="font-sans font-600 text-[12px] md:text-[14px] text-navy">{name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag font-sans text-[11px] md:text-[12px] font-500 px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full cursor-default"
                      style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(232,228,220,0.8)',
                        color: '#5A5A6E',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'rgba(10,102,194,0.4)'
                        el.style.color = '#0A66C2'
                        el.style.background = 'rgba(10,102,194,0.06)'
                        el.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'rgba(232,228,220,0.8)'
                        el.style.color = '#5A5A6E'
                        el.style.background = 'rgba(255,255,255,0.7)'
                        el.style.transform = 'translateY(0)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
