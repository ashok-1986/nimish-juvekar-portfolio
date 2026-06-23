"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(".reveal-text", { y: "0%" });
        gsap.set(".hero-fade-in", { opacity: 1, y: 0 });
        return;
      }

      gsap.to(".reveal-text", {
        y: "0%",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-fade-in", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center bg-zinc px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto w-full pt-20">
        <div className="max-w-4xl">
          {/* Subhead Reveal */}
          <div className="reveal-mask mb-6">
            <p className="reveal-text subhead text-obsidian">
              Industry. Meets Academia.
            </p>
          </div>

          {/* H1 Reveal */}
          <div className="reveal-mask mb-8">
            <h1 className="reveal-text text-obsidian">
              Global Strategy &amp; Project Management.
            </h1>
          </div>

          {/* Body */}
          <p className="hero-fade-in font-sans text-obsidian text-lg md:text-[20px] max-w-[600px] mb-12 leading-relaxed">
            Showcasing academic research, operational leadership, and applied business frameworks from the University of East London.
          </p>

          {/* CTA Button */}
          <div className="hero-fade-in">
            <a
              href="#modules"
              className="inline-block bg-tangerine text-zinc font-sans text-[20px] px-8 py-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-obsidian/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-tangerine focus-visible:outline-offset-4"
            >
              View Academic Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
