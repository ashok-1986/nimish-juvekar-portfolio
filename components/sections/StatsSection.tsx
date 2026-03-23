"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statsContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [titleRef.current, statsRef.current?.children || []],
        { opacity: 1, y: 0 }
      );
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

      gsap.from(statsRef.current?.children || [], {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      });

      const statElements = statsRef.current?.children;
      if (statElements) {
        Array.from(statElements).forEach((stat) => {
          const valueEl = stat.querySelector(".stat-value");
          const value = parseInt(valueEl?.getAttribute("data-value") || "0");

          gsap.fromTo(
            valueEl,
            { innerText: 0 },
            {
              innerText: value,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-sky-tint"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-center font-serif text-clamp-section-h2 font-semibold text-navy mb-16"
        >
          {statsContent.title}
        </h2>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {statsContent.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 md:p-8 bg-ivory border border-mist rounded-lg"
            >
              <div
                className="stat-value font-serif text-clamp-stats font-semibold text-navy mb-2"
                data-value={stat.value}
              >
                0
                {stat.suffix}
              </div>
              <div className="text-slate text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
