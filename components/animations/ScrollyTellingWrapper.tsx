"use client";

import { useRef } from "react";
import { scrollyContent } from "@/lib/data";
import ScrollyTellingCanvas from "./ScrollyTellingCanvas";

export default function ScrollyTellingWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-navy">
      <div className="sticky top-0 h-screen overflow-hidden">
        <ScrollyTellingCanvas />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {scrollyContent.sections.map((section) => (
            <div
              key={section.id}
              className={`absolute w-full px-12 ${
                section.position === "center"
                  ? "flex justify-center text-center"
                  : section.position === "left"
                  ? "flex justify-start text-left"
                  : "flex justify-end text-right"
              }`}
            >
              <div className="max-w-lg">
                <p className="text-xs md:text-sm font-medium text-blue tracking-widest uppercase mb-2">
                  {section.eyebrow}
                </p>
                <h2 className="font-serif text-4xl md:text-6xl font-semibold text-white drop-shadow-lg">
                  {section.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
