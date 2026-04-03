'use client'
import { useEffect, useRef } from 'react'
import { ExternalLink, ArrowUpRight, BookOpen, Users, Globe, Calendar } from 'lucide-react'
import { PROJECTS } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Globe,
  Users,
  Calendar,
}

const ACCENT_MAP = ['#0A66C2', '#0A66C2', '#0A66C2', '#1A1A2E']

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Section heading
        gsap.fromTo('.projects-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.projects-heading', start: 'top 82%', once: true } }
        )

        // Cards with stagger and 3D tilt
        const cards = sectionRef.current?.querySelectorAll('.project-card-item')
        cards?.forEach((card, i) => {
          gsap.fromTo(card,
            { y: 60, opacity: 0, rotateX: 8, transformPerspective: 800 },
            {
              y: 0, opacity: 1, rotateX: 0,
              duration: 0.8, delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            }
          )
        })

        // Stat numbers count up
        const stats = sectionRef.current?.querySelectorAll('.project-stat-num')
        stats?.forEach(stat => {
          const text = stat.textContent || ''
          const num = parseFloat(text.replace(/[^0-9.]/g, ''))
          const suffix = text.replace(/[0-9.]/g, '')
          if (!isNaN(num) && num > 1) {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: num, duration: 1.5, ease: 'power2.out',
              scrollTrigger: { trigger: stat, start: 'top 85%', once: true },
              onUpdate() {
                stat.textContent = (num % 1 === 0
                  ? Math.round(obj.val).toString()
                  : obj.val.toFixed(0)) + suffix
              }
            })
          }
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-base relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EAF2FB 0%, #F9F8F6 50%, #EAF2FB 100%)' }}
    >
      {/* Section number accent */}
      <span className="section-number" aria-hidden="true">05</span>

      <div className="container relative z-10">
        {/* Heading */}
        <div className="projects-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold text-navy heading-underline">
            Selected Work
          </h2>
          <p className="font-sans text-[15px] text-slate mt-6 max-w-xl">
            Academic programmes, industry operations, and leadership initiatives across 15+ years.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => {
            const Icon = ICON_MAP[Object.keys(ICON_MAP)[idx % Object.keys(ICON_MAP).length]]
            const accent = ACCENT_MAP[idx % ACCENT_MAP.length]
            return (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-item group block rounded-2xl p-6 relative overflow-hidden"
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
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.06) 0%, transparent 70%)' }}
                />

                {/* Top row */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: accent === '#0A66C2' ? 'rgba(10,102,194,0.1)' : 'rgba(26,26,46,0.07)' }}
                    >
                      <Icon size={20} style={{ color: accent }} />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-600 uppercase tracking-widest text-slate">{project.category}</p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-serif text-[20px] font-bold text-navy mb-3 leading-snug group-hover:text-blue transition-colors duration-200 relative z-10"
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-[13px] text-slate leading-relaxed mb-5 relative z-10">
                  {project.description}
                </p>

                {/* Stat */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div
                    className="px-4 py-2 rounded-xl"
                    style={{ background: accent === '#0A66C2' ? 'rgba(10,102,194,0.08)' : 'rgba(26,26,46,0.05)' }}
                  >
                    <span
                      className="project-stat-num font-serif font-bold text-[22px]"
                      style={{ color: accent }}
                    >
                      {project.stat.value}
                    </span>
                    <span className="font-sans text-[11px] text-slate ml-2">{project.stat.label}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] font-500 px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(10,102,194,0.07)',
                        color: '#0A66C2',
                        border: '1px solid rgba(10,102,194,0.12)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom link */}
                <div className="mt-5 pt-4 border-t border-mist flex items-center gap-1.5 relative z-10">
                  <ExternalLink size={11} className="text-blue" />
                  <span className="font-sans text-[11px] text-blue font-500">
                    {project.link.includes('uel') ? 'View UEL Profile' : 'View LinkedIn'}
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}