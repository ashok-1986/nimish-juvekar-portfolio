# Product Requirements Document
## Nimish Juvekar — Personal Portfolio Website

**Document Version:** 1.0  
**Date:** March 2026  
**Product Manager:** [Acting PM — Claude]  
**Status:** Awaiting Development

---

## Table of Contents

1. Executive Summary
2. Goals & Success Metrics
3. Target Audience
4. Design System (Confirmed)
5. Site Architecture & Navigation
6. Section-by-Section Specifications
7. Animation & Interaction Specifications
8. Technical Stack Recommendations
9. Content Inventory
10. SEO & Performance Requirements
11. Accessibility Requirements
12. Out of Scope
13. Open Questions

---

## 1. Executive Summary

Nimish Juvekar is a Lecturer (Work-Based Learning) at the University of East London with 15+ years of industry experience across India, South East Asia, the Middle East, and the UK. He holds an MSc in International Business Management, a Bachelor of Engineering in Electronics, and is an Associate Fellow of Advance HE (AFHEA).

He currently has a Gamma-built site (nimish-juvekar-jrtjqh6.gamma.site) and a UEL staff profile, but no owned, standalone portfolio website. This PRD defines the requirements for building a personal portfolio that:

- Positions Nimish as a credible, senior academic-practitioner.
- Showcases his industry career depth alongside his teaching role.
- Acts as a central, professional web presence he owns and controls.
- Is visually distinctive, animation-rich, and memorable — not a generic academic page.

The site must be clean, structured, light-background, typographically strong, and use GSAP-powered animations and subtle 3D effects to create a premium feel.

---

## 2. Goals & Success Metrics

### Primary Goals

| Goal | Description |
|------|-------------|
| Professional Credibility | Serve as a definitive professional reference for students, industry partners, and academic institutions |
| Discoverability | Rank on Google for "Nimish Juvekar" and related terms like "UEL Work-Based Learning Lecturer" |
| Lead Generation | Generate inbound interest for speaking, consulting, or academic collaboration |
| Content Consolidation | Replace the need to send people to multiple links (LinkedIn, UEL, Gamma) with one owned URL |

### Success Metrics (First 90 Days Post-Launch)

- Google first-page rank for "Nimish Juvekar"
- Average session time > 2 minutes (indicates content engagement)
- Bounce rate < 55%
- At least 2 inbound contact form submissions per month
- Mobile usability score > 90 on Google PageSpeed
- Lighthouse Performance score > 85

---

## 3. Target Audience

### Primary Audience

**Students (Current & Prospective)**
- UEL postgraduate students, especially on work-based learning modules
- Want to understand who Nimish is, his background, and his teaching philosophy
- Will visit from LinkedIn or the UEL staff page

### Secondary Audience

**Industry Partners & Employers**
- Companies who host interns or engage with UEL's work-based learning programme
- Looking for credibility signals: sector experience, international background, certifications
- Decision-makers who want to see if Nimish understands "the real world"

### Tertiary Audience

**Academic & Professional Network**
- Other academics, conference organisers, professional bodies (CMI, AFHEA)
- Potential collaborators for research, speaking, or consulting engagements

---

## 4. Design System (Confirmed)

### 4.1 Colour Palette

| Token | Colour | Hex | Usage |
|-------|--------|-----|-------|
| `--color-navy` | Deep Navy | `#1A1A2E` | Primary text, headings, nav, footer |
| `--color-blue` | LinkedIn Blue | `#0A66C2` | Accent, CTAs, links, active states, hover highlights |
| `--color-bg-primary` | Ivory White | `#F9F8F6` | Main page background |
| `--color-bg-secondary` | Sky Tint | `#EAF2FB` | Alternating section backgrounds, card highlights |
| `--color-body` | Slate Gray | `#5A5A6E` | Body copy, subtitles, secondary text |
| `--color-border` | Warm Mist | `#E8E4DC` | Borders, dividers, card outlines |
| `--color-white` | Pure White | `#FFFFFF` | Card fills, nav background |

**Accent usage rule:** LinkedIn Blue (`#0A66C2`) is used sparingly — for CTAs, active underlines, stat numbers, and key phrases only. It should never dominate a section.

