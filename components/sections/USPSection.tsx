"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { uspContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function USPSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [headerRef.current, cardsRef.current?.children || []],
        { opacity: 1, y: 0, rotateX: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        transformPerspective: 800,
        rotateX: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-navy"
    >
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-serif text-clamp-section-h2 font-semibold text-white mb-4">
            {uspContent.title}
          </h2>
          <p className="text-lg text-white/70 mb-4">{uspContent.subtitle}</p>
          <blockquote className="text-xl italic text-white/80 max-w-2xl mx-auto leading-relaxed">
            &quot;{uspContent.quote}&quot;
          </blockquote>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {uspContent.cards.map((card, index) => (
            <div
              key={index}
              className="glass-dark bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
