"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { qualificationsContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function QualificationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const degreesRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          titleRef.current,
          degreesRef.current?.children || [],
          certsRef.current?.children || [],
        ],
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

      gsap.from(degreesRef.current?.children || [], {
        scrollTrigger: {
          trigger: degreesRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      });

      gsap.from(certsRef.current?.children || [], {
        scrollTrigger: {
          trigger: certsRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="qualifications"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-ivory"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-clamp-section-h2 font-semibold text-navy mb-16 text-center"
        >
          {qualificationsContent.title}
        </h2>

        <div className="mb-16">
          <h3 className="text-lg font-semibold text-navy mb-6 text-center">
            Academic Qualifications
          </h3>
          <div ref={degreesRef} className="space-y-4">
            {qualificationsContent.degrees.map((degree, index) => (
              <div
                key={index}
                className="bg-sky-tint border border-mist rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-lg font-semibold text-navy">
                    {degree.title}
                  </h4>
                  <p className="text-sm text-slate mt-1">
                    {degree.institution}
                  </p>
                  {degree.modules && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {degree.modules.map((mod, modIndex) => (
                        <span
                          key={modIndex}
                          className="text-xs px-2 py-1 bg-ivory border border-mist rounded-full text-slate"
                        >
                          {mod.name} ({mod.score})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-medium text-blue">
                    {degree.year}
                  </span>
                  {degree.detail && (
                    <span className="block text-sm text-slate">{degree.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-navy mb-6 text-center">
            Certifications
          </h3>
          <div
            ref={certsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {qualificationsContent.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-sky-tint border border-mist rounded-lg p-4 hover:border-blue/30 transition-colors"
              >
                <h4 className="text-sm font-medium text-navy">{cert.title}</h4>
                <p className="text-xs text-slate mt-1">{cert.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
