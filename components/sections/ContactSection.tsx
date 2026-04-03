'use client'

import { useEffect, useRef } from 'react'
import { Mail, Phone } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const filloutLoaded = useRef(false)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let gsap: typeof import('gsap').gsap | undefined

    const init = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap = gsapMod.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap!.fromTo('.contact-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-heading', start: 'top 82%', once: true } }
        )

        gsap!.fromTo('.contact-info',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-info', start: 'top 85%', once: true } }
        )

        gsap!.fromTo('.contact-form-wrap',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.25, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 85%', once: true } }
        )
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  // Load Fillout embed script
  useEffect(() => {
    if (filloutLoaded.current) return
    filloutLoaded.current = true
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '50px 0', background: 'linear-gradient(135deg, #EAF2FB 0%, #F9F8F6 100%)' }}
    >
      <div className="container relative z-10">
        <div className="contact-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3">Connect</p>
          <h2 className="font-serif text-[clamp(28px,5vw,52px)] font-bold text-navy heading-underline">
            Get In Touch
          </h2>
          <p className="font-sans text-[15px] text-slate mt-6 max-w-lg mx-auto text-center">
            Interested in collaborating or have a question? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="contact-info col-span-1 md:col-span-2 space-y-6" style={{ opacity: 0 }}>
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 24px rgba(10,102,194,0.07)',
              }}
            >
              <h3 className="font-serif text-[18px] font-bold text-navy mb-5">Contact Details</h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-600 uppercase tracking-wider text-slate mb-0.5">Primary Email</p>
                    <p className="font-sans text-[13px] text-blue group-hover:underline">{PERSONAL.email}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${PERSONAL.emailUEL}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-600 uppercase tracking-wider text-slate mb-0.5">UEL Official</p>
                    <p className="font-sans text-[13px] text-blue group-hover:underline">{PERSONAL.emailUEL}</p>
                  </div>
                </a>

                <a
                  href={`tel:${PERSONAL.phone}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}>
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-600 uppercase tracking-wider text-slate mb-0.5">Phone</p>
                    <p className="font-sans text-[13px] text-navy group-hover:text-blue transition-colors">{PERSONAL.phone}</p>
                  </div>
                </a>

                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(10,102,194,0.1)', color: '#0A66C2' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-600 uppercase tracking-wider text-slate mb-0.5">LinkedIn</p>
                    <p className="font-sans text-[13px] text-blue group-hover:underline">Connect with me</p>
                  </div>
                </a>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: 'linear-gradient(135deg, #0A66C2 0%, #0D4F9A 100%)',
                color: '#FFFFFF',
              }}
            >
              <p className="font-serif text-[15px] font-bold text-white mb-1">Location</p>
              <p className="font-sans text-[13px] text-white/80">{PERSONAL.location}</p>
            </div>
          </div>

          {/* Fillout Contact Form */}
          <div className="contact-form-wrap col-span-1 md:col-span-3 rounded-2xl overflow-hidden"
            style={{
              opacity: 0,
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 24px rgba(10,102,194,0.07)',
            }}
          >
            <div
              style={{ width: '100%', height: '580px' }}
              data-fillout-id="9e37tHoVeNus"
              data-fillout-embed-type="standard"
              data-fillout-inherit-parameters
              data-fillout-dynamic-resize
            />
          </div>
        </div>
      </div>
    </section>
  )
}
