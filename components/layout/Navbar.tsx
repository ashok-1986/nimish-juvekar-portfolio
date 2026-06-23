"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#research", label: "Research" },
  { href: "#modules", label: "Modules" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-zinc/95 backdrop-blur-sm border-b border-obsidian/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="#"
            className="font-serif font-bold text-obsidian text-2xl tracking-tighter hover:text-tangerine transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-tangerine focus-visible:outline-offset-4"
          >
            NIMISH.
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans font-medium text-obsidian hover:text-tangerine focus-visible:outline focus-visible:outline-2 focus-visible:outline-tangerine focus-visible:outline-offset-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-obsidian focus-visible:outline focus-visible:outline-2 focus-visible:outline-tangerine focus-visible:outline-offset-2"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-zinc transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full px-6 py-6">
          <div className="flex items-center justify-between mb-16">
            <span className="font-serif font-bold text-obsidian text-2xl tracking-tighter">
              NIMISH.
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-obsidian focus-visible:outline focus-visible:outline-2 focus-visible:outline-tangerine focus-visible:outline-offset-2"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-serif font-bold text-obsidian text-5xl hover:text-tangerine focus-visible:outline focus-visible:outline-2 focus-visible:outline-tangerine focus-visible:outline-offset-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
