'use client'
import { useEffect, useRef, useState } from 'react'
import { Menu, X, Download, FileText } from 'lucide-react'
import { PERSONAL } from '@/lib/data'
import Lenis from 'lenis'

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Teaching',       href: '#teaching' },
  { label: 'Qualifications', href: '#qualifications' },
  { label: 'Contact',        href: '#contact' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis for navbar scroll
    lenisRef.current = (window as any).__lenis
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href) as HTMLElement | null
    if (el) {
      // Use Lenis if available for smooth scroll
      const lenis = (window as any).__lenis as Lenis | undefined
      if (lenis) {
        lenis.scrollTo(href, { offset: -80, duration: 1.5 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="container">
          <nav
            className="flex items-center justify-between h-16 md:h-18"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="font-serif text-[17px] font-bold tracking-wide text-navy hover:text-blue transition-colors"
              aria-label="Go to top"
            >
              Nimish Juvekar
            </button>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`relative font-sans text-[13px] font-500 transition-colors pb-1 group ${
                      activeSection === link.href.slice(1)
                        ? 'text-blue'
                        : 'text-slate hover:text-navy'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-blue rounded transition-all duration-300 ${
                        activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-[13px] py-2 px-4"
              >
                <FileText size={14} />
                Download CV
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-btn text-navy hover:text-blue transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-navy transition-opacity duration-300 ${
            menuOpen ? 'opacity-60' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-ivory shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <ul className="space-y-2" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left font-serif text-2xl font-bold text-navy hover:text-blue transition-colors py-3 border-b border-mist"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3">
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-[13px]"
              >
                <FileText size={14} />
                Download CV
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-[13px]"
              >
                <Download size={14} />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
