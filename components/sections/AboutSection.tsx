'use client'

import { useEffect, useRef } from 'react'
import { aboutContent, PERSONAL, STATS, ACCREDITATIONS } from '@/lib/data'

// Icon SVGs — inline, no extra dependency
const ICONS = {
  globe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  graduation: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  briefcase: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  award: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  mapPin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  bookOpen: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  sparkle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
    </svg>
  ),
}

const PILLARS = [
  {
    icon: ICONS.bookOpen,
    label: 'Pedagogy',
    detail: 'AFHEA-accredited teaching rooted in work-based learning frameworks',
  },
  {
    icon: ICONS.globe,
    label: 'Global Practice',
    detail: '15+ years across UK, India, Middle East and South East Asia',
  },
  {
    icon: ICONS.briefcase,
    label: 'Industry Depth',
    detail: 'ELV systems, supply chain, fire safety, and international business',
  },
  {
    icon: ICONS.users,
    label: 'Human Impact',
    detail: '4,000+ students and event attendees shaped over a career',
  },
]

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const bentoRef    = useRef<HTMLDivElement>(null)
  const pillarsRef  = useRef<HTMLDivElement>(null)
  const wordRefs    = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (prefersReducedMotion) {
        gsap.set([headingRef.current, bentoRef.current, pillarsRef.current], { opacity: 1, y: 0 })
        wordRefs.current.forEach(w => { if (w) w.style.opacity = '1' })
        return
      }

      ctx = gsap.context(() => {
        // Heading reveal
        gsap.fromTo(headingRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 82%', once: true } }
        )

        // Word-scrub opacity on the statement quote
        if (wordRefs.current.length) {
          gsap.fromTo(wordRefs.current,
            { opacity: 0.1 },
            {
              opacity: 1,
              stagger: 0.04,
              ease: 'none',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 0.6,
              },
            }
          )
        }

        // Bento cards stagger-clip
        const cards = bentoRef.current?.querySelectorAll('.about-card')
        if (cards?.length) {
          gsap.fromTo(cards,
            { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
            {
              y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
              duration: 0.7, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: bentoRef.current, start: 'top 80%', once: true },
            }
          )
        }

        // Pillar cards slide-up stagger
        const pillars = pillarsRef.current?.querySelectorAll('.pillar-card')
        if (pillars?.length) {
          gsap.fromTo(pillars,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: pillarsRef.current, start: 'top 82%', once: true },
            }
          )
        }
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  // Split quote into individual words for scrub
  const quoteWords = PERSONAL.quote.replace(/"/g, '').split(' ')

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc py-24 md:py-36 px-6"
    >
      {/* Ambient dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8D8DA 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Editorial heading + scrub quote ── */}
        <div ref={headingRef} className="mb-20 md:mb-28" style={{ opacity: 0 }}>
          <h2
            className="font-serif font-bold text-obsidian leading-none mb-10"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', letterSpacing: '-0.02em', maxWidth: '16ch' }}
          >
            Where industry depth meets academic craft.
          </h2>

          {/* Scrub-word quote */}
          <p
            className="font-serif italic text-muted max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}
            aria-label={PERSONAL.quote}
          >
            {quoteWords.map((word, i) => (
              <span
                key={i}
                ref={el => { if (el) wordRefs.current[i] = el }}
                style={{ opacity: 0.1, display: 'inline' }}
              >
                {word}{' '}
              </span>
            ))}
          </p>
        </div>

        {/* ── Bento Grid ── 12-col, dense, zero dead cells ── */}
        <div
          ref={bentoRef}
          className="grid grid-cols-12 gap-4 mb-6 auto-rows-auto"
          style={{ gridAutoFlow: 'dense' }}
        >
          {/* Card A: Identity — col 1-7, full bleed */}
          <div
            className="about-card col-span-12 md:col-span-7 rounded-2xl overflow-hidden relative group"
            style={{
              minHeight: '320px',
              background: '#052026',
              clipPath: 'inset(100% 0 0 0)',
            }}
          >
            {/* Background texture */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(https://picsum.photos/seed/university-lecture/1200/700)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.18,
                filter: 'grayscale(1) contrast(1.2)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(to top right, rgba(5,32,38,0.96) 0%, rgba(5,32,38,0.6) 100%)',
              }}
            />
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between h-full" style={{ minHeight: '320px' }}>
              <div className="flex items-start gap-3 mb-auto">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,90,31,0.15)', color: '#FF5A1F' }}
                >
                  {ICONS.graduation}
                </div>
                <div>
                  <p className="font-sans text-white/50 text-xs font-medium tracking-wide uppercase mb-1">
                    {PERSONAL.credentials}
                  </p>
                  <p className="font-sans text-white/80 text-sm">{PERSONAL.institution}</p>
                </div>
              </div>
              <div className="mt-8">
                <h3
                  className="font-serif text-white font-bold mb-3"
                  style={{ fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.15 }}
                >
                  {PERSONAL.name}
                </h3>
                <p className="font-sans text-white/60 text-sm leading-relaxed max-w-lg">
                  {PERSONAL.summary}
                </p>
              </div>
              {/* Location chip */}
              <div className="flex items-center gap-2 mt-6">
                <span style={{ color: '#FF5A1F' }}>{ICONS.mapPin}</span>
                <span className="font-sans text-white/50 text-xs">{PERSONAL.location}</span>
              </div>
            </div>
          </div>

          {/* Card B: Key Stats — col 8-12 */}
          <div
            className="about-card col-span-12 md:col-span-5 rounded-2xl overflow-hidden relative"
            style={{
              background: '#EDF4F5',
              border: '1px solid #C8D8DA',
              clipPath: 'inset(100% 0 0 0)',
            }}
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <span style={{ color: '#FF5A1F' }}>{ICONS.sparkle}</span>
                <span className="font-sans text-obsidian text-xs font-semibold tracking-widest uppercase">Career at a Glance</span>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex flex-col justify-between">
                    <span
                      className="font-serif font-bold text-obsidian"
                      style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1 }}
                    >
                      {stat.number}{stat.suffix}
                    </span>
                    <span className="font-sans text-muted text-xs mt-2 leading-snug">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card C: Accreditations strip — col 1-6 */}
          <div
            className="about-card col-span-12 md:col-span-6 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid #C8D8DA',
              clipPath: 'inset(100% 0 0 0)',
            }}
          >
            <div className="p-6">
              <p className="font-sans text-obsidian text-xs font-semibold tracking-widest uppercase mb-5">
                Professional Accreditations
              </p>
              <div className="flex flex-col gap-3">
                {ACCREDITATIONS.map((acc, i) => (
                  <div key={i} className="flex items-start gap-3 group cursor-default">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                      style={{
                        background: 'rgba(255,90,31,0.08)',
                        color: '#FF5A1F',
                      }}
                    >
                      {acc.icon === 'graduation' ? ICONS.graduation : acc.icon === 'briefcase' ? ICONS.briefcase : ICONS.award}
                    </div>
                    <div>
                      <p className="font-sans text-obsidian text-sm font-medium leading-snug group-hover:text-tangerine transition-colors duration-200">
                        {acc.title}
                      </p>
                      <p className="font-sans text-muted text-xs mt-0.5">{acc.body} · {acc.issued}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card D: Story — col 7-12 */}
          <div
            className="about-card col-span-12 md:col-span-6 rounded-2xl overflow-hidden"
            style={{
              background: '#052026',
              clipPath: 'inset(100% 0 0 0)',
            }}
          >
            <div className="p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,90,31,0.12)', color: '#FF5A1F' }}
                  >
                    {ICONS.bookOpen}
                  </div>
                  <span className="font-sans text-white/50 text-xs font-semibold tracking-widest uppercase">The Journey</span>
                </div>
                <p className="font-sans text-white/75 text-sm leading-relaxed">
                  {PERSONAL.heroSub}
                </p>
              </div>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 mt-6 font-sans text-sm font-medium text-white group/cta"
                style={{ color: '#FF5A1F' }}
              >
                <span>View full career</span>
                <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                  {ICONS.arrowRight}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Pillars ── 4-column horizontal accordion ── */}
        <div ref={pillarsRef} className="mt-16">
          <p className="font-sans text-muted text-xs font-semibold tracking-widest uppercase mb-8">
            Four Dimensions of Practice
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((p, i) => (
              <div
                key={i}
                className="pillar-card group rounded-xl p-5 cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #C8D8DA',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,90,31,0.06)'
                  el.style.borderColor = 'rgba(255,90,31,0.3)'
                  el.style.boxShadow = '0 8px 24px rgba(255,90,31,0.10)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.7)'
                  el.style.borderColor = '#C8D8DA'
                  el.style.boxShadow = 'none'
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-tangerine/10"
                  style={{ background: 'rgba(5,32,38,0.06)', color: '#052026' }}
                >
                  <span className="group-hover:text-tangerine transition-colors duration-200" style={{ color: 'inherit' }}>
                    {p.icon}
                  </span>
                </div>
                <p className="font-sans text-obsidian font-semibold text-sm mb-1.5">{p.label}</p>
                <p className="font-sans text-muted text-xs leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
