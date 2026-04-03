'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { TEACHING } from '@/lib/data'

export default function TeachingSection() {
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
        gsap!.fromTo('.teach-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.teach-heading', start: 'top 82%', once: true } }
        )

        const modules = sectionRef.current?.querySelectorAll('.teach-module')
        modules?.forEach((mod, i) => {
          gsap!.fromTo(mod,
            { y: 30, opacity: 0, rotateX: 4, transformPerspective: 800 },
            {
              y: 0, opacity: 1, rotateX: 0,
              duration: 0.6, delay: i * 0.12,
              ease: 'power3.out',
              scrollTrigger: { trigger: mod, start: 'top 85%', once: true },
            }
          )
        })

        const pills = sectionRef.current?.querySelectorAll('.training-pill')
        pills?.forEach((pill, i) => {
          gsap!.fromTo(pill,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1, opacity: 1,
              duration: 0.35, delay: i * 0.04,
              ease: 'back.out(1.5)',
              scrollTrigger: { trigger: '.training-grid', start: 'top 85%', once: true },
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
      id="teaching"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '50px 0', background: 'linear-gradient(135deg, #EAF2FB 0%, #F5F2EC 100%)' }}
    >
      <div className="container relative z-10">
        {/* ── Heading ── */}
        <div className="teach-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3">Education</p>
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold text-navy heading-underline">
            Teaching at UEL
          </h2>
          <p className="font-sans text-[15px] text-slate mt-6 max-w-xl mx-auto italic">
            {TEACHING.philosophy}
          </p>
        </div>

        {/* ── Modules Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TEACHING.modules.map((mod, i) => (
            <div
              key={i}
              className="teach-module group rounded-2xl p-6 relative overflow-hidden"
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

              <div className="relative z-10">
                <span className="font-sans text-[10px] font-600 uppercase tracking-widest text-blue">
                  {mod.level}
                </span>
                <h3 className="font-serif text-[17px] font-bold text-navy mt-2 mb-3 group-hover:text-blue transition-colors duration-200">
                  {mod.name}
                </h3>
                {mod.score && (
                  <div
                    className="inline-block px-3 py-1.5 rounded-xl mb-4"
                    style={{ background: 'rgba(10,102,194,0.08)' }}
                  >
                    <span className="font-serif font-bold text-[18px]" style={{ color: '#0A66C2' }}>
                      {mod.score}
                    </span>
                    <span className="font-sans text-[11px] text-slate ml-2">Module Score</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── 2025 Professional Development ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}
            >
              <CheckCircle size={16} />
            </div>
            <h3 className="font-sans font-600 text-[13px] uppercase tracking-widest text-navy">
              2025 Professional Development
            </h3>
          </div>

          <div className="training-grid flex flex-wrap gap-3">
            {TEACHING.uelTraining2025.map((item, i) => {
              const hasScore = item.includes('Score:')
              const scoreMatch = item.match(/Score:\s*(\d+)/)
              const label = hasScore ? item.replace(/\s*\(Score:.*\)/, '') : item
              return (
                <div
                  key={i}
                  className="training-pill flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    opacity: 0,
                    background: hasScore && scoreMatch && parseInt(scoreMatch[1]) >= 100
                      ? 'rgba(10,102,194,0.08)'
                      : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: hasScore && scoreMatch && parseInt(scoreMatch[1]) >= 100
                      ? '1px solid rgba(10,102,194,0.2)'
                      : '1px solid rgba(232,228,220,0.8)',
                  }}
                >
                  <CheckCircle size={12} style={{ color: '#0A66C2', flexShrink: 0 }} />
                  <span className="font-sans text-[12px] text-slate">{label}</span>
                  {hasScore && scoreMatch && (
                    <span
                      className="font-sans text-[11px] font-700"
                      style={{ color: '#0A66C2' }}
                    >
                      {scoreMatch[1]}%
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
