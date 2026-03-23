# Nimish Juvekar — Portfolio Website

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · GSAP · HTML5 Canvas  
**Build status:** Production ready (zero TS errors, zero build errors)

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npx tsc --noEmit   # Type check
```

---

## Project Structure

```
nimish-portfolio/
├── app/
│   ├── globals.css               # Design tokens, base styles
│   ├── layout.tsx                # Root layout, metadata, JSON-LD
│   └── page.tsx                  # Assembles all sections
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Fixed nav, active section, mobile drawer
│   │   └── Footer.tsx            # 3-col footer
│   ├── animations/
│   │   ├── ScrollyCanvas.tsx     # HTML5 canvas scroll-linked (500vh)
│   │   ├── Overlay.tsx           # Parallax text over canvas
│   │   ├── ScrollyTelling.tsx    # Canvas + overlay combined
│   │   └── ScrollyTellingWrapper.tsx
│   └── sections/
│       ├── HeroSection.tsx       # Full-viewport hero, GSAP word entrance
│       ├── AboutSection.tsx      # Story + trait cards
│       ├── StatsSection.tsx      # Animated counters on navy bar
│       ├── ExperienceSection.tsx # 8-entry timeline, draw animation
│       ├── TeachingSection.tsx   # UEL modules, 88% counter
│       ├── CompetenciesSection.tsx
│       ├── ProjectsSection.tsx   # Glassmorphism cards
│       ├── QualificationsSection.tsx
│       ├── USPSection.tsx        # 3D flip entrance, dark section
│       └── ContactSection.tsx    # Formspree form
└── lib/
    ├── data.ts                   # ALL content — edit only this for updates
    └── gsap-utils.ts             # Reusable animation helpers
```

---

## Design Tokens

```css
--navy:     #1A1A2E   /* headings, nav, footer */
--blue:     #0A66C2   /* accent, CTAs, links   */
--ivory:    #F9F8F6   /* page background        */
--sky-tint: #EAF2FB   /* section backgrounds    */
--slate:    #5A5A6E   /* body text              */
--mist:     #E8E4DC   /* borders, dividers      */
```

Fonts: **Times New Roman** (headings, system) + **DM Sans** (body, Google Fonts)

---

## Before Going Live — Required Actions

### 1. Profile Photo
Place high-res photo at `public/images/nimish.jpg` (3:4 ratio, WebP preferred).  
Hero shows "NJ" initials fallback until photo is placed.

### 2. Contact Form (Formspree)
1. Create account at formspree.io
2. Create form → set destination email
3. In `components/sections/ContactSection.tsx` replace `YOUR_FORMSPREE_ID` with your form ID

### 3. Image Sequence for Scrollytelling (Optional)
- Add 60 frames to `public/images/frames/frame-001.jpg` ... `frame-060.jpg`
- Uncomment the return line in `ScrollyCanvas.tsx` → `getFrameUrl()` function
- Procedural animated gradient runs as fallback when no images are provided

### 4. Domain & OG Image
- Update `https://nimishjuvekar.com` in `app/layout.tsx` once domain is purchased
- Create 1200×630px OG image → place at `public/og-image.jpg`

### 5. Favicon
Replace `app/favicon.ico` with "NJ" initials favicon from favicon.io

---

## Deployment (Vercel — Recommended)

```bash
npm install -g vercel
vercel        # follow prompts, framework auto-detected as Next.js
```

---

## Content Updates

Edit `lib/data.ts` only — all text, experience entries, certifications, and links live there. No other file needs touching for content changes.

---

## GSAP Animations Summary

| Section | Animation |
|---------|-----------|
| Hero | Words drop in (stagger), photo slides from right |
| Scrolly | Canvas frame scrub (scroll-linked) |
| Stats | Counter 0 → value on scroll enter |
| Experience | Line draws down (scrub), cards alternate L/R |
| Teaching | 88% number counts up |
| Competencies | Tags scale in with 0.04s stagger |
| USP | 3D rotateX(15→0) perspective flip |
| All sections | Fade + slide up on ScrollTrigger enter |

---

Built to PRD v1.0 · March 2026
