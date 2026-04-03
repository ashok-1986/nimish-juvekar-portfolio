'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, Send } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

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

        gsap!.fromTo('.contact-form',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.25, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true } }
        )
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        setFormState('success')
        form.reset()
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  useEffect(() => {
    if (formState === 'success' || formState === 'error') {
      const el = document.getElementById('form-status')
      el?.focus()
    }
  }, [formState])

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
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold text-navy heading-underline">
            Get In Touch
          </h2>
          <p className="font-sans text-[15px] text-slate mt-6 max-w-lg mx-auto text-center">
            Interested in collaborating or have a question? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="contact-info md:col-span-2 space-y-6" style={{ opacity: 0 }}>
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

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-form md:col-span-3 space-y-5 rounded-2xl p-8"
            style={{
              opacity: 0,
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 24px rgba(10,102,194,0.07)',
            }}
            aria-label="Contact form"
          >
            <div id="form-status" tabIndex={-1} aria-live="polite" aria-atomic="true" className="sr-only">
              {formState === 'success' && 'Message sent successfully'}
              {formState === 'error' && 'Error sending message. Please try again.'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                <input
                  type="text" id="name" name="name" required autoComplete="name"
                  className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email</label>
                <input
                  type="email" id="email" name="email" required autoComplete="email"
                  className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-navy mb-1.5">Subject</label>
              <select
                id="subject" name="subject" required
                className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-colors"
              >
                <option value="">Select a subject</option>
                {['Academic Collaboration', 'Industry Partnership', 'Student Inquiry', 'Speaking Engagement', 'General Inquiry'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">Message</label>
              <textarea
                id="message" name="message" required rows={5}
                className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit" disabled={formState === 'submitting'} aria-busy={formState === 'submitting'}
              className="w-full py-3.5 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 focus:ring-2 focus:ring-blue/40 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={16} />
              {formState === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {formState === 'success' && (
              <p role="status" className="text-green-600 text-sm text-center font-medium">
                Thank you! Your message has been sent successfully.
              </p>
            )}
            {formState === 'error' && (
              <p role="alert" className="text-red-600 text-sm text-center font-medium">
                Something went wrong. Please try again or email directly at{' '}
                <a href={`mailto:${PERSONAL.email}`} className="underline hover:text-blue">
                  {PERSONAL.email}
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