### 4.2 Typography

| Role | Font | Weight | Size Range | Usage |
|------|------|--------|-----------|-------|
| Display / H1 | Times New Roman | 700–800 | 56px–80px | Hero name, section hero headings |
| Heading / H2 | Times New Roman | 700 | 32px–44px | Section titles |
| Subheading / H3 | DM Sans | 600 | 20px–26px | Card titles, role names |
| Body | DM Sans | 400 | 15px–17px | Paragraphs, descriptions |
| Label / Tag | DM Sans | 500 | 11px–13px | Tags, badges, nav links, captions |
| Stat / Number | Times New Roman | 700 | 40px–56px | Counter animations in stats section |

**Font loading:** Times New Roman is a system font (zero load penalty). DM Sans loaded from Google Fonts CDN:
```
https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap
```

### 4.3 Spacing System

Base unit: 8px. All spacing values are multiples of 8.
Section padding: 96px top and bottom on desktop, 64px on mobile.
Max content width: 1200px, centred.

### 4.4 Border Radius

- Cards: `12px`
- Buttons: `8px`
- Tags/badges: `20px` (pill)
- Large containers: `16px`

---

## 5. Site Architecture & Navigation

### 5.1 Page Structure

Single-page design (SPA feel) with smooth anchor scroll. All sections live on one URL (`/`). A separate `/contact` page is optional but not required for V1.

### 5.2 Navigation Bar

**Desktop:** Fixed top navbar, white background with subtle bottom border, transitions to slightly frosted on scroll.

| Nav Item | Anchor |
|----------|--------|
| About | `#about` |
| Experience | `#experience` |
| Teaching | `#teaching` |
| Qualifications | `#qualifications` |
| Contact | `#contact` |

Right side of nav: "Download CV" button (outlined, navy, hover fills navy).

**Mobile:** Hamburger menu. Slide-in drawer from right. Full-screen links in Times New Roman, large.

### 5.3 Section Order

```
1. Hero
2. About / Professional Summary
3. Stats Bar (animated counters)
4. Experience Timeline
5. Teaching & Academic Role
6. Core Competencies
7. Qualifications & Certifications
8. Why Nimish (USP section — from Gamma content)
9. Contact
10. Footer
```

---

## 6. Section-by-Section Specifications

---

### Section 1: Hero

**Purpose:** Immediate first impression. Establish who Nimish is, what he does, and create visual impact.

**Layout:** Full viewport height (100vh). Two-column on desktop (60/40 split). Stacked on mobile.

**Left Column — Content:**
- Eyebrow line (DM Sans, uppercase, 11px, LinkedIn Blue): `AFHEA · MSc · fCMgr · Lecturer`
- H1 (Times New Roman, 68px desktop, 42px mobile): `Nimish Juvekar`
- Tagline (DM Sans, 18px, Slate Gray): `Bridging 15+ years of Global Industry Experience with Academic Excellence at the University of East London.`
- Two CTA buttons:
  - Primary: "View My Journey" (filled, navy background, white text)
  - Secondary: "Get In Touch" (outlined, navy border)
- Tag row below CTAs: `Project Management` · `Supply Chain` · `Operations` · `Fire & ELV Systems` · `Work-Based Learning`

**Right Column — Visual:**
- Nimish's professional photo (from UEL: `https://www.uel.ac.uk/sites/default/files/styles/image_scale_360x250/public/45843.jpg`)
- Photo sits inside a stylised geometric frame — a large rounded rectangle with a Sky Tint background offset block behind it creating a 3D layered effect (CSS transform, slight rotation on the background block)
- Floating credential badge overlapping bottom-left of photo: `UEL · AFHEA` in a white card with LinkedIn Blue left border

**Background:**
- Ivory White base
- Very subtle dot grid pattern (1px dots, `#E8E4DC`, 24px grid) — adds texture without noise
- Large decorative serif letter (e.g., "N") in Times New Roman at 400px, `#F0EDE8` colour, bottom-right corner — creates depth and brand personality

