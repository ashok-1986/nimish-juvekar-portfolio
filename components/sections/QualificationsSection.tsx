'use client'
import { useEffect, useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const QUALIFICATIONS = [
  {
    id: 1,
    title: 'MSc International Business Management',
    institution: 'University of East London',
    country: 'United Kingdom',
    period: '2022–2023',
    grade: 'Merit',
    gradeColor: '#0A66C2',
    highlights: [
      'Global Project Management — 88%',
      'Applied Business Project — 70%',
      'Managing Resources in an International Business Environment — 62%',
    ],
    stat: { value: '88%', label: 'Top Module Score' },
    icon: 'graduation',
  },
  {
    id: 2,
    title: 'Bachelor of Engineering — Electronics Engineering',
    institution: 'University of Mumbai',
    country: 'India',
    period: '2005–2008',
    grade: '2:1',
    gradeColor: '#1A1A2E',
    highlights: [],
    stat: { value: '2:1', label: 'Degree Classification' },
    icon: 'circuit',
  },
  {
    id: 3,
    title: 'Diploma in Electronics & Video Engineering',
    institution: 'Maharashtra State Board of Technical Education',
    country: 'India',
    period: '2002–2005',
    grade: 'Distinction',
    gradeColor: '#0A66C2',
    highlights: [],
    stat: { value: 'Dist.', label: 'Grade Achieved' },
    icon: 'diploma',
  },
]

const CERTIFICATIONS = [
  { title: 'CMI Level 7 Diploma — Strategic Management & Leadership', issuer: 'Chartered Management Institute', category: 'Leadership', color: '#0A66C2' },
  { title: 'Associate Fellow of Advance HE (AFHEA)', issuer: 'Advance HE', category: 'Academic', color: '#0A66C2' },
  { title: 'Project Management Foundations', issuer: 'PMI', category: 'Management', color: '#1A1A2E' },
  { title: 'Managing Project Stakeholders', issuer: 'PMI', category: 'Management', color: '#1A1A2E' },
  { title: 'NFPA 72: National Fire Alarm and Signaling Code', issuer: 'NFPA', category: 'Technical', color: '#5A5A6E' },
  { title: 'Integrated Building Management Systems Workshop', issuer: 'Industry', category: 'Technical', color: '#5A5A6E' },
  { title: 'PAVA System Design, Testing & Commissioning (Module A)', issuer: 'Industry', category: 'Technical', color: '#5A5A6E' },
  { title: 'EasyIO FG Training Certificate', issuer: 'EasyIO', category: 'Technical', color: '#5A5A6E' },
  { title: 'Excel: Advanced Formulas and Functions', issuer: 'LinkedIn / NASBA', category: 'Digital', color: '#1A1A2E' },
  { title: 'Learning ITIL', issuer: 'LinkedIn Learning', category: 'Digital', color: '#1A1A2E' },
  { title: 'Inventory Management Foundations', issuer: 'LinkedIn Learning', category: 'Operations', color: '#1A1A2E' },
  { title: 'Purchasing Foundations', issuer: 'LinkedIn Learning', category: 'Operations', color: '#1A1A2E' },
  { title: 'Sustainability Strategies', issuer: 'LinkedIn Learning', category: 'Strategy', color: '#0A66C2' },
]

// Category → icon path map (inline SVG paths to avoid icon library dependency)
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Leadership: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Academic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Management: (
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
  Digital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Operations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Strategy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
}

const DEGREE_ICONS: Record<string, React.ReactNode> = {
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  circuit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
      <rect x="9" y="9" width="6" height="6"/><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h6m-6 18H5a2 2 0 0 1-2-2v-4m6 6h6m4-18h4a2 2 0 0 1 2 2v4m-6-6v0m6 6v6m-6 6h4a2 2 0 0 0 2-2v-4"/>
    </svg>
  ),
  diploma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QualificationsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Section heading
        gsap.fromTo('.qual-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.qual-heading', start: 'top 82%', once: true } }
        )

        // Degree cards — 3D entrance matching ProjectsSection
        const degreeCards = sectionRef.current?.querySelectorAll('.degree-card')
        degreeCards?.forEach((card, i) => {
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

        // Cert cards stagger
        const certCards = sectionRef.current?.querySelectorAll('.cert-card')
        certCards?.forEach((card, i) => {
          gsap.fromTo(card,
            { y: 30, opacity: 0, scale: 0.96 },
            {
              y: 0, opacity: 1, scale: 1,
              duration: 0.5, delay: (i % 2) * 0.08,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            }
          )
        })

        // Counter for cert count
        const countEl = sectionRef.current?.querySelector('.cert-count')
        if (countEl) {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: 13, duration: 1.5, ease: 'power2.out',
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

  return (
    <section
      id="qualifications"
      ref={sectionRef}
      className="section-base relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F9F8F6 0%, #F5F2EC 60%, #F9F8F6 100%)' }}
    >
      {/* Section number accent */}
      <span
        className="absolute font-serif font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(120px, 18vw, 220px)',
          color: 'rgba(10,102,194,0.04)',
          top: '-10px', right: 0,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >06</span>

      <div className="container relative z-10">

        {/* ── Heading ── */}
        <div className="qual-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3">Credentials</p>
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold text-navy heading-underline">
            Education & Certifications
          </h2>
          <p className="font-sans text-[15px] text-slate mt-6 max-w-xl">
            Formal academic qualifications backed by 13+ industry certifications across management, technology, and education.
          </p>
        </div>

        {/* ── Academic Qualifications — same card style as ProjectsSection ── */}
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
            {QUALIFICATIONS.map((q) => (
              <div
                key={q.id}
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
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.06) 0%, transparent 70%)' }}
                />

                {/* Icon + category */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}
                    >
                      {DEGREE_ICONS[q.icon]}
                    </div>
                    <p className="font-sans text-[10px] font-600 uppercase tracking-widest text-slate">
                      {q.country}
                    </p>
                  </div>
                  {/* Grade badge */}
                  <span
                    className="font-sans text-[10px] font-700 px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{
                      background: q.gradeColor === '#0A66C2' ? 'rgba(10,102,194,0.1)' : 'rgba(26,26,46,0.07)',
                      color: q.gradeColor,
                      border: `1px solid ${q.gradeColor}22`,
                    }}
                  >
                    {q.grade}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-[18px] font-bold text-navy mb-2 leading-snug group-hover:text-blue transition-colors duration-200 relative z-10">
                  {q.title}
                </h3>

                {/* Institution */}
                <p className="font-sans text-[12px] font-600 text-blue mb-1 relative z-10">{q.institution}</p>
                <p className="font-sans text-[12px] text-slate mb-5 relative z-10">{q.period}</p>

                {/* Highlights */}
                {q.highlights.length > 0 && (
                  <ul className="space-y-1.5 mb-5 relative z-10">
                    {q.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: '#0A66C2', marginTop: '4px', flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="2"/></svg>
                        </span>
                        <span className="font-sans text-[12px] text-slate leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Stat pill — matching ProjectsSection exactly */}
                <div className="relative z-10">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{ background: 'rgba(10,102,194,0.08)' }}
                  >
                    <span className="font-serif font-bold text-[20px]" style={{ color: q.gradeColor }}>
                      {q.stat.value}
                    </span>
                    <span className="font-sans text-[11px] text-slate">{q.stat.label}</span>
                  </div>
                </div>
              </div>
            ))}
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
            {/* Count stat */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
              style={{ background: 'rgba(10,102,194,0.08)' }}
            >
              <span className="cert-count font-serif font-bold text-[22px]" style={{ color: '#0A66C2' }}>0</span>
              <span className="font-sans text-[11px] text-slate">Certifications</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
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
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.05) 0%, transparent 70%)' }}
                />

                {/* Top: icon + category */}
                <div className="flex items-start gap-3 mb-3 relative z-10">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: cert.color === '#0A66C2' ? 'rgba(10,102,194,0.1)' : cert.color === '#1A1A2E' ? 'rgba(26,26,46,0.07)' : 'rgba(90,90,110,0.08)',
                      color: cert.color,
                    }}
                  >
                    {CATEGORY_ICONS[cert.category] || CATEGORY_ICONS['Management']}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-sans text-[9px] font-700 uppercase tracking-widest inline-block mb-1"
                      style={{ color: cert.color, opacity: 0.8 }}
                    >
                      {cert.category}
                    </span>
                    <p className="font-sans text-[13px] font-500 text-navy leading-snug group-hover:text-blue transition-colors duration-200">
                      {cert.title}
                    </p>
                  </div>
                </div>

                {/* Issuer */}
                <div className="flex items-center gap-1.5 relative z-10 pt-2 border-t border-mist">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={10} height={10} style={{ color: '#0A66C2', flexShrink: 0 }}>
                    <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <span className="font-sans text-[11px] text-slate">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}