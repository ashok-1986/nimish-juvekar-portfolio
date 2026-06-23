"use client";

export default function Footer() {
  const currentYear = 2026;

  const standardLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nimishjuvekar" },
    { label: "University Profile", href: "https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar" },
    { label: "ORCID", href: "https://orcid.org/0009-0000-4319-2899" },
    { label: "Email", href: "mailto:N.Juvekar@uel.ac.uk" }
  ];

  return (
    <footer id="contact" className="bg-obsidian text-zinc py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        
        {/* Top: Massive Typography */}
        <div className="mb-24 mt-12">
          <h2 
            className="text-zinc leading-[0.85] tracking-tighter hover:text-tangerine transition-colors duration-500 cursor-default"
            style={{ fontSize: "clamp(5rem, 12vw, 15rem)" }}
          >
            Let's<br />Collaborate.
          </h2>
        </div>

        {/* Bottom: Links & Copyright */}
        <div className="border-t border-zinc/20 pt-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {standardLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-base md:text-[20px] text-zinc hover:text-tangerine hover:line-through focus-visible:outline focus-visible:outline-2 focus-visible:outline-tangerine focus-visible:outline-offset-4 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="font-sans text-base md:text-lg text-zinc/60 lg:text-right">
            <p>&copy; {currentYear} Nimish Juvekar. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
