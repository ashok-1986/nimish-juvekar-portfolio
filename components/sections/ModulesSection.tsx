"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(".reveal-text", { y: "0%" });
        return;
      }

      ScrollTrigger.batch(".module-reveal-mask .reveal-text", {
        onEnter: (elements) => {
          gsap.to(elements, {
            y: "0%",
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
          });
        },
        once: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="modules"
      ref={sectionRef}
      className="py-24 bg-zinc px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="module-reveal-mask reveal-mask mb-16">
          <h2 className="reveal-text text-obsidian">Academic Highlights.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-zinc border border-obsidian p-8 lg:p-12 transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[12px_12px_0px_#001621] focus-within:-translate-y-[10px] focus-within:shadow-[12px_12px_0px_#001621]">
            <div className="module-reveal-mask reveal-mask mb-4">
              <span className="stat-number reveal-text">88%</span>
            </div>
            <h3 className="mb-4">Global Project Management</h3>
            <p className="font-sans text-obsidian text-base md:text-[20px]">
              Mastery of PMI frameworks and stakeholder management applied to complex international environments. Achieved highest cohort distinction.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc border border-obsidian p-8 lg:p-12 transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[12px_12px_0px_#001621] focus-within:-translate-y-[10px] focus-within:shadow-[12px_12px_0px_#001621]">
            <div className="module-reveal-mask reveal-mask mb-4">
              <span className="stat-number reveal-text">70%</span>
            </div>
            <h3 className="mb-4">Applied Business Project</h3>
            <p className="font-sans text-obsidian text-base md:text-[20px]">
              Independent research and real-world consultancy frameworks focusing on systemic operational optimisation.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc border border-obsidian p-8 lg:p-12 transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[12px_12px_0px_#001621] focus-within:-translate-y-[10px] focus-within:shadow-[12px_12px_0px_#001621]">
            <div className="module-reveal-mask reveal-mask mb-4">
              <span className="stat-number reveal-text">62%</span>
            </div>
            <h3 className="mb-2">Managing Resources</h3>
            <p className="subhead mb-4">International Environment</p>
            <p className="font-sans text-obsidian text-base md:text-[20px]">
              Strategic procurement, inventory control, and sustainable supply chain practices across multi-national borders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
