"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { heroContent } from "@/lib/data";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [credentialsRef.current, titleRef.current, subtitleRef.current, descRef.current, ctaRef.current, scrollRef.current],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(credentialsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          titleRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          scrollRef.current,
          {
            y: 10,
            opacity: 0,
            duration: 0.4,
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-ivory"
    >
      <div className="max-w-4xl mx-auto text-center">
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
          className="text-lg md:text-xl text-slate mb-8 max-w-2xl mx-auto"
        >
          {heroContent.subtitle}
        </p>

        <p
          ref={descRef}
          className="text-base text-slate mb-12 max-w-xl mx-auto leading-relaxed"
        >
          {heroContent.description}
        </p>

        <a
          ref={ctaRef}
          href="#experience"
          className="inline-flex items-center gap-2 bg-blue text-white px-8 py-4 rounded-lg font-medium transition-all hover:bg-blue/90 hover:shadow-lg hover:shadow-blue/25"
        >
          {heroContent.cta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate"
      >
        <span className="text-xs tracking-widest uppercase">
          {heroContent.scrollIndicator}
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-blue rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
