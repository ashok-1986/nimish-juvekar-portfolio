"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [titleRef.current, storyRef.current, credentialsRef.current],
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

      gsap.from(storyRef.current?.children || [], {
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      });

      gsap.from(credentialsRef.current?.children || [], {
        scrollTrigger: {
          trigger: credentialsRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-[50px] px-6 bg-ivory"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-clamp-section-h2 font-semibold text-navy mb-12 text-center"
        >
          {aboutContent.title}
        </h2>

        <div
          ref={storyRef}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {aboutContent.story.map((paragraph, index) => (
            <div
              key={index}
              className="text-slate leading-relaxed text-center md:text-left"
            >
              {paragraph}
            </div>
          ))}
        </div>

        <div
          ref={credentialsRef}
          className="flex flex-wrap justify-center gap-4"
        >
          {aboutContent.credentials.map((credential, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-sky-tint border border-mist rounded-full text-sm font-medium text-navy"
            >
              {credential}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
