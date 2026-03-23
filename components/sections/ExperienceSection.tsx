'use client'
import { useEffect, useRef } from 'react'
import { EXPERIENCE } from '@/lib/data'

export default function ExperienceSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Heading
        gsap.fromTo(headingRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 82%', once: true } }
        )

        // Timeline line draw
        if (lineRef.current) {
          gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1, ease: 'none',
              scrollTrigger: {
                trigger: lineRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 2,
              },
            }
          )
        }

        // Cards slide in alternating sides
        if (sectionRef.current) {
          const cards = sectionRef.current.querySelectorAll('.timeline-card')
          cards.forEach((card, i) => {
            const isLeft = i % 2 === 0
            gsap.fromTo(card,
              { x: isLeft ? -50 : 50, opacity: 0 },
              {
                x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 82%', once: true },
              }
            )
          })

          // Dots bounce in
          const dots = sectionRef.current.querySelectorAll('.timeline-dot')
          dots.forEach(dot => {
            gsap.fromTo(dot,
              { scale: 0 },
              {
                scale: 1, duration: 0.4, ease: 'back.out(1.7)',
                scrollTrigger: { trigger: dot, start: 'top 82%', once: true },
              }
            )
          })
        }
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section-base bg-ivory">
      <div className="container">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="section-eyebrow mb-3">Career</p>
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-navy">
            Professional Experience
          </h2>
          <p className="font-sans text-[15px] text-slate mt-4 max-w-xl mx-auto">
            15+ years across engineering, sales, operations, and academia — spanning 4 countries.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Centre line */}
          <div
            ref={lineRef}
            className="timeline-line"
            style={{
              height: '100%',
              transformOrigin: 'top center',
              background: 'linear-gradient(to bottom, transparent, var(--mist) 5%, var(--blue) 50%, var(--mist) 95%, transparent)',
            }}
            aria-hidden="true"
          />

          {/* Entries */}
          <div className="space-y-10 md:space-y-12">
            {EXPERIENCE.map((exp, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={exp.id}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-0"
                >
                  {/* Left slot */}
                  {isLeft ? (
                    <div className="timeline-card md:pr-10 md:text-right" style={{ opacity: 0 }}>
                      <TimelineCard exp={exp} align="right" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  {/* Centre dot */}
                  <div className="hidden md:flex flex-col items-center">
                    <div
                      className="timeline-dot w-4 h-4 rounded-full bg-white border-[3px] border-blue z-10 mt-6 flex-shrink-0"
                      style={{ boxShadow: '0 0 0 4px rgba(10,102,194,0.12)', transform: 'scale(0)' }}
                    />
                  </div>

                  {/* Right slot */}
                  {!isLeft ? (
                    <div className="timeline-card md:pl-10" style={{ opacity: 0 }}>
                      <TimelineCard exp={exp} align="left" />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  {/* Mobile: always full width */}
                  <div className="md:hidden col-span-1 mt-4">
                    {/* Mobile dot */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="timeline-dot w-3 h-3 rounded-full bg-blue flex-shrink-0" style={{ transform: 'scale(0)' }} />
                      <span className="font-sans text-[12px] font-600 text-blue uppercase tracking-wide">{exp.period}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ exp, align }: { exp: typeof EXPERIENCE[0]; align: 'left' | 'right' }) {
  return (
    <div className="card p-5 border-l-4 border-l-blue group hover:border-l-navy">
      {/* Header */}
      <div className={`mb-3 ${align === 'right' ? 'md:text-right' : ''}`}>
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="tag text-[10px]">{exp.tag}</span>
        </div>
        <h3 className="font-serif text-[17px] font-bold text-navy leading-tight">{exp.role}</h3>
        <p className="font-sans text-[13px] font-600 text-blue mt-0.5">{exp.company}</p>
        <p className="font-sans text-[12px] text-slate mt-0.5">{exp.period} · {exp.location}</p>
      </div>

      {/* Highlights */}
      <ul className={`space-y-1.5 ${align === 'right' ? 'md:text-right' : ''}`}>
        {exp.highlights.map((h, i) => (
          <li key={i} className="font-sans text-[13px] text-slate leading-snug flex gap-2 items-start">
            <span className="text-blue mt-1 flex-shrink-0 md:hidden">·</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
