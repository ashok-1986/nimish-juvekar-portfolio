"use client";

import { personalInfo, navLinks, socialLinks } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-16 px-6" role="contentinfo">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-semibold mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-white/60 text-sm">{personalInfo.title}</p>
            <p className="text-white/60 text-sm">{personalInfo.location}</p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-blue transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <nav aria-label="Social media links">
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-blue transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Built by{' '}
            <a
              href="https://alchemetyx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:text-blue/80 transition-colors underline"
            >
              Alchemetryx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
