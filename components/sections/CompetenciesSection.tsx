'use client'
import { useEffect, useRef } from 'react'
import { COMPETENCIES } from '@/lib/data'

const GROUP_COLORS: Record<string, string> = {
  'Academic Leadership & Mentorship': '#0A66C2',
  'Business & Management':            '#1A1A2E',
  'Technical & Industry':             '#5A5A6E',
}

export default function CompetenciesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Group headings
        const groups = sectionRef.current?.querySelectorAll('.comp-group')
        groups?.forEach(group => {
          gsap.fromTo(group,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
              scrollTrigger: { trigger: group, start: 'top 82%', once: true } }
          )
          // Tags inside
          const tags = group.querySelectorAll('.tag')
          gsap.fromTo(tags,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out',
              scrollTrigger: { trigger: group, start: 'top 80%', once: true } }
          )
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section id="competencies" ref={sectionRef} className="section-base bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Skills</p>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-navy">
            Core Competencies
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(COMPETENCIES).map(([group, skills]) => (
            <div key={group} className="comp-group" style={{ opacity: 0 }}>
              {/* Group header */}
              <div
                className="flex items-center gap-3 mb-5 pb-3 border-b-2"
                style={{ borderColor: GROUP_COLORS[group] || 'var(--mist)' }}
              >
                <div
                  className="w-2 h-10 rounded-full flex-shrink-0"
                  style={{ background: GROUP_COLORS[group] || 'var(--navy)' }}
                />
                <h3 className="font-sans font-600 text-[14px] text-navy leading-tight">{group}</h3>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="tag cursor-pointer" style={{ opacity: 0 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