**GSAP Animations (on page load):**
- Eyebrow fades in and slides up (0.3s delay, 0.6s duration)
- H1 letters animate in using GSAP SplitText — each character drops in with stagger of 0.04s
- Tagline fades in (0.8s delay)
- Buttons scale up from 0.9 with opacity (1.0s delay, stagger 0.1s)
- Photo frame slides in from right (0.5s delay, x: 60 → 0)
- Background "N" letter fades in slowly (1.5s delay, 2s duration)

---

### Section 2: About / Professional Summary

**Purpose:** Give visitors the story. Who is Nimish, where has he been, and why does it matter?

**Layout:** Two-column on desktop. Left: text content. Right: vertical "journey map" graphic (decorative, not a full timeline).

**Content:**
- Section label: `ABOUT`
- H2 (Times New Roman): `From the Field to the Lecture Hall`
- Body paragraphs (DM Sans, 16px): Adapted from UEL profile and Gamma site summary. Key lines to include:
  - "Over 15 years of operational and leadership experience across India, South East Asia, the Middle East, and the UK."
  - "Roles spanning ELV systems engineering, fire safety, supply chain, and sales — across companies including Teknoware, Heinrich, Watchdog Security, and Firelife Safety Enterprises."
  - "Moved to London in 2022 to complete an MSc in International Business Management at UEL, graduating with Merit."
  - "Now a Lecturer in Work-Based Learning at the Royal Docks School of Business and Law, UEL."

**Right side visual:**
- Four icon+text cards stacked vertically (LinkedIn Blue icon, DM Sans text):
  - Strategic Thinker
  - Inspiring Educator
  - Leadership Trainer
  - Culturally Adaptable
- Each card has a Sky Tint background and subtle left border in LinkedIn Blue

**GSAP Animations:**
- Section heading animates in on scroll (ScrollTrigger, y: 40 → 0, opacity 0 → 1)
- Body paragraphs stagger in line by line
- Right-side cards slide in from right with 0.15s stagger

---

### Section 3: Stats Bar

**Purpose:** Quick, scannable proof of experience. Builds credibility in 5 seconds.

**Layout:** Full-width horizontal bar. Background: LinkedIn Blue. Text: white. Four stats displayed.

**Stats (animated counters using GSAP):**

| Number | Label |
|--------|-------|
| 15+ | Years of Industry Experience |
| 4 | Countries Worked In |
| 8 | Industry Roles Held |
| 2 | Academic Institutions |

**Animation:** Numbers count up from 0 when the section enters the viewport (GSAP ScrollTrigger + counter tween). Duration 1.5s per counter, staggered 0.2s.

**Font:** Numbers in Times New Roman 56px white. Labels in DM Sans 13px white at 70% opacity.

---

### Section 4: Experience Timeline

**Purpose:** Show the full career arc clearly and compellingly. This is the core content section.

**Layout:** Vertical timeline, centred line, alternating left/right cards on desktop. Single column on mobile (cards stack, line on left).

**Timeline Entries (8 total, reverse chronological):**

1. **Lecturer (Work-Based Learning)** — University of East London, UK · Sep 2025–Present
2. **Hourly Paid Lecturer** — University of East London, UK · Sep 2023–Sep 2025
3. **Assistant EHCP Coordinator** — Cognus Limited, UK · Sep 2024–Present
4. **Technical Manager** — Firelife Safety Enterprises, India · Apr 2020–Jan 2022
5. **Regional Techno-Commercial Manager** — Heinrich Limited, India · Feb 2019–Mar 2020
6. **Product Specialist** — Watchdog Security, India · Feb 2016–Jan 2019
7. **Assistant Technical Manager** — Teknoware Middle East · Jan 2015–Jan 2016
8. **Systems Engineer** — System Product Enterprises (India) Pvt Ltd · Jul 2008–Dec 2014

**Each card contains:**
- Company name (DM Sans, 600, navy)
- Role title (Times New Roman, 700, 18px, navy)
- Duration + Location (DM Sans, 400, 13px, Slate Gray)
- 2–3 bullet point highlights (DM Sans, 400, 15px)
- Industry tag pill (e.g., `Academia`, `Fire Safety`, `ELV Systems`, `Sales`)

**Timeline dot:** 16px circle, white fill, LinkedIn Blue border (2px), with a small active-blue fill on hover.

