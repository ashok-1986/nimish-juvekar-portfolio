"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, timelineRef.current], { opacity: 1, y: 0 });
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

      const line = timelineRef.current?.querySelector(".timeline-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
            },
          }
        );
      }

      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        items.forEach((item, index) => {
          const isLeft = index % 2 === 0;
          gsap.fromTo(
            item,
            { x: isLeft ? -40 : 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: item,
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
      id="experience"
      ref={containerRef}
      className="py-[50px] px-4 md:px-6 bg-ivory"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif font-semibold text-center mb-16 text-navy"
          style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
        >
          {experienceContent.title}
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline line: left edge on mobile (16px), centre on desktop */}
          <div
            className="timeline-line absolute top-0 bottom-0 bg-mist origin-top left-[16px] md:left-1/2 md:-translate-x-1/2"
            style={{ width: '2px' }}
          />

          <div className="space-y-12">
            {experienceContent.timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`timeline-item relative md:flex md:items-center ${
                    isLeft ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  {/* Mobile: card with left padding to clear the line */}
                  <div
                    className={`pl-10 md:pl-0 md:w-1/2 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="bg-sky-tint border border-mist rounded-lg p-4 md:p-6 hover:border-blue/30 transition-colors">
                      <span
                        className="inline-block text-[11px] md:text-sm font-medium text-blue mb-1 md:mb-2 truncate"
                        title={`${item.year} | ${item.company}`}
                      >
                        {item.year} | {item.company}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-navy mb-1">
                        {item.role}
                      </h3>
                      <p className="text-xs md:text-sm text-slate leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot: mobile left-aligned with line, desktop centre-aligned */}
                  <div
                    className="absolute w-3 h-3 md:w-4 md:h-4 bg-blue rounded-full border-[3px] md:border-4 border-ivory left-[9px] md:left-1/2 md:-translate-x-1/2"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
