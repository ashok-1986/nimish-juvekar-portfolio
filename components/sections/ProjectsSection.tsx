'use client'
import { useEffect, useRef } from 'react'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/lib/data'

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('.project-card')
        if (cards) {
          gsap.fromTo(cards,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
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
      id="projects"
      ref={sectionRef}
      className="section-base relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EAF2FB 0%, #F9F8F6 60%, #EAF2FB 100%)' }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-navy">
            Selected Work
          </h2>
          <p className="font-sans text-[15px] text-slate mt-4 max-w-xl mx-auto">
            Academic programmes, industry operations, and leadership initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group block glass-card p-6 relative overflow-hidden"
              style={{ opacity: 0 }}
              aria-label={`View ${project.title}`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-card"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.08) 0%, transparent 70%)',
                }}
              />

              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="section-eyebrow text-[10px]">{project.category}</span>
                <ArrowUpRight
                  size={18}
                  className="text-slate group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-[19px] font-bold text-navy mb-3 leading-snug group-hover:text-blue transition-colors duration-200">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[13px] text-slate leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-sans text-[10px] font-500 px-2.5 py-1 rounded-pill"
                    style={{
                      background: 'rgba(10,102,194,0.08)',
                      color: 'var(--blue)',
                      border: '1px solid rgba(10,102,194,0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom link hint */}
              <div className="mt-5 pt-4 border-t border-mist flex items-center gap-1.5">
                <ExternalLink size={12} className="text-blue" />
                <span className="font-sans text-[11px] text-blue font-500">
                  {project.link.includes('uel') ? 'View UEL Profile' : 'View LinkedIn'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
