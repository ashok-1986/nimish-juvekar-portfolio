'use client'
import { useEffect, useRef } from 'react'
import { GraduationCap, Award } from 'lucide-react'
import { QUALIFICATIONS, CERTIFICATIONS } from '@/lib/data'

export default function QualificationsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('.qual-card')
        if (cards) {
          gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
          )
        }
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section id="qualifications" ref={sectionRef} className="section-base" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Education & Credentials</p>
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-navy">
            Qualifications & Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Qualifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={20} className="text-blue" />
              <h3 className="font-sans font-600 text-[15px] text-navy">Academic Qualifications</h3>
            </div>
            <div className="space-y-4">
              {QUALIFICATIONS.map((q, i) => (
                <div key={i} className="qual-card card p-5 border-l-4 border-l-blue" style={{ opacity: 0 }}>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className="font-serif text-[16px] font-bold text-navy leading-snug">{q.title}</h4>
                    <span className="tag flex-shrink-0 text-[10px] bg-sky-tint text-blue border-blue/30">
                      {q.grade}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] font-600 text-blue">{q.institution}</p>
                  <p className="font-sans text-[12px] text-slate mt-0.5">{q.period} · {q.country}</p>
                  {q.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {q.highlights.map((h, j) => (
                        <li key={j} className="font-sans text-[12px] text-slate flex gap-2">
                          <span className="text-blue">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} className="text-blue" />
              <h3 className="font-sans font-600 text-[15px] text-navy">Professional Certifications</h3>
            </div>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={i}
                  className="qual-card flex items-start gap-3 p-4 rounded-card bg-white border border-mist hover:border-blue transition-colors duration-200"
                  style={{ opacity: 0 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0 mt-2" />
                  <div>
                    <p className="font-sans text-[13px] font-500 text-navy leading-snug">{cert.title}</p>
                    <p className="font-sans text-[11px] text-slate mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
