"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionInfo {
  id: string;
  label: string;
}

const sections: SectionInfo[] = [
  { id: "about", label: "01" },
  { id: "experience", label: "02" },
  { id: "teaching", label: "03" },
  { id: "qualifications", label: "04" },
  { id: "contact", label: "05" },
];

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () =>
              setVisibleSections((prev) => new Set([...prev, section.id])),
            onLeaveBack: () =>
              setVisibleSections((prev) => {
                const next = new Set(prev);
                next.delete(section.id);
                return next;
              }),
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 left-6 md:left-12 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="flex flex-col gap-4">
        {sections.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 transition-opacity duration-300 ${
              visibleSections.has(item.id) ? "opacity-100" : "opacity-30"
            }`}
          >
            <span className="text-xs text-blue font-mono">{item.label}</span>
            <div className="w-8 h-px bg-blue" />
          </div>
        ))}
      </div>
    </div>
  );
}
