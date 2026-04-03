'use client'
import { useEffect, useRef } from 'react'
import { Award, GraduationCap, Briefcase } from 'lucide-react'
import { QUALIFICATIONS, CERTIFICATIONS, ACCREDITATIONS } from '@/lib/data'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Elite: <Award size={18} />,
  'Supply Chain': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  'Project Management': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Technical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  'Digital & Business': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Leadership: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

const DEGREE_ICONS: Record<string, React.ReactNode> = {
  degree: <GraduationCap size={22} />,
  diploma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
}

const ACCREDITATION_ICONS: Record<string, React.ElementType> = {
  award: Award,
  graduation: GraduationCap,
  briefcase: Briefcase,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QualificationsSection() {
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
        gsap!.fromTo('.qual-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.qual-heading', start: 'top 82%', once: true } }
        )

        const degreeCards = sectionRef.current?.querySelectorAll('.degree-card')
        degreeCards?.forEach((card, i) => {
          gsap!.fromTo(card,
            { y: 60, opacity: 0, rotateX: 8, transformPerspective: 800 },
            {
              y: 0, opacity: 1, rotateX: 0,
              duration: 0.8, delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            }
          )
        })

        const certCards = sectionRef.current?.querySelectorAll('.cert-card')
        certCards?.forEach((card, i) => {
          gsap!.fromTo(card,
            { y: 30, opacity: 0, scale: 0.96 },
            {
              y: 0, opacity: 1, scale: 1,
              duration: 0.5, delay: (i % 2) * 0.08,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            }
          )
        })

        const countEl = sectionRef.current?.querySelector('.cert-count')
        if (countEl) {
          const total = CERTIFICATIONS.length
          const obj = { val: 0 }
          gsap!.to(obj, {
            val: total, duration: 1.5, ease: 'power2.out',
            scrollTrigger: { trigger: countEl, start: 'top 85%', once: true },
            onUpdate() { countEl.textContent = Math.round(obj.val).toString() },
          })
        }
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  const cardHover = (e: React.MouseEvent, enter: boolean) => {
    const el = e.currentTarget as HTMLElement
    if (enter) {
      el.style.transform = 'translateY(-6px) scale(1.01)'
      el.style.boxShadow = '0 16px 48px rgba(10,102,194,0.14)'
      el.style.borderColor = 'rgba(10,102,194,0.25)'
    } else {
      el.style.transform = 'translateY(0) scale(1)'
      el.style.boxShadow = '0 4px 24px rgba(10,102,194,0.07)'
      el.style.borderColor = 'rgba(255,255,255,0.6)'
    }
  }

  const GRADE_COLORS: Record<string, string> = { Merit: '#0A66C2', '2:1': '#1A1A2E', Distinction: '#0A66C2' }

  return (
    <section
      id="qualifications"
      ref={sectionRef}
      className="section-base relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F9F8F6 0%, #F5F2EC 60%, #F9F8F6 100%)' }}
    >
      <span
        className="absolute font-serif font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(120px, 18vw, 220px)',
          color: 'rgba(10,102,194,0.04)',
          top: '-10px', right: 0,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >07</span>

      <div className="container relative z-10">

        {/* ── Heading ── */}
        <div className="qual-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3">Credentials</p>
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold text-navy heading-underline">
            Education & Certifications
          </h2>
          <p className="font-sans text-[15px] text-slate mt-6 max-w-xl">
            Formal academic qualifications backed by {CERTIFICATIONS.length}+ industry certifications across management, technology, and education.
          </p>
        </div>

        {/* ── Elite Accreditations Strip ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}>
              <Award size={16} />
            </div>
            <h3 className="font-sans font-600 text-[13px] uppercase tracking-widest text-navy">Elite Professional Accreditations</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACCREDITATIONS.map((acc, i) => {
              const Icon = ACCREDITATION_ICONS[acc.icon] || Award
              const isCMBE = acc.title.includes('CMBE')
              return (
                <div
                  key={i}
                  className="rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    background: isCMBE ? 'linear-gradient(135deg, #0A66C2 0%, #0D4F9A 100%)' : acc.color === '#0A66C2' ? 'linear-gradient(135deg, #0A66C2 0%, #0D4F9A 100%)' : 'linear-gradient(135deg, #1A1A2E 0%, #2A2A4E 100%)',
                    color: '#FFFFFF',
                  }}
                >
                  {isCMBE && (
                    <div
                      className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20"
                      style={{ background: 'linear-gradient(135deg, #D4A843 0%, transparent 100%)' }}
                    />
                  )}
                  <div className="flex items-start gap-3 relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-serif text-[14px] font-bold text-white mb-1 leading-snug">{acc.title}</h4>
                      <p className="font-sans text-[11px] text-white/70">{acc.body}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-sans text-[10px] text-white/60">Issued: {acc.issued}</span>
                        {acc.expires && <span className="font-sans text-[10px] text-white/60">Expires: {acc.expires}</span>}
                      </div>
                      {acc.credentialId && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: isCMBE ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.1)' }}>
                          {isCMBE && <span style={{ color: '#D4A843' }}>★</span>}
                          <span className="font-sans text-[10px] font-mono" style={{ color: isCMBE ? '#D4A843' : 'rgba(255,255,255,0.7)' }}>
                            {acc.credentialId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Academic Qualifications ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <h3 className="font-sans font-600 text-[13px] uppercase tracking-widest text-navy">Academic Qualifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUALIFICATIONS.map((q) => {
              const gradeColor = GRADE_COLORS[q.grade] || '#0A66C2'
              return (
                <div
                  key={q.type + q.title}
                  className="degree-card group rounded-2xl p-6 relative overflow-hidden cursor-default"
                  style={{
                    opacity: 0,
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 4px 24px rgba(10,102,194,0.07)',
                    transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={e => cardHover(e, true)}
                  onMouseLeave={e => cardHover(e, false)}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.06) 0%, transparent 70%)' }}
                  />

                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}
                      >
                        {DEGREE_ICONS[q.type]}
                      </div>
                      <p className="font-sans text-[10px] font-600 uppercase tracking-widest text-slate">
                        {q.country}
                      </p>
                    </div>
                    <span
                      className="font-sans text-[10px] font-700 px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{
                        background: gradeColor === '#0A66C2' ? 'rgba(10,102,194,0.1)' : 'rgba(26,26,46,0.07)',
                        color: gradeColor,
                        border: `1px solid ${gradeColor}22`,
                      }}
                    >
                      {q.grade}
                    </span>
                  </div>

                  <h3 className="font-serif text-[18px] font-bold text-navy mb-2 leading-snug group-hover:text-blue transition-colors duration-200 relative z-10">
                    {q.title}
                  </h3>

                  <p className="font-sans text-[12px] font-600 text-blue mb-1 relative z-10">{q.institution}</p>
                  <p className="font-sans text-[12px] text-slate mb-5 relative z-10">{q.period}</p>

                  {q.highlights.length > 0 && (
                    <ul className="space-y-1.5 mb-5 relative z-10">
                      {q.highlights.map((h, i) => {
                        const parts = h.split(' — ')
                        return (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: '#0A66C2', marginTop: '4px', flexShrink: 0 }}>
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="2"/></svg>
                            </span>
                            <span className="font-sans text-[12px] text-slate leading-snug">
                              {parts[0]}
                              {parts[1] && <span className="font-600 text-navy"> — {parts[1]}</span>}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Professional Certifications ── */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                  <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
              </div>
              <h3 className="font-sans font-600 text-[13px] uppercase tracking-widest text-navy">Professional Certifications</h3>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
              style={{ background: 'rgba(10,102,194,0.08)' }}
            >
              <span className="cert-count font-serif font-bold text-[22px]" style={{ color: '#0A66C2' }}>0</span>
              <span className="font-sans text-[11px] text-slate">Certifications</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => {
              const colorMap: Record<string, string> = {
                Elite: '#0A66C2',
                'Supply Chain': '#0A66C2',
                'Project Management': '#1A1A2E',
                Technical: '#5A5A6E',
                'Digital & Business': '#1A1A2E',
                Leadership: '#0A66C2',
              }
              const certColor = colorMap[cert.category] || '#1A1A2E'

              return (
                <div
                  key={i}
                  className="cert-card group rounded-2xl p-4 relative overflow-hidden cursor-default"
                  style={{
                    opacity: 0,
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 2px 12px rgba(10,102,194,0.05)',
                    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-4px) scale(1.01)'
                    el.style.boxShadow = '0 10px 32px rgba(10,102,194,0.12)'
                    el.style.borderColor = 'rgba(10,102,194,0.2)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0) scale(1)'
                    el.style.boxShadow = '0 2px 12px rgba(10,102,194,0.05)'
                    el.style.borderColor = 'rgba(255,255,255,0.6)'
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.05) 0%, transparent 70%)' }}
                  />

                  <div className="flex items-start gap-3 mb-3 relative z-10">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: certColor === '#0A66C2' ? 'rgba(10,102,194,0.1)' : certColor === '#1A1A2E' ? 'rgba(26,26,46,0.07)' : 'rgba(90,90,110,0.08)',
                        color: certColor,
                      }}
                    >
                      {CATEGORY_ICONS[cert.category] || CATEGORY_ICONS['Leadership']}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="font-sans text-[9px] font-700 uppercase tracking-widest inline-block mb-1"
                        style={{ color: certColor, opacity: 0.8 }}
                      >
                        {cert.category}
                      </span>
                      <p className="font-sans text-[13px] font-500 text-navy leading-snug group-hover:text-blue transition-colors duration-200">
                        {cert.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 relative z-10 pt-2 border-t border-mist">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={10} height={10} style={{ color: '#0A66C2', flexShrink: 0 }}>
                      <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    <span className="font-sans text-[11px] text-slate">{cert.issuer}</span>
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
