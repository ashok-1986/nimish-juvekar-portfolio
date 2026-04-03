'use client'
import { useEffect, useRef } from 'react'
import { Shield, Network, Target, BookOpen, Pen, Globe, ArrowUpRight, ExternalLink } from 'lucide-react'
import { FREELANCE_SERVICES } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = {
  shield: Shield,
  network: Network,
  target: Target,
  book: BookOpen,
  pen: Pen,
  globe: Globe,
}

export default function FreelanceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let gsap: typeof import('gsap').gsap | undefined

    const init = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap = gsapMod.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap!.fromTo('.freelance-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.freelance-heading', start: 'top 82%', once: true } }
        )

        const cards = sectionRef.current?.querySelectorAll('.freelance-card')
        cards?.forEach((card, i) => {
          gsap!.fromTo(card,
            { y: 40, opacity: 0, rotateX: 6, transformPerspective: 800 },
            {
              y: 0, opacity: 1, rotateX: 0,
              duration: 0.7, delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            }
          )
        })
      }, sectionRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="freelance"
      ref={sectionRef}
      className="section-base relative overflow-hidden bg-navy"
    >
      <span
        className="absolute font-serif font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(120px, 18vw, 220px)',
          color: 'rgba(255,255,255,0.03)',
          top: '-10px', right: 0,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >09</span>

      <div className="container relative z-10">
        <div className="freelance-heading mb-14" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Available For Hire</p>
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold text-white heading-underline">
            Freelance Services
          </h2>
          <p className="font-sans text-[15px] mt-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Leveraging 15+ years of industry expertise and elite academic credentials to deliver tailored consultancy solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FREELANCE_SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Globe
            return (
              <div
                key={i}
                className="freelance-card group rounded-2xl p-6 relative overflow-hidden"
                style={{
                  opacity: 0,
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-6px) scale(1.01)'
                  el.style.boxShadow = '0 16px 48px rgba(10,102,194,0.2)'
                  el.style.borderColor = 'rgba(10,102,194,0.3)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0) scale(1)'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(10,102,194,0.1) 0%, transparent 70%)' }}
                />

                <div className="flex items-start gap-3 mb-5 relative z-10">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(10,102,194,0.15)', color: '#0A66C2' }}
                  >
                    <Icon size={20} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/40 group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 ml-auto"
                  />
                </div>

                <h3 className="font-serif text-[17px] font-bold text-white mb-3 leading-snug group-hover:text-blue/90 transition-colors duration-200 relative z-10">
                  {service.title}
                </h3>

                <p className="font-sans text-[13px] leading-relaxed mb-5 relative z-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 relative z-10">
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] font-500 px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(10,102,194,0.12)',
                        color: '#6BADE6',
                        border: '1px solid rgba(10,102,194,0.2)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {service.projects && (
                  <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                    <div className="flex flex-wrap gap-3">
                      {service.projects.map((p, j) => (
                        <a
                          key={j}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] text-blue hover:text-blue/80 transition-colors"
                        >
                          {p.name}
                          <ExternalLink size={9} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <a
            href="mailto:drievu.nimish@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 transition-colors"
          >
            Get In Touch
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
