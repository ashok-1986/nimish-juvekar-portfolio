'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLHeadingElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const bottomLogosRef = useRef<HTMLDivElement>(null)
  const topNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let isMounted = true
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const init = async () => {
      const gsapMod = await import('gsap')
      if (!isMounted) return
      const gsap = gsapMod.gsap

      ctx = gsap.context(() => {
        if (prefersReducedMotion) {
          gsap.set([
            portraitRef.current, layer1Ref.current, layer2Ref.current, 
            layer3Ref.current, leftContentRef.current, rightContentRef.current, 
            bottomLogosRef.current, topNavRef.current
          ], { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
          return
        }

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // 1. Base Structure fade in
        tl.from(topNavRef.current, { y: -20, opacity: 0, duration: 1 }, 0)
          .from(layer1Ref.current, { opacity: 0, y: 30, duration: 1.5 }, 0.2)
          .fromTo(layer2Ref.current, { opacity: 0, scale: 0.8 }, { opacity: 0.15, scale: 1, duration: 1.5 }, 0.3)
          
        // 2. Layer 3 Typography Reveal
        // Mask wipe up for the massive text
        tl.fromTo(layer3Ref.current, 
          { clipPath: 'inset(100% 0% 0% 0%)', y: 50 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.2, ease: 'power3.out' },
          0.4
        )

        // 3. Layer 4 Image Reveal (GSAP Wipe Up + Scale)
        tl.fromTo(portraitRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05, opacity: 0 },
          { clipPath: 'inset(0% 0% -10% 0%)', scale: 1, opacity: 1, duration: 1.6, ease: 'power3.inOut' },
          0.6
        )

        // 4. Foreground UI
        tl.from(leftContentRef.current, { x: -30, opacity: 0, duration: 1 }, 1.2)
          .from(rightContentRef.current, { x: 30, opacity: 0, duration: 1 }, 1.3)
          .from(bottomLogosRef.current?.children || [], { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.4)
          
      }, containerRef)
    }

    init()
    return () => {
      isMounted = false
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col md:block"
      style={{
        minHeight: '100svh',
        backgroundColor: '#FAFAFA',
        color: '#001621',
        overflow: 'hidden',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: Background Watermark (z-index: 0)
          ───────────────────────────────────────────────────────────── */}
      <div 
        ref={layer1Ref}
        className="absolute top-0 left-0 w-full flex justify-center pt-8 pointer-events-none select-none"
        style={{ zIndex: 0, opacity: 0 }}
        aria-hidden="true"
      >
        <span 
          style={{
            fontFamily: '"Times New Roman", serif',
            fontWeight: 700,
            fontSize: '15vw',
            opacity: 0.03,
            color: '#001621',
            lineHeight: 0.8,
            letterSpacing: '-0.02em'
          }}
        >
          NIMISH
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: Halftone Dotted Circle (z-index: 1)
          ───────────────────────────────────────────────────────────── */}
      <div 
        ref={layer2Ref}
        className="absolute top-[40%] md:top-1/2 left-1/2 pointer-events-none"
        style={{ 
          zIndex: 1,
          opacity: 0,
          width: 'clamp(300px, 40vw, 600px)',
          aspectRatio: '1/1',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundImage: 'radial-gradient(circle, #FF4103 1.5px, transparent 2px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: Massive Typography (z-index: 2)
          ───────────────────────────────────────────────────────────── */}
      <div 
        className="absolute top-[35%] md:top-1/2 left-1/2 pointer-events-none"
        style={{ 
          zIndex: 2,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1 
          ref={layer3Ref}
          style={{
            fontFamily: '"Times New Roman", serif',
            textTransform: 'uppercase',
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            color: '#001621',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            clipPath: 'inset(100% 0% 0% 0%)',
          }}
        >
          NIMISH
        </h1>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: The Subject Portrait (z-index: 3)
          ───────────────────────────────────────────────────────────── */}
      <div 
        className="relative md:absolute bottom-0 md:left-1/2 md:translate-x-[-50%] mt-[40vh] md:mt-0 w-full md:w-[600px] h-[50vh] md:h-[85vh] pointer-events-none flex justify-center items-end"
        style={{ zIndex: 3 }}
      >
        <div 
          ref={portraitRef}
          className="relative w-full h-full max-w-[500px]"
          style={{
            opacity: 0,
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            clipPath: 'inset(100% 0% 0% 0%)',
          }}
        >
          <Image
            src="/images/nimish.jpg"
            alt="Nimish Juvekar"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            priority
            className="object-cover object-top md:object-[center_15%]"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 5: Foreground UI & Floating Content (z-index: 10)
          ───────────────────────────────────────────────────────────── */}
      <div 
        className="absolute inset-0 pointer-events-none flex flex-col justify-between"
        style={{ zIndex: 10 }}
      >
        {/* Top Navigation */}
        <div 
          ref={topNavRef}
          className="flex items-center justify-between pointer-events-auto"
          style={{ padding: '2rem 5%', opacity: 0 }}
        >
          <div className="font-serif font-bold text-lg" style={{ color: '#001621', letterSpacing: '0.05em' }}>
            ✻ NIMISH
          </div>
          
          <div className="hidden md:flex gap-8" style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', color: '#001621' }}>
            <Link href="#qualifications" className="nav-link hover:text-tangerine transition-colors">Academic</Link>
            <Link href="#freelance" className="nav-link hover:text-tangerine transition-colors">Consultancy</Link>
            <Link href="#experience" className="nav-link hover:text-tangerine transition-colors">Experience</Link>
            <Link href="#contact" className="nav-link hover:text-tangerine transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '14px', color: '#001621', fontStyle: 'italic' }} className="hidden sm:inline">
              Open for collaborations
            </span>
          </div>
        </div>

        {/* Floating Left Content (Hidden on Mobile) */}
        <div 
          ref={leftContentRef}
          className="hidden md:block absolute pointer-events-auto"
          style={{ left: 'max(5%, 80px)', top: '50%', transform: 'translateY(-50%)', maxWidth: '300px', opacity: 0 }}
        >
          <p 
            style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', color: '#001621', lineHeight: 1.5, marginBottom: '1.5rem' }}
          >
            Hey there! I&apos;m a Lecturer & Global Project Manager specializing in operational strategy and applied business frameworks.
          </p>
          <a 
            href="#projects"
            className="inline-block transition-colors duration-300"
            style={{ fontFamily: '"Times New Roman", serif', fontWeight: 700, fontSize: '16px', color: '#001621', letterSpacing: '0.05em' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF4103'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#001621'}
          >
            // VIEW RESEARCH →
          </a>
        </div>

        {/* Floating Right Content (Expertise List) (Hidden on Mobile) */}
        <div 
          ref={rightContentRef}
          className="hidden md:flex flex-col text-right absolute pointer-events-auto"
          style={{ right: '5%', top: '50%', transform: 'translateY(-50%)', gap: '0.5rem', opacity: 0 }}
        >
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', color: '#001621', opacity: 0.4 }}>Global Strategy</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', color: '#001621', opacity: 0.4 }}>Intelligence-Led Business Systems</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', color: '#FF4103', opacity: 1, fontWeight: 600 }}>Project Management</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', color: '#001621', opacity: 0.4 }}>Academic Research</div>
        </div>

        {/* Bottom Marquee / Partner Logos */}
        <div 
          ref={bottomLogosRef}
          className="w-full flex items-center justify-evenly pointer-events-auto"
          style={{ paddingBottom: '2rem', opacity: 0 }}
        >
          {/* UEL */}
          <div className="group cursor-pointer transition-all duration-300 opacity-40 hover:opacity-100 hover:text-tangerine text-obsidian grayscale hover:grayscale-0">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <rect x="0" y="10" width="20" height="20" rx="4" />
              <text x="30" y="25" fontFamily="'Times New Roman', serif" fontSize="18" fontWeight="bold">UEL London</text>
            </svg>
          </div>
          {/* Alchemetryx */}
          <div className="group cursor-pointer transition-all duration-300 opacity-40 hover:opacity-100 hover:text-tangerine text-obsidian grayscale hover:grayscale-0">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <polygon points="10,30 20,10 30,30" />
              <text x="35" y="25" fontFamily="'Times New Roman', serif" fontSize="18" fontWeight="bold">Alchemetryx</text>
            </svg>
          </div>
          {/* Placeholder 1 */}
          <div className="group hidden sm:block cursor-pointer transition-all duration-300 opacity-40 hover:opacity-100 hover:text-tangerine text-obsidian grayscale hover:grayscale-0">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <circle cx="15" cy="20" r="10" />
              <text x="35" y="25" fontFamily="'Times New Roman', serif" fontSize="18" fontWeight="bold">Advance HE</text>
            </svg>
          </div>
          {/* Placeholder 2 */}
          <div className="group hidden md:block cursor-pointer transition-all duration-300 opacity-40 hover:opacity-100 hover:text-tangerine text-obsidian grayscale hover:grayscale-0">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <rect x="0" y="10" width="10" height="20" />
              <rect x="15" y="10" width="10" height="20" />
              <text x="35" y="25" fontFamily="'Times New Roman', serif" fontSize="18" fontWeight="bold">CMI Global</text>
            </svg>
          </div>
          {/* Placeholder 3 */}
          <div className="group hidden lg:block cursor-pointer transition-all duration-300 opacity-40 hover:opacity-100 hover:text-tangerine text-obsidian grayscale hover:grayscale-0">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
              <path d="M0,20 Q10,0 20,20 T40,20" stroke="currentColor" strokeWidth="4" fill="none" />
              <text x="50" y="25" fontFamily="'Times New Roman', serif" fontSize="18" fontWeight="bold">CABS</text>
            </svg>
          </div>
        </div>
      </div>
      
      {/* ─────────────────────────────────────────────────────────────
          MOBILE ONLY FALLBACK (Below Hero)
          ───────────────────────────────────────────────────────────── */}
      <div className="md:hidden relative z-20 px-6 pb-16 bg-zinc flex flex-col gap-8">
        <div>
          <p 
            style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#001621', lineHeight: 1.6, marginBottom: '1.25rem' }}
          >
            Hey there! I&apos;m a Lecturer & Global Project Manager specializing in operational strategy and applied business frameworks.
          </p>
          <a 
            href="#projects"
            className="inline-block"
            style={{ fontFamily: '"Times New Roman", serif', fontWeight: 700, fontSize: '16px', color: '#FF4103', letterSpacing: '0.05em' }}
          >
            // VIEW RESEARCH →
          </a>
        </div>
        
        <div className="flex flex-col gap-2 pt-6 border-t border-border">
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#001621', opacity: 0.6 }}>Global Strategy</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#001621', opacity: 0.6 }}>Intelligence-Led Business Systems</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#FF4103', opacity: 1, fontWeight: 600 }}>Project Management</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#001621', opacity: 0.6 }}>Academic Research</div>
        </div>
      </div>
    </section>
  )
}
