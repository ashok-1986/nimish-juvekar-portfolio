"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { competenciesContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function CompetenciesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, categoriesRef.current?.children || []], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(categoriesRef.current?.children || [], {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });

      const tags = categoriesRef.current?.querySelectorAll(".skill-tag");
      if (tags) {
        gsap.fromTo(
          tags,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="competencies"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-ivory"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-clamp-section-h2 font-semibold text-navy mb-16 text-center"
        >
          {competenciesContent.title}
        </h2>

        <div ref={categoriesRef} className="space-y-12">
          {competenciesContent.categories.map((category, catIndex) => (
            <div key={catIndex} className="text-center">
              <h3 className="text-lg font-semibold text-navy mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="skill-tag px-4 py-2 bg-sky-tint border border-mist rounded-full text-sm text-slate hover:border-blue/50 hover:text-blue transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
