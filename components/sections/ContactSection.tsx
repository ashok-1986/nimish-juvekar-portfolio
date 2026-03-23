'use client'
import { useEffect, useRef } from 'react'
import { Mail, Linkedin, MapPin, ExternalLink } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

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
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  // Load Fillout embed script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

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
            Let&apos;s Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16">

          {/* Left: Info */}
          <div className="contact-left" style={{ opacity: 0 }}>
            <p className="font-sans text-[15px] text-slate leading-relaxed mb-8">
              Whether you&apos;re a student, an employer, an academic, or a professional looking to collaborate — I&apos;d be glad to hear from you.
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

          {/* Right: Fillout Form Embed */}
          <div className="contact-right" style={{ opacity: 0 }}>
            <div
              style={{ width: '100%', height: '650px' }}
              data-fillout-id="mqFrn93ebTus"
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
