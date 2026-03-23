"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { heroContent } from "@/lib/data";

export default function HeroSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLSpanElement>(null);
  const titleRef      = useRef<HTMLHeadingElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const descRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLAnchorElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const photoRef      = useRef<HTMLDivElement>(null);
  const badgeRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [credentialsRef.current, titleRef.current, subtitleRef.current,
           descRef.current, ctaRef.current, scrollRef.current,
           photoRef.current, badgeRef.current],
          { opacity: 1, y: 0, x: 0, scale: 1, rotateY: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Photo slides in from right with subtle 3D tilt
      tl.from(photoRef.current, {
        x: 80,
        opacity: 0,
        rotateY: 8,
        duration: 1.1,
        ease: "power4.out",
        transformPerspective: 800,
      }, 0.2)

      // Badge pops in
      .from(badgeRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, 0.9)

      // Credentials
      .from(credentialsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, 0.3)

      // Title words
      .from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
      }, 0.45)

      // Subtitle
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
      }, 0.65)

      // Description
      .from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, 0.75)

      // CTA
      .from(ctaRef.current, {
        y: 16,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
      }, 0.85)

      // Scroll indicator
      .from(scrollRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.4,
      }, 1.0)
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle parallax on photo while scrolling down through hero
  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = containerRef.current?.offsetHeight || window.innerHeight;
      if (scrollY > heroHeight) return;
      const progress = scrollY / heroHeight;
      photo.style.transform = `translateY(${progress * -40}px) scale(${1 + progress * 0.02})`
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-ivory overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8C4BC 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }}
      />

      {/* Decorative large letter */}
      <span
        className="absolute select-none pointer-events-none font-serif font-bold"
        style={{
          fontSize: 'clamp(200px, 30vw, 380px)',
          color: '#F0EDE8',
          right: '-2%',
          bottom: '-8%',
          lineHeight: 1,
          zIndex: 0,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        N
      </span>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center lg:text-left lg:max-w-none lg:w-full">
        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-16 lg:items-center">

          {/* Left: Text */}
          <div>
            <span
              ref={credentialsRef}
              className="inline-block text-blue text-xs md:text-sm font-medium mb-6 tracking-[0.2em] uppercase"
            >
              {heroContent.credentials}
            </span>

            <h1
              ref={titleRef}
              className="font-serif text-clamp-hero font-semibold text-navy mb-6 leading-tight"
            >
              {heroContent.name}
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-slate mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {heroContent.subtitle}
            </p>

            <p
              ref={descRef}
              className="text-base text-slate mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {heroContent.description}
            </p>

            <a
              ref={ctaRef}
              href="#experience"
              className="inline-flex items-center gap-2 bg-blue text-white px-8 py-4 rounded-lg font-medium transition-all hover:bg-blue/90 hover:shadow-lg hover:shadow-blue/25 hover:-translate-y-0.5"
            >
              {heroContent.cta}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Right: Animated Photo */}
          <div ref={photoRef} className="hidden lg:block relative" style={{ willChange: 'transform' }}>
            {/* Offset background block */}
            <div
              className="absolute rounded-2xl bg-sky-tint"
              style={{
                inset: 0,
                transform: 'rotate(-3deg) scale(1.06)',
                zIndex: 0,
              }}
            />
            {/* Blue accent block */}
            <div
              className="absolute rounded-2xl"
              style={{
                width: '40%', height: '40%',
                bottom: '-4%', right: '-4%',
                background: 'var(--blue, #0A66C2)',
                opacity: 0.07,
                transform: 'rotate(4deg)',
                zIndex: 0,
              }}
            />

            {/* Photo */}
            <div
              className="relative z-10 rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '3/4',
                boxShadow: '0 20px 60px rgba(26,26,46,0.18)',
              }}
            >
              <img
                src="/images/nimish.jpg"
                alt="Nimish Juvekar — Lecturer, University of East London"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Credential badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-4 -left-4 z-20 bg-white rounded-xl shadow-lg px-4 py-3"
              style={{ borderLeft: '4px solid #0A66C2', minWidth: '160px' }}
            >
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.06em' }}>UEL · AFHEA</p>
              <p style={{ fontFamily: 'Times New Roman, serif', fontSize: '15px', fontWeight: 700, color: '#1A1A2E', marginTop: '2px' }}>Lecturer</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#5A5A6E', marginTop: '1px' }}>Royal Docks School of Business & Law</p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate"
      >
        <span className="text-xs tracking-widest uppercase">{heroContent.scrollIndicator}</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-blue rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}