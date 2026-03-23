'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

export default function HeroSection() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const decoRef = useRef<HTMLSpanElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const name1 = 'Nimish'
  const name2 = 'Juvekar'
  const allLetters = [...name1, ...name2]

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // Eyebrow slide up
        tl.fromTo(eyebrowRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }, 0.1
        )

        // Name letters — stagger drop in from below with rotation
        const letters = lettersRef.current.filter(Boolean)
        if (letters.length > 0) {
          tl.fromTo(letters,
            { y: '120%', opacity: 0, rotationX: -90 },
            {
              y: '0%',
              opacity: 1,
              rotationX: 0,
              duration: 0.7,
              stagger: 0.035,
            }, 0.35
          )
        }

        // Tagline
        tl.fromTo(taglineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }, 0.9
        )

        // Buttons
        tl.fromTo(btnsRef.current,
          { y: 20, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 }, 1.1
        )

        // Tags
        if (tagsRef.current) {
          const tags = tagsRef.current.querySelectorAll('.tag')
          tl.fromTo(tags,
            { scale: 0.8, opacity: 0, y: 10 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 1.2
          )
        }

        // Photo
        tl.fromTo(photoRef.current,
          { x: 80, opacity: 0, rotationY: -15 },
          { x: 0, opacity: 1, rotationY: 0, duration: 1.0, ease: 'power3.out' }, 0.45
        )

        // Badge
        tl.fromTo(badgeRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6 }, 1.15
        )

        // Decorative letter slow fade in
        tl.fromTo(decoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2.5, ease: 'power2.out' }, 1.3
        )
      })
    }
    init()
    return () => ctx?.revert()
  }, [])

  const scrollToAbout = () => {
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo('#about', { offset: 0, duration: 1.5 })
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo('#contact', { offset: 0, duration: 1.5 })
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center dot-grid overflow-hidden pt-16"
    >
      {/* Decorative background "N" */}
      <span
        ref={decoRef}
        className="deco-letter select-none"
        style={{ right: '-2%', bottom: '-8%', opacity: 0 }}
        aria-hidden="true"
      >
        N
      </span>

      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center py-16 lg:py-24">

          {/* ── Left: Content ── */}
          <div>
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="section-eyebrow mb-4"
              style={{ opacity: 0 }}
            >
              {PERSONAL.credentials} · Lecturer
            </div>

            {/* Heading with letter-by-letter animation */}
            <h1
              className="font-serif text-[clamp(56px,7vw,80px)] font-bold leading-[1.0] text-navy mb-6 overflow-hidden"
              style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
              aria-label={PERSONAL.name}
            >
              {allLetters.map((letter, i) => {
                const isSecondName = i >= name1.length
                return (
                  <span
                    key={i}
                    ref={(el) => { lettersRef.current[i] = el }}
                    className="hero-letter inline-block mr-[0.05em]"
                    style={{
                      opacity: 0,
                      display: 'inline-block',
                      transformOrigin: '50% 100%',
                    }}
                  >
                    {isSecondName ? (
                      <span className="text-blue">{letter}</span>
                    ) : letter}
                  </span>
                )
              })}
            </h1>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="font-sans text-[clamp(16px,2vw,19px)] text-slate leading-relaxed max-w-[540px] mb-8"
              style={{ opacity: 0 }}
            >
              {PERSONAL.heroTagline}
            </p>

            {/* CTAs */}
            <div
              ref={btnsRef}
              className="flex flex-wrap gap-3 mb-8"
              style={{ opacity: 0 }}
            >
              <button
                onClick={scrollToAbout}
                className="btn-primary"
              >
                View My Journey
                <ArrowDown size={16} />
              </button>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="btn-secondary"
              >
                Get In Touch
              </a>
            </div>

            {/* Tags */}
            <div ref={tagsRef} className="flex flex-wrap gap-2">
              {['Project Management', 'Supply Chain', 'Operations', 'Fire & ELV Systems', 'Work-Based Learning'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div ref={photoRef} className="relative flex justify-center lg:justify-end" style={{ opacity: 0 }}>
            {/* Offset background block (3D layered effect) */}
            <div
              className="absolute rounded-[16px] bg-sky-tint"
              style={{
                width: '88%',
                height: '88%',
                top: '6%',
                left: '6%',
                transform: 'rotate(-3deg)',
                zIndex: 0,
              }}
            />
            {/* Blue accent block */}
            <div
              className="absolute rounded-[16px]"
              style={{
                width: '40%',
                height: '40%',
                bottom: '-4%',
                right: '-2%',
                background: 'var(--blue)',
                opacity: 0.08,
                transform: 'rotate(4deg)',
                zIndex: 0,
              }}
            />

            {/* Photo frame */}
            <div
              className="relative z-10 rounded-[16px] overflow-hidden shadow-[0_20px_60px_rgba(26,26,46,0.18)]"
              style={{ width: '90%', maxWidth: '380px' }}
            >
              <div className="aspect-[3/4] bg-sky-tint relative">
                <Image
                  src={PERSONAL.photo}
                  alt={`${PERSONAL.name} — ${PERSONAL.title}`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 90vw, 380px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                {/* Initials fallback */}
                <div className="absolute inset-0 flex items-center justify-center bg-sky-tint">
                  <span className="font-serif text-[80px] font-bold text-blue opacity-30">NJ</span>
                </div>
              </div>
            </div>

            {/* Floating credential badge */}
            <div
              ref={badgeRef}
              className="absolute bottom-6 left-0 z-20 bg-white rounded-card shadow-card border-l-4 border-blue px-4 py-3"
              style={{ opacity: 0, minWidth: '180px' }}
            >
              <div className="font-sans text-[11px] font-600 text-blue uppercase tracking-wide">UEL · AFHEA</div>
              <div className="font-serif text-[14px] font-bold text-navy mt-0.5">Lecturer</div>
              <div className="font-sans text-[11px] text-slate">Royal Docks School of Business & Law</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate hover:text-blue transition-colors group"
        aria-label="Scroll down"
      >
        <span className="font-sans text-[11px] uppercase tracking-widest font-500">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  )
}
