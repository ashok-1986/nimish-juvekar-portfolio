'use client'
import { Linkedin, Mail, ExternalLink } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

const QUICK_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Teaching',       href: '#teaching' },
  { label: 'Qualifications', href: '#qualifications' },
  { label: 'Contact',        href: '#contact' },
]

const EXTERNAL_LINKS = [
  { label: 'UEL Staff Profile', href: PERSONAL.uel },
  { label: 'LinkedIn',          href: PERSONAL.linkedin },
  { label: 'ORCID Profile',     href: PERSONAL.orcid },
  { label: 'Gamma Site',        href: PERSONAL.gamma },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)' }} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-10 border-b border-white/10">

          {/* Brand */}
          <div>
            <p className="font-serif text-[20px] font-bold text-white mb-2">{PERSONAL.name}</p>
            <p className="font-sans text-[13px] mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {PERSONAL.title}
            </p>
            <p className="font-sans text-[12px] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {PERSONAL.school}
            </p>
            <div className="flex gap-3">
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-btn flex items-center justify-center transition-colors duration-200"
                style={{ background: 'rgba(10,102,194,0.2)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.2)' }}
              >
                <Linkedin size={16} className="text-white" />
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                aria-label="Send email"
                className="w-9 h-9 rounded-btn flex items-center justify-center transition-colors duration-200"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
              >
                <Mail size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-sans text-[11px] font-600 uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Navigation
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="font-sans text-[13px] transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div>
            <h3 className="font-sans text-[11px] font-600 uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              External Links
            </h3>
            <ul className="space-y-2">
              {EXTERNAL_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] transition-colors duration-200 inline-flex items-center gap-1.5"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
                  >
                    <ExternalLink size={11} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} {PERSONAL.name} · Built with purpose.
          </p>
          <p className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Next.js · TypeScript · Tailwind · GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
