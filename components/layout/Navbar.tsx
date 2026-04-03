"use client";

import { useState, useEffect } from "react";
import { navLinks, personalInfo } from "@/lib/data";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-md border-b border-mist py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="#"
            className="font-serif text-sm md:text-xl font-semibold text-navy"
          >
            {personalInfo.name}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.href.slice(1)
                    ? "text-blue"
                    : "text-slate hover:text-navy"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue rounded-full" />
                )}
              </a>
            ))}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-blue border border-blue rounded-lg hover:bg-blue hover:text-white transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-navy"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-ivory/98 backdrop-blur-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-mist">
            <span className="font-serif text-sm md:text-xl font-semibold text-navy">
              {personalInfo.name}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-navy"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link text-[28px] font-serif transition-colors block ${
                  activeSection === link.href.slice(1)
                    ? "text-blue"
                    : "text-navy hover:text-blue"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto p-6 border-t border-mist">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 text-center text-blue border border-blue rounded-lg hover:bg-blue hover:text-white transition-colors font-medium"
            >
              Connect on LinkedIn
            </a>
            <p className="text-slate text-sm mt-4 text-center">{personalInfo.title}</p>
          </div>
        </div>
      </div>
    </>
  );
}
