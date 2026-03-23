'use client'
import { useEffect, useRef } from 'react'
import { Globe, BookOpen, Users, Zap } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

const TRAITS = [
  { icon: Globe,    label: 'Strategic Thinker',      desc: 'Developing innovative solutions for complex global challenges.' },
  { icon: BookOpen, label: 'Inspiring Educator',      desc: 'Engaging learners with real-world industry insights.' },
  { icon: Users,    label: 'Leadership Trainer',      desc: 'Mentoring future business leaders at Master\'s level.' },
  { icon: Zap,      label: 'Culturally Adaptable',    desc: 'Thriving across India, South East Asia, Middle East, and the UK.' },
]

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Heading
        gsap.fromTo(headingRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true } }
        )

        // Text paragraphs
        if (textRef.current) {
          const paras = textRef.current.querySelectorAll('p')
          gsap.fromTo(paras,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: textRef.current, start: 'top 78%', once: true } }
          )
        }

        // Trait cards
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.trait-card')
          gsap.fromTo(cards,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', once: true } }
          )
        }
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-base bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Text */}
          <div>
            <div ref={headingRef}>
              <p className="section-eyebrow mb-3">About</p>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-navy mb-6 heading-underline">
                From the Field<br />to the Lecture Hall
              </h2>
            </div>

            <div ref={textRef} className="space-y-5 text-slate leading-relaxed">
              <p className="font-sans text-[16px]">
                Over 15 years of operational and leadership experience across{' '}
                <strong className="text-navy font-600">India, South East Asia, the Middle East, and the UK.</strong>{' '}
                Roles spanning ELV systems engineering, fire safety, supply chain, and commercial sales across companies
                including Teknoware, Heinrich, Watchdog Security, and Firelife Safety Enterprises.
              </p>
              <p className="font-sans text-[16px]">
                Moved to London in 2022 to complete an{' '}
                <strong className="text-navy font-600">MSc in International Business Management at UEL</strong>,
                graduating with Merit — including an 88% in Global Project Management.
              </p>
              <p className="font-sans text-[16px]">
                Now a{' '}
                <strong className="text-navy font-600">Lecturer in Work-Based Learning</strong> at the Royal Docks School
                of Business and Law, UEL — bridging academic frameworks with the practical realities of global business
                for the next generation of leaders.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary text-[13px] py-2.5 px-5">
                LinkedIn Profile
              </a>
              <a href={PERSONAL.uel} target="_blank" rel="noopener noreferrer" className="btn-secondary text-[13px] py-2.5 px-5">
                UEL Staff Page
              </a>
            </div>
          </div>

          {/* Right: Trait cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRAITS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="trait-card group card p-5 border-l-4 border-l-blue hover:border-l-navy"
                style={{ opacity: 0 }}
              >
                <div className="w-10 h-10 rounded-btn bg-sky-tint flex items-center justify-center mb-3 group-hover:bg-blue transition-colors duration-200">
                  <Icon size={18} className="text-blue group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-sans font-600 text-[14px] text-navy mb-1">{label}</h3>
                <p className="font-sans text-[13px] text-slate leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
