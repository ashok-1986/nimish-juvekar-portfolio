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
      className="py-24 md:py-32 px-6 bg-ivory"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-clamp-section-h2 font-semibold text-navy mb-16 text-center"
        >
          {experienceContent.title}
        </h2>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-mist -translate-x-1/2 origin-top" />

          <div className="space-y-12">
            {experienceContent.timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`timeline-item relative flex items-center ${
                    isLeft ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <div className="bg-sky-tint border border-mist rounded-lg p-6 hover:border-blue/30 transition-colors">
                      <span className="inline-block text-sm font-medium text-blue mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-semibold text-navy mb-1">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-slate mb-3">
                        {item.company}
                      </p>
                      <p className="text-sm text-slate leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-blue rounded-full -translate-x-1/2 border-4 border-ivory" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
