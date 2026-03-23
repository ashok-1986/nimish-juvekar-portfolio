"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, projectsRef.current?.children || []], {
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

      gsap.from(projectsRef.current?.children || [], {
        scrollTrigger: {
          trigger: projectsRef.current,
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
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-sky-tint"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-clamp-section-h2 font-semibold text-navy mb-16 text-center"
        >
          {projectsContent.title}
        </h2>

        <div ref={projectsRef} className="grid md:grid-cols-2 gap-6">
          {projectsContent.projects.map((project, index) => (
            <div
              key={index}
              className="group glass bg-white/80 backdrop-blur-sm border border-mist rounded-lg p-6 hover:border-blue/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-medium text-blue uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold text-navy mt-1">
                    {project.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-blue/10 rounded-full text-blue"
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
