"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [titleRef.current, subtitleRef.current, formRef.current],
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

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
      });

      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `https://formspree.io/f/${contactContent.formId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-sky-tint"
    >
      <div className="max-w-xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-clamp-section-h2 font-semibold text-navy mb-4 text-center"
        >
          {contactContent.title}
        </h2>
        <p ref={subtitleRef} className="text-slate text-center mb-12">
          {contactContent.subtitle}
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 bg-ivory border border-mist rounded-lg p-8"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-navy mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-blue transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-navy mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-blue transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-navy mb-2"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy focus:outline-none focus:border-blue transition-colors"
            >
              <option value="">Select a subject</option>
              {contactContent.subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-navy mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 bg-ivory border border-mist rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-blue transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="w-full py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {formState === "success" && (
            <p className="text-green-600 text-sm text-center">
              Thank you! Your message has been sent successfully.
            </p>
          )}

          {formState === "error" && (
            <p className="text-red-600 text-sm text-center">
              Something went wrong. Please try again or email directly at{" "}
              <a
                href={`mailto:${contactContent.email}`}
                className="underline hover:text-blue transition-colors"
              >
                {contactContent.email}
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
