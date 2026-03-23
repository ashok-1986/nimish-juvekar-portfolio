'use client'
import { useEffect, useRef } from 'react'
import { BookOpen, Award, ExternalLink } from 'lucide-react'
import { TEACHING, PERSONAL } from '@/lib/data'

export default function TeachingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scoreRef   = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Cards stagger in
        const cards = sectionRef.current?.querySelectorAll('.teach-card')
        if (cards) {
          gsap.fromTo(cards,
            { y: 40, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
          )
        }

        // 88% counter
        if (scoreRef.current) {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: 88, duration: 1.5, ease: 'power2.out',
            scrollTrigger: { trigger: scoreRef.current, start: 'top 80%', once: true },
            onUpdate() { if (scoreRef.current) scoreRef.current.textContent = Math.round(obj.val).toString() },
          })
        }
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section id="teaching" ref={sectionRef} className="section-base" style={{ background: 'var(--sky-tint)' }}>
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Academic</p>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-navy">
            Teaching at UEL
          </h2>
          <p className="font-sans text-[15px] text-slate mt-4 max-w-xl mx-auto">
            Royal Docks School of Business and Law · University of East London
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main teaching card */}
          <div className="teach-card lg:col-span-2 card p-8" style={{ opacity: 0 }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-btn bg-sky-tint flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} className="text-blue" />
              </div>
              <div>
                <h3 className="font-serif text-[20px] font-bold text-navy">Lecturer (Work-Based Learning)</h3>
                <p className="font-sans text-[13px] text-blue font-600 mt-0.5">Level 7 — Master's Programme · Sep 2023–Present</p>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-3 mb-6">
              {TEACHING.modules.map((mod, i) => (
                <div key={i} className="flex items-center justify-between gap-4 p-3 rounded-btn bg-sky-tint">
                  <span className="font-sans text-[13px] font-500 text-navy">{mod.name}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-sans text-[11px] text-slate">{mod.level}</span>
                    {mod.score && (
                      <span className="tag bg-blue text-white border-blue text-[10px] py-0.5 px-2">{mod.score}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Philosophy */}
            <blockquote className="border-l-4 border-blue pl-4 italic text-slate font-sans text-[14px] leading-relaxed">
              "{TEACHING.philosophy}"
            </blockquote>
          </div>

          {/* Right column: stat + approach */}
          <div className="space-y-6">
            {/* 88% score card */}
            <div className="teach-card card p-6 text-center" style={{ opacity: 0 }}>
              <div className="flex items-end justify-center gap-0.5 mb-1">
                <span ref={scoreRef} className="font-serif text-[56px] font-bold text-blue leading-none">0</span>
                <span className="font-serif text-[32px] font-bold text-blue mb-1">%</span>
              </div>
              <p className="font-sans text-[12px] font-600 text-navy">Global Project Management</p>
              <p className="font-sans text-[11px] text-slate mt-1">MSc Module Score · UEL 2023</p>
              <div className="mt-3 pt-3 border-t border-mist">
                <p className="font-sans text-[12px] text-slate italic">Knows the material from both sides of the desk.</p>
              </div>
            </div>

            {/* ORCID / credentials */}
            <div className="teach-card card p-5" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-blue" />
                <span className="font-sans text-[12px] font-600 text-navy uppercase tracking-wide">Credentials</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[12px] text-slate">Advance HE</span>
                  <span className="tag text-[10px] bg-sky-tint text-blue border-blue/30">AFHEA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[12px] text-slate">CMI</span>
                  <span className="tag text-[10px] bg-sky-tint text-blue border-blue/30">Level 7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[12px] text-slate">ORCID</span>
                  <span className="font-mono text-[10px] text-slate">0009-0000-4319-2899</span>
                </div>
              </div>
              <a
                href={PERSONAL.uel}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1.5 font-sans text-[12px] text-blue hover:text-navy transition-colors font-500"
              >
                <ExternalLink size={12} /> UEL Staff Profile
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
