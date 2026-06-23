# Technical Design Specification: Nimish Portfolio

**Domain:** `[https://nimish.drievu.com/](https://nimish.drievu.com/)`

**Aesthetic Framework:** 2026 Modernist Editorial / Headless Portfolio

---

## 1. Brand Theming & Color Distribution (60-30-10 Architecture)

The site implements a strict tokenized color structure to ensure an authoritative, high-contrast, minimalist digital canvas.

```scss
// Brand Color Tokens
$color-canvas:      #FAFAFA; // 60% - Main canvas, backgrounds, negative space
$color-primary:     #001621; // 30% - Typography, structural lines, fixed elements
$color-accent:      #FF4103; // 10% - CTAs, interactive states, dynamic stats
$color-text-dark:   #001621; 
$color-text-light:  #FAFAFA;

```

### Component Breakdown

* **Global Background:** `#FAFAFA`
* **Typography & Borders:** `#001621`
* **Micro-interactions & Accents:** `#FF4103` (Reserved strictly for interactive anchors, active links, data visualization points, and hover-triggered states).

---

## 2. Typography & Fluid Scaling Sheet

The typography architecture uses a dual-serif setup to simulate premium editorial print design. Text scaling is handled fluidly via CSS `clamp()` to bypass traditional static breakpoints.

### Font Families

* **Headings (H1–H6):** `"Times New Roman"`, serif
* **Subheadings & Body:** `"Playfair Display"`, serif

### Fluid Scale Definitions

```css
/* Core Scale Integration */
body {
  font-family: "Playfair Display", serif;
  font-size: 20px; /* Strict minimum base size */
  line-height: 1.6;
  color: #001621;
  background-color: #FAFAFA;
  -webkit-font-smoothing: antialiased;
}

h1 {
  font-family: "Times New Roman", serif;
  font-size: clamp(4rem, 8vw, 7.5rem); 
  line-height: 0.95; 
  letter-spacing: -0.02em; 
  font-weight: 700;
}

h2 {
  font-family: "Times New Roman", serif;
  font-size: clamp(3rem, 5vw, 5rem); 
  line-height: 1.0; 
  letter-spacing: -0.01em; 
  font-weight: 700;
}

h3 {
  font-family: "Times New Roman", serif;
  font-size: clamp(2rem, 3vw, 3rem); 
  line-height: 1.1; 
  font-weight: 700;
}

.subhead {
  font-family: "Playfair Display", serif;
  font-size: clamp(1.25rem, 2vw, 1.5rem); 
  font-style: italic;
  line-height: 1.4;
}

.stat-number {
  font-family: "Times New Roman", serif;
  font-size: clamp(5rem, 10vw, 9rem); 
  line-height: 0.9; 
  font-weight: 700;
  color: #FF4103;
}

```

---

## 3. Frontend Architecture (Bürocratik Stack Replication)

The presentation layer is decoupled from content management to ensure immediate paint times and smooth 60fps cinematic micro-animations.

* **Framework:** **Vue.js 3** encapsulated within **Nuxt.js** (configured for Hybrid Rendering / Static Site Generation). Nuxt handles intelligent automated route pre-fetching for instantaneous page transitions.
* **Styling Structure:** Bespoke, utility-free **SCSS modules**. Avoid utility frameworks (Tailwind/Bootstrap) to prevent structural footprint inflation and preserve layout integrity.
* **Animation Engine:** **GSAP (GreenSock Animation Platform)** paired with `ScrollTrigger` and `SplitText`. All textual elements (`h1`, `h2`, `.stat-number`) are wrapped inside structural `overflow: hidden` DOM masks to handle staggered vertical reveals on scroll hooks.
* **Smooth Scrolling Integration:** **Lenis Scroll** implementation to standardize inertia across operating systems, ensuring GSAP scroll animations scale smoothly regardless of trackpad or scroll-wheel inputs.

---

## 4. Headless Infrastructure & Data Management

* **Headless CMS:** **Sanity.io** serves as the structured content hub. Academic research documents, publications, teaching modules, and grading matrix percentages (e.g., Global Project Management - 88%) are queried at build time using **GROQ** via the Sanity API.
* **Static Asset Strategy:** To bypass compute bottlenecks, all heavy assets, research papers, image assets, and motion captures are hosted externally on an S3-compatible object storage infrastructure (**DigitalOcean Spaces**), delivered via a global CDN.

---

## 5. Deployment, Performance & Optimization Targets

* **Hosting Env:** Optimized via **Vercel's global edge network**.
* **Route Optimizations:** Automatic component chunking, standard critical CSS injection, and asset pre-fetching over active viewport links.
* **Core Web Vitals Target metrics:**
* Largest Contentful Paint (LCP): $< 1.2\text{s}$
* First Input Delay (FID): $< 10\text{ms}$
* Cumulative Layout Shift (CLS): $0.00$ (Guaranteed by strict structural aspect ratio boxes on image placeholders and static layout bounds).

---

## 6. Layout & Interface Guidelines

### Navigation UI

* Fixed structural positioning. Transparent backdrop shifting dynamically into `#FAFAFA` matching scroll progress.
* Minimalist 1px solid bottom divider tokened to `#001621`.

### Interaction States

* **Cursor Tracking:** Custom DOM element follower tracking absolute screen coordinates via GSAP, dynamically changing size or picking up color inversion when passing over `#FF4103` targets.
* **Buttons & Interactivity:** Focus states strictly defined via `outline: 2px solid #FF4103`. Text links display an animated underline expansion transitioning from left to right on active states.
