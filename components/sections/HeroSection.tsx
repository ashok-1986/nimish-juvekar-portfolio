"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { heroContent } from "@/lib/data";
import { RevealText } from "@/components/ui/reveal-text";
import Image from "next/image";

export default function HeroSection() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLSpanElement>(null);
  const nameRef        = useRef<HTMLDivElement>(null);
  const subtitleRef    = useRef<HTMLParagraphElement>(null);
  const descRef        = useRef<HTMLParagraphElement>(null);
  const ctaRef         = useRef<HTMLAnchorElement>(null);
  const scrollRef      = useRef<HTMLDivElement>(null);
  const photoRef       = useRef<HTMLDivElement>(null);
  const badgeRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [credentialsRef.current, nameRef.current, subtitleRef.current,
           descRef.current, ctaRef.current, scrollRef.current,
           photoRef.current, badgeRef.current],
          { opacity: 1, y: 0, x: 0, scale: 1, rotateY: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(photoRef.current, {
        x: 80, opacity: 0, rotateY: 8,
        duration: 1.1, ease: "power4.out", transformPerspective: 800,
      }, 0.2)
      .from(badgeRef.current, {
        y: 20, opacity: 0, scale: 0.85,
        duration: 0.6, ease: "back.out(1.7)",
      }, 0.9)
      .from(credentialsRef.current, {
        y: 20, opacity: 0, duration: 0.7,
      }, 0.3)
      .from(nameRef.current, {
        y: 30, opacity: 0, duration: 0.5,
      }, 0.4)
      .from(subtitleRef.current, {
        y: 30, opacity: 0, duration: 0.7,
      }, 0.65)
      .from(descRef.current, {
        y: 20, opacity: 0, duration: 0.6,
      }, 0.75)
      .from(ctaRef.current, {
        y: 16, opacity: 0, scale: 0.95, duration: 0.5,
      }, 0.85)
      .from(scrollRef.current, {
        y: 10, opacity: 0, duration: 0.4,
      }, 1.0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle parallax on photo
  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = containerRef.current?.offsetHeight || window.innerHeight;
      if (scrollY > heroHeight) return;
      const progress = scrollY / heroHeight;
      photo.style.transform = `translateY(${progress * -40}px) scale(${1 + progress * 0.02})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NIMISH_IMAGES = [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  ];

  const JUVEKAR_IMAGES = [
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-ivory overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #C8C4BC 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.4,
        }}
      />

      {/* Decorative N */}
      <span
        className="absolute select-none pointer-events-none font-serif font-bold"
        style={{
          fontSize: "clamp(200px, 30vw, 380px)",
          color: "#F0EDE8",
          right: "-2%",
          bottom: "-8%",
          lineHeight: 1,
          zIndex: 0,
        }}
        aria-hidden="true"
      >N</span>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center lg:text-left lg:max-w-none lg:w-full">
        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-16 lg:items-center">

          {/* Left */}
          <div>
            <span
              ref={credentialsRef}
              className="inline-block text-blue text-xs md:text-sm font-medium mb-4 tracking-[0.2em] uppercase"
            >
              {heroContent.credentials}
            </span>

            {/* Name — tight, left-aligned, TNR, no gap between lines */}
            <div
              ref={nameRef}
              className="mb-6"
              style={{ lineHeight: 1 }}
            >
              <RevealText
                text="NIMISH"
                textColor="text-navy"
                overlayColor="text-blue"
                fontSize="text-[clamp(52px,6.5vw,82px)]"
                letterDelay={0.07}
                overlayDelay={0.05}
                overlayDuration={0.4}
                springDuration={500}
                letterImages={NIMISH_IMAGES}
                justify="start"
              />
              {/* Zero-gap second line */}
              <div style={{ marginTop: '-4px' }}>
                <RevealText
                  text="JUVEKAR"
                  textColor="text-navy"
                  overlayColor="text-blue"
                  fontSize="text-[clamp(52px,6.5vw,82px)]"
                  letterDelay={0.06}
                  overlayDelay={0.04}
                  overlayDuration={0.4}
                  springDuration={500}
                  letterImages={JUVEKAR_IMAGES}
                  justify="start"
                />
              </div>
            </div>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-slate mb-6 max-w-2xl mx-auto lg:mx-0"
            >
              {heroContent.subtitle}
            </p>

            <p
              ref={descRef}
              className="text-base text-slate mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {heroContent.description}
            </p>

            <a
              ref={ctaRef}
              href="#experience"
              className="inline-flex items-center gap-2 bg-blue text-white px-8 py-4 rounded-lg font-medium transition-all hover:bg-blue/90 hover:shadow-lg hover:shadow-blue/25 hover:-translate-y-0.5"
            >
              {heroContent.cta}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Right: Photo */}
          <div ref={photoRef} className="hidden lg:block relative" style={{ willChange: "transform" }}>
            <div
              className="absolute rounded-2xl bg-sky-tint"
              style={{ inset: 0, transform: "rotate(-3deg) scale(1.06)", zIndex: 0 }}
            />
            <div
              className="absolute rounded-2xl"
              style={{
                width: "40%", height: "40%",
                bottom: "-4%", right: "-4%",
                background: "#0A66C2",
                opacity: 0.07,
                transform: "rotate(4deg)",
                zIndex: 0,
              }}
            />
            <div
              className="relative z-10 rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4", boxShadow: "0 20px 60px rgba(26,26,46,0.18)" }}
            >
              <Image
                src="/images/nimish.jpg"
                alt="Nimish Juvekar — Lecturer, University of East London"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                priority
                className="object-cover object-top"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooA//9k="
              />
            </div>
            <div
              ref={badgeRef}
              className="absolute -bottom-4 -left-4 z-20 bg-white rounded-xl shadow-lg px-4 py-3"
              style={{ borderLeft: "4px solid #0A66C2", minWidth: "160px" }}
            >
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "10px", fontWeight: 600, color: "#0A66C2", textTransform: "uppercase", letterSpacing: "0.06em" }}>UEL · AFHEA</p>
              <p style={{ fontFamily: "Times New Roman, serif", fontSize: "15px", fontWeight: 700, color: "#1A1A2E", marginTop: "2px" }}>Lecturer</p>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", color: "#5A5A6E", marginTop: "1px" }}>Royal Docks School of Business & Law</p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate"
      >
        <span className="text-xs tracking-widest uppercase">{heroContent.scrollIndicator}</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-blue rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
