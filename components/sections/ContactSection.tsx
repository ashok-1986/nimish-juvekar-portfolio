'use client'
import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo('.contact-left',
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
        )
        gsap.fromTo('.contact-right',
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
        )
        // Form fields stagger
        const fields = sectionRef.current?.querySelectorAll('.form-field')
        if (fields) {
          gsap.fromTo(fields,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.3,
              scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
          )
        }
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name = 'Name is required'
    if (!form.email.trim())   e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setFormState('loading')

    try {
      // Replace 'YOUR_FORMSPREE_ID' with actual Formspree endpoint
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setFormState('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const inputClass = (field: string) =>
    `w-full font-sans text-[14px] text-navy bg-white border rounded-btn px-4 py-3 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue placeholder:text-slate/50 ${
      errors[field] ? 'border-red-400' : 'border-mist hover:border-slate/50'
    }`

  const CONTACT_LINKS = [
    { icon: Mail,     label: 'Email',    value: PERSONAL.email,    href: `mailto:${PERSONAL.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/nimishjuvekar', href: PERSONAL.linkedin },
    { icon: MapPin,   label: 'Location', value: PERSONAL.location, href: null },
  ]

  return (
    <section id="contact" ref={sectionRef} className="section-base bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-3">Get In Touch</p>
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-navy">
            Let's Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16">

          {/* Left: Info */}
          <div className="contact-left" style={{ opacity: 0 }}>
            <p className="font-sans text-[15px] text-slate leading-relaxed mb-8">
              Whether you're a student, an employer, an academic, or a professional looking to collaborate — I'd be glad to hear from you.
            </p>

            <div className="space-y-4 mb-8">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-btn bg-sky-tint flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue" />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-600 text-slate uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="font-sans text-[14px] text-navy hover:text-blue transition-colors font-500"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-sans text-[14px] text-navy">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ORCID */}
            <div className="p-4 rounded-card bg-sky-tint border border-blue/10">
              <p className="font-sans text-[11px] font-600 text-blue uppercase tracking-wide mb-1">ORCID</p>
              <a
                href={PERSONAL.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[13px] text-navy hover:text-blue transition-colors"
              >
                {PERSONAL.orcidId}
              </a>
            </div>

            {/* External links */}
            <div className="mt-6 flex flex-col gap-3">
              <a href={PERSONAL.uel} target="_blank" rel="noopener noreferrer" className="btn-primary text-[13px] py-2.5 justify-center">
                View UEL Staff Profile
              </a>
              <a href={PERSONAL.gamma} target="_blank" rel="noopener noreferrer" className="btn-secondary text-[13px] py-2.5 justify-center">
                Gamma Site
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-right" style={{ opacity: 0 }}>
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle size={48} className="text-blue mb-4" />
                <h3 className="font-serif text-[24px] font-bold text-navy mb-2">Message Sent</h3>
                <p className="font-sans text-[15px] text-slate">
                  Thanks — Nimish will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="btn-secondary mt-6 text-[13px]"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-field" style={{ opacity: 0 }}>
                    <label htmlFor="name" className="font-sans text-[12px] font-600 text-navy mb-1.5 block">
                      Full Name *
                    </label>
                    <input
                      id="name" type="text" name="name"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={inputClass('name')}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="font-sans text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div className="form-field" style={{ opacity: 0 }}>
                    <label htmlFor="email" className="font-sans text-[12px] font-600 text-navy mb-1.5 block">
                      Email Address *
                    </label>
                    <input
                      id="email" type="email" name="email"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className={inputClass('email')}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="font-sans text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="form-field" style={{ opacity: 0 }}>
                  <label htmlFor="subject" className="font-sans text-[12px] font-600 text-navy mb-1.5 block">
                    Subject
                  </label>
                  <select
                    id="subject" name="subject"
                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className={`${inputClass('subject')} cursor-pointer`}
                  >
                    <option value="">Select a subject...</option>
                    <option value="Student Enquiry">Student Enquiry</option>
                    <option value="Industry Partnership">Industry Partnership</option>
                    <option value="Academic Collaboration">Academic Collaboration</option>
                    <option value="Speaking / Training">Speaking / Training</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-field" style={{ opacity: 0 }}>
                  <label htmlFor="message" className="font-sans text-[12px] font-600 text-navy mb-1.5 block">
                    Message *
                  </label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell Nimish what's on your mind..."
                    className={`${inputClass('message')} resize-none`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <p id="message-error" className="font-sans text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Error state */}
                {formState === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-btn bg-red-50 border border-red-200">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                    <p className="font-sans text-[13px] text-red-600">
                      Something went wrong. Please try emailing directly at {PERSONAL.email}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="form-field pt-1" style={{ opacity: 0 }}>
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'var(--blue)', borderColor: 'var(--blue)' }}
                  >
                    {formState === 'loading' ? (
                      <>
                        <span className="animate-spin">⟳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                  <p className="font-sans text-[11px] text-slate text-center mt-2">
                    Or email directly at{' '}
                    <a href={`mailto:${PERSONAL.email}`} className="text-blue hover:underline">
                      {PERSONAL.email}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
