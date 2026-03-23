"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teachingContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function TeachingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, modulesRef.current?.children || []], {
        opacity: 1,
        y: 0,
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

      gsap.from(modulesRef.current?.children || [], {
        scrollTrigger: {
          trigger: modulesRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="teaching"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-sky-tint"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-clamp-section-h2 font-semibold text-navy mb-16 text-center"
        >
          {teachingContent.title}
        </h2>

        <div ref={modulesRef} className="grid md:grid-cols-3 gap-6">
          {teachingContent.modules.map((module, index) => (
            <div
              key={index}
              className="bg-ivory border border-mist rounded-lg p-6 hover:border-blue/30 transition-colors"
            >
              <span className="text-xs font-medium text-blue uppercase tracking-wider">
                {module.code}
              </span>
              <h3 className="text-lg font-semibold text-navy mt-2 mb-3">
                {module.name}
              </h3>
              <p className="text-sm text-slate mb-4">{module.description}</p>
              {module.score && (
                <div className="inline-block px-3 py-1 bg-blue/10 rounded-full text-sm font-medium text-blue">
                  Score: {module.score}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {module.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-mist rounded-full text-slate"
                  >
                    {tag}
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