**Card design:** White card, `border-radius: 12px`, subtle box shadow (`0 2px 16px rgba(10,102,194,0.07)`), left border accent in LinkedIn Blue (3px).

**GSAP Animations (ScrollTrigger):**
- Timeline line draws itself from top to bottom as user scrolls (stroke-dashoffset animation on SVG line or CSS scaleY on pseudo-element)
- Each card fades and slides in from its respective side (left cards: x: -50 → 0, right cards: x: 50 → 0) when it enters viewport
- Timeline dot scales in (scale: 0 → 1, bounce ease) as card appears

---

### Section 5: Teaching & Academic Role

**Purpose:** Spotlight the academic side — what Nimish teaches, how he teaches, and his philosophy.

**Layout:** Background: Sky Tint (`#EAF2FB`). Three content columns inside a max-width container.

**Content:**

**Left column (text):**
- H2: `Teaching at UEL`
- Institution badge: `Royal Docks School of Business and Law · University of East London`
- Role: Lecturer, Work-Based Learning (Level 7, Master's)
- Modules taught:
  - Global Project Management
  - Managing Resources in an International Business Environment
  - Work-Based Learning (Placement Year support)
- Teaching philosophy (2–3 sentences from Gamma/UEL content)

**Middle column (card):**
- Highlighted stat: `88%` in Times New Roman, large — his score in Global Project Management
- Sub-label: "MSc Module Score — Global Project Management"
- Short note: "Knows the material from both sides of the desk."

**Right column (card):**
- ORCID link: `0009-0000-4319-2899`
- Advance HE Fellow badge
- Link to UEL staff profile

**GSAP Animations:**
- Three columns scale in with stagger (0.15s each) on ScrollTrigger
- The `88%` number counts up from 0 when section enters viewport

---

### Section 6: Core Competencies

**Purpose:** Skills and expertise, presented visually — not as a boring list.

**Layout:** Ivory White background. Three grouped columns.

**Groups:**

**Academic Leadership & Mentorship**
- Team Leadership & Development
- Cross-Cultural Training Expertise
- Work-Based Learning Facilitation
- Culturally Adaptable Teaching Methods

**Business & Management**
- Client Relationship Management
- Stakeholder Engagement
- Supply Chain Coordination
- Project Management (PMI Foundations)
- International Business Strategy

**Technical & Industry**
- ELV Systems (Fire, PAVA, AV, Automation)
- NFPA 72 Fire Alarm Code
- Microsoft Office Suite (Advanced Excel)
- Digital Training & Documentation
- Process Improvement

**Visual treatment:** Each competency is a pill tag (Sky Tint background, LinkedIn Blue text, pill border-radius). Tags animate in one by one on scroll using GSAP stagger (0.04s per tag, fade + scale from 0.85).

---

### Section 7: Qualifications & Certifications

**Purpose:** Formal credentials in a scannable format.

**Layout:** Two columns. Left: academic qualifications. Right: professional certifications.

**Academic Qualifications:**

| Degree | Institution | Year | Grade |
|--------|------------|------|-------|
| MSc International Business Management | University of East London | 2022–2023 | Merit |
| Bachelor of Engineering (Electronics) | University of Mumbai | 2005–2008 | 2:1 |
| Diploma in Electronics & Video Engineering | MSBTE | 2002–2005 | Distinction |

**Professional Certifications (from Gamma site + LinkedIn):**
- CMI Level 7 Diploma — Strategic Management & Leadership (Chartered Management Institute)
- AFHEA — Associate Fellow, Advance HE
- Project Management Foundations (PMI)
- Managing Project Stakeholders (PMI)
- Integrated Building Management Systems Workshop
- PAVA System Design, Testing & Commissioning (Module A)
- NFPA 72: National Fire Alarm and Signaling Code
- EasyIO FG Training Certificate
- Excel: Advanced Formulas and Functions (LinkedIn / NASBA)
- Learning ITIL
- Inventory Management Foundations
- Purchasing Foundations
- Sustainability Strategies

**Card design:** Each qualification/cert is a horizontal card with a LinkedIn Blue left accent bar, institution name in Slate Gray, credential title in Deep Navy (DM Sans 600).

**GSAP Animations:** Cards slide in from bottom (y: 30 → 0) with stagger on scroll.

---

### Section 8: Why Nimish (USP / Value Proposition)

**Purpose:** Direct, confident articulation of what makes Nimish unique. Based on the "Why Nimish Juvekar?" section in the Gamma site.

**Layout:** Navy (`#1A1A2E`) background. White and Sky Tint text. Four value cards in a 2x2 grid.

**Section heading (Times New Roman, white, large):** `Why Work With Nimish`

**Four USP Cards:**

1. **Global Leadership & Cross-Cultural Expertise**  
   Experience across India, South East Asia, the Middle East, and the UK. Managed multicultural teams and mentored international students.

2. **Proven Educator & Innovative Trainer**  
   University lecturer and former technical manager. Designs impactful training programmes for both academic and corporate contexts.

3. **Strategic Problem Solver**  
   Track record of streamlining workflows, improving operational efficiency, and integrating digital improvements across complex environments.

4. **Strong Stakeholder & Client Management**  
   Nurtured long-term client relationships across sectors. Aligns project goals with broader organisational objectives.

**Card design:** Slightly lighter navy fill (`#252540`), white card title (Times New Roman 600 20px), body text (DM Sans 400, light gray). LinkedIn Blue top border accent (3px) on each card.

**GSAP 3D Animation:** Cards enter with a subtle `rotateX(15deg) → rotateX(0)` perspective flip on scroll. This is the signature 3D moment on the page.
```javascript
gsap.from(".usp-card", {
  scrollTrigger: { trigger: ".usp-grid", start: "top 75%" },
  rotateX: 15,
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.15,
  transformPerspective: 800
});
```

---

### Section 9: Contact

**Purpose:** Clear, frictionless way to reach Nimish.

**Layout:** Ivory White background. Two columns. Left: contact details and a brief humanising note. Right: contact form.

**Left column:**
- H2: `Let's Connect`
- Short paragraph: "Whether you're a student, an employer, an academic, or a professional looking to collaborate — I'd be glad to hear from you."
- Contact details:
  - Email: `N.Juvekar@uel.ac.uk`
  - LinkedIn: `linkedin.com/in/nimishjuvekar`
  - ORCID: `0009-0000-4319-2899`
  - Location: `London, United Kingdom`
- UEL profile link button

**Right column — Contact form fields:**
- Name (text input)
- Email (email input)
- Subject (dropdown: Student Enquiry / Industry Partnership / Academic Collaboration / Other)
- Message (textarea, min 4 rows)
- Submit button: "Send Message" (LinkedIn Blue fill)

**Form behaviour:**
- Basic client-side validation (required fields, email format)
- On submit: inline success message ("Thanks — Nimish will get back to you shortly.") No page reload.
- Form connected to Formspree or Netlify Forms (no backend required for V1)

**GSAP Animation:** Form fields fade in with stagger (0.08s each) on section enter.

---

### Section 10: Footer

**Layout:** Deep Navy background. Three columns + copyright row.

**Column 1:** Logo / Name — `Nimish Juvekar` in Times New Roman white. Short tagline below.

**Column 2:** Quick Links — About, Experience, Teaching, Qualifications, Contact

**Column 3:** External Links — UEL Profile, LinkedIn, ORCID, Gamma Site

**Bottom bar:** `© 2026 Nimish Juvekar · Built with purpose.` — DM Sans 12px, 50% white opacity.

---

## 7. Animation & Interaction Specifications

### 7.1 GSAP Libraries Required

```html
<!-- Core GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<!-- ScrollTrigger plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<!-- SplitText plugin (GSAP Club, or use splitting.js as free alternative) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
```

### 7.2 Animation Catalogue

| ID | Element | Trigger | Animation | Duration | Ease |
|----|---------|---------|-----------|----------|------|
| A01 | Hero H1 (SplitText) | Page load | Characters drop in, stagger 0.04s | 0.8s total | `power4.out` |
| A02 | Hero eyebrow | Page load | Fade + slide up | 0.5s | `power2.out` |
| A03 | Hero photo frame | Page load | Slide in from right (x:60→0) | 0.7s | `power3.out` |
| A04 | Background "N" letter | Page load | Fade in | 2.0s | `linear` |
| A05 | Stats counters | ScrollTrigger enter | Count 0 → final value | 1.5s | `power2.out` |
| A06 | Timeline line | ScrollTrigger scrub | Draw from top (scaleY 0→1) | Scrub 1.5 | — |
| A07 | Timeline cards | ScrollTrigger enter | Slide from alternating sides | 0.6s | `power3.out` |
| A08 | Timeline dots | ScrollTrigger enter | Scale 0→1.2→1 (bounce) | 0.4s | `back.out(1.7)` |
| A09 | Competency tags | ScrollTrigger enter | Scale 0.85→1, fade, stagger 0.04s | 0.3s each | `power2.out` |
| A10 | USP cards (3D flip) | ScrollTrigger enter | rotateX 15→0, y 40→0, stagger 0.15s | 0.8s | `power3.out` |
| A11 | Section headings | ScrollTrigger enter | y 40→0, opacity 0→1 | 0.6s | `power3.out` |
| A12 | Contact form fields | ScrollTrigger enter | Fade + y 20→0, stagger 0.08s | 0.4s each | `power2.out` |

### 7.3 Hover Interactions

| Element | Hover State |
|---------|-------------|
| Nav links | LinkedIn Blue underline slides in from left (CSS `::after` transform) |
| Primary CTA button | Background lightens 10%, subtle scale(1.02) |
| Secondary CTA button | Fill with navy, text turns white |
| Experience cards | `translateY(-4px)`, shadow deepens |
| Timeline dots | Scale 1.3, fill with LinkedIn Blue |
| Competency tags | Background turns LinkedIn Blue, text turns white |
| USP cards | `translateY(-6px)`, top border widens to 5px |
| Footer links | LinkedIn Blue colour transition |

### 7.4 Scroll Behaviour

- Smooth scroll on anchor link click: CSS `scroll-behavior: smooth` + GSAP `scrollTo` plugin for precise control
- Navbar: on scroll > 80px, add frosted glass effect (`backdrop-filter: blur(12px)`, white at 90% opacity) and subtle bottom shadow
- Active nav item highlight: LinkedIn Blue underline updates as user scrolls through sections (ScrollTrigger `toggleClass`)

### 7.5 3D Effects

Two 3D moments on the page (both CSS `perspective` + GSAP `rotateX`):

1. **Hero photo frame:** Background offset block has `transform: rotate(-2deg)` — creates a stacked, dimensional card look. Subtle `parallax` effect on scroll (photo moves slightly slower than background using GSAP ScrollTrigger scrub).

2. **USP Cards (Section 8):** Entrance animation uses `rotateX(15deg)` perspective flip as described in A10. On hover, subtle `rotateX(-3deg)` tilt using CSS `perspective: 800px` on the parent container.

---

## 8. Technical Stack Recommendations

### Option A — Recommended: Next.js (React)

**Why:** Best for SEO (server-side rendering), easy deployment on Vercel, good ecosystem for GSAP integration.

```
Framework:     Next.js 14 (App Router)
Styling:       Tailwind CSS + custom CSS variables for design tokens
Animations:    GSAP 3 + ScrollTrigger + SplitText
Fonts:         Times New Roman (system) + DM Sans (Google Fonts)
Forms:         Formspree (free tier, no backend needed)
Deployment:    Vercel (free tier)
Domain:        nimishjuvekar.com (recommended)
```

### Option B — Simpler: Plain HTML/CSS/JS

**Why:** Faster to build, zero framework overhead, easier for a non-developer to maintain or hand off.

```
Stack:         HTML5 + CSS3 + Vanilla JS
Animations:    GSAP 3 + ScrollTrigger
Fonts:         Same as above
Forms:         Formspree
Deployment:    Netlify (free tier, drag-and-drop deploy)
```

**Recommendation:** If Nimish is hiring a developer for a one-time build, Option B is faster and cheaper. If there's intent to add blog posts, dynamic content, or a CMS later, go with Option A.

### CMS Consideration (V2)

If Nimish wants to add blog posts or update content himself, integrate Contentlayer (Next.js) or Netlify CMS (Option B) in V2. Not required for V1.

---

## 9. Content Inventory

All content below is sourced from the resume PDF, UEL staff profile, and Gamma site. Ready for direct use in development.

### 9.1 Text Content — Ready to Use

| Section | Source | Status |
|---------|--------|--------|
| Hero tagline | Adapted from Gamma + UEL | Ready |
| About paragraphs | UEL profile + Gamma summary | Ready |
| Experience entries (8) | Resume + Gamma experience section | Ready |
| Teaching content | UEL profile | Ready |
| Competencies (3 groups) | Gamma core competencies | Ready |
| Qualifications (3) | Resume | Ready |
| Certifications (13) | Resume + Gamma | Ready |
| USP cards (4) | Gamma "Why Nimish" section | Ready |
| Contact details | UEL profile + Gamma | Ready |
| Quote (footer) | Gamma site | Ready: *"Combining academic excellence with practical industry experience to develop the next generation of global business leaders."* |

### 9.2 Media Assets

| Asset | Source | Action Required |
|-------|--------|-----------------|
| Profile photo | UEL staff page (JPG) | Download and optimise to WebP |
| Generated images (Gamma) | Gamma site (2 AI images) | Do not use — replace with real photo or omit |
| Icons | None currently | Use Lucide Icons or Phosphor Icons (free, MIT) |
| Favicon | None | Create from initials "NJ" in Times New Roman |

---

## 10. SEO & Performance Requirements

### SEO

- Page title: `Nimish Juvekar — Lecturer & Industry Expert | University of East London`
- Meta description: `Nimish Juvekar is a Lecturer in Work-Based Learning at UEL with 15+ years of international experience in operations, supply chain, and project management.`
- OG image: Professional portrait with name overlay (1200x630px)
- Structured data: `Person` schema (JSON-LD) with name, jobTitle, affiliation (UEL), sameAs (LinkedIn, ORCID)
- Alt text on all images
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Canonical URL set

### Performance

- Images: WebP format, lazy loaded, `srcset` for responsive sizes
- DM Sans: `font-display: swap`, preconnect to fonts.googleapis.com
- GSAP: loaded from CDN with `defer`
- Target: Lighthouse Performance score > 85, LCP < 2.5s
- No unnecessary JS libraries — GSAP + vanilla JS only

---

## 11. Accessibility Requirements

- Minimum contrast ratio 4.5:1 for all body text (Navy on Ivory: passes at 15:1)
- LinkedIn Blue on white: 4.6:1 — passes AA
- All interactive elements keyboard-accessible (Tab order, visible focus ring)
- GSAP animations respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```
- Form labels associated with inputs via `for`/`id`
- ARIA labels on icon-only buttons
- Skip to main content link at top of page (visually hidden, shows on focus)

---

## 12. Out of Scope (V1)

The following are explicitly not included in V1 and should be considered for V2:

- Blog or articles section
- CMS / self-editing capability
- Multi-language support
- Dark mode
- Password-protected pages
- Course or student portal
- Speaking engagements calendar
- Video embed (intro video, lecture clips)

---

## 13. Open Questions

| # | Question | Owner | Priority |
|---|----------|-------|----------|
| 1 | Does Nimish have a preferred domain name? `nimishjuvekar.com` is recommended. | Nimish | High |
| 2 | Should the Cognus Limited role (EHCP Coordinator) appear on the portfolio? It is on the Gamma site but not the resume. | Nimish | Medium |
| 3 | Is there a high-resolution professional photo available, or should we use the UEL staff photo? | Nimish | High |
| 4 | Should the contact form send to `N.Juvekar@uel.ac.uk` or `drievu.nimish@gmail.com`? | Nimish | High |
| 5 | Does Nimish want to link to the existing Gamma site or fully replace it? Recommended: replace, redirect Gamma to new domain. | Nimish | Medium |
| 6 | Who is building this — a hired developer or self-built? Affects stack recommendation. | Nimish | High |
| 7 | Any publications, conference talks, or guest lectures to feature in a future section? | Nimish | Low |

---

*PRD Version 1.0 — Ready for developer handoff pending open question resolutions.*  
*Prepared by: Acting PM (Claude) · March 2026*
