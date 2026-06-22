"use client";

import { useEffect, useRef } from "react";
import { experienceContent } from "@/lib/data";

// Inline SVGs — no external dependency
const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="11" y2="17"/>
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([titleRef.current, timelineRef.current], { opacity: 1, y: 0 });
        return;
      }

      ctx = gsap.context(() => {
        // Title entrance
        gsap.fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 82%", once: true } }
        );

        // Timeline line draw
        const line = timelineRef.current?.querySelector(".timeline-line");
        if (line) {
          gsap.fromTo(line,
            { scaleY: 0 },
            { scaleY: 1, duration: 1.6, ease: "power2.out",
              scrollTrigger: { trigger: timelineRef.current, start: "top 70%", once: true } }
          );
        }

        // Cards stagger-clip from below
        const items = timelineRef.current?.querySelectorAll(".timeline-item");
        items?.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(item,
            { x: isLeft ? -50 : 50, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            {
              x: 0, opacity: 1, clipPath: "inset(0 0 0% 0)",
              duration: 0.65, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 84%", once: true },
            }
          );
        });
      }, containerRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 md:py-36 px-4 md:px-6 bg-zinc"
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div ref={titleRef} className="mb-20 md:mb-28" style={{ opacity: 0 }}>
          <h2
            className="font-serif font-bold text-obsidian"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {experienceContent.title}
          </h2>
          <p className="font-sans text-muted mt-4 max-w-md" style={{ fontSize: "16px" }}>
            A career spanning continents, disciplines, and 15+ years of hands-on impact.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line — desktop only */}
          <div
            className="timeline-line hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 origin-top"
            style={{ width: "1px", background: "#C8D8DA" }}
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {experienceContent.timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`timeline-item relative flex flex-col ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } md:items-start gap-0`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-28px)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                    <div
                      className="group rounded-2xl p-6 md:p-7 transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.65)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(5,32,38,0.08)",
                        boxShadow: "0 2px 16px rgba(5,32,38,0.04)",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(255,255,255,0.88)";
                        el.style.borderColor = "rgba(255,90,31,0.18)";
                        el.style.boxShadow = "0 8px 32px rgba(5,32,38,0.08)";
                        el.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(255,255,255,0.65)";
                        el.style.borderColor = "rgba(5,32,38,0.08)";
                        el.style.boxShadow = "0 2px 16px rgba(5,32,38,0.04)";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 font-sans font-medium"
                          style={{ fontSize: "12px", color: "#FF5A1F" }}
                        >
                          <IconCalendar />
                          {item.year}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 font-sans"
                          style={{ fontSize: "12px", color: "#4A5A5D" }}
                        >
                          <IconBuilding />
                          {item.company}
                        </span>
                      </div>

                      {/* Role */}
                      <h3
                        className="font-serif font-bold text-obsidian mb-3 group-hover:text-tangerine transition-colors duration-200"
                        style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.25 }}
                      >
                        {item.role}
                      </h3>

                      {/* Description */}
                      <p
                        className="font-sans text-muted leading-relaxed"
                        style={{ fontSize: "15px" }}
                      >
                        {item.description}
                      </p>

                      {/* Highlights if present */}
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-4 flex flex-col gap-2">
                          {item.highlights.slice(0, 2).map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2">
                              <span
                                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: "rgba(255,90,31,0.10)", color: "#FF5A1F" }}
                              >
                                <IconCheck />
                              </span>
                              <span
                                className="font-sans text-muted"
                                style={{ fontSize: "13px", lineHeight: 1.55 }}
                              >
                                {h}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Dot on the centre line — desktop only */}
                  <div className="hidden md:flex w-14 justify-center items-start pt-6 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-zinc flex-shrink-0"
                      style={{ background: "#FF5A1F", boxShadow: "0 0 0 4px rgba(255,90,31,0.12)" }}
                    />
                  </div>

                  {/* Spacer on the other side — keeps layout symmetric */}
                  <div className="hidden md:block w-[calc(50%-28px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
