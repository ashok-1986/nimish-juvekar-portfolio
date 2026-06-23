<design_plan>
## PYTHON RNG EXECUTION (SEED: 27)
```
HERO_LAYOUT: Editorial Split
FONT: Geist
COMPONENTS: ['Comparison Sliders', 'Infinite Marquee', 'Clip-path Reveals']
GSAP: ['Image Scale & Fade', 'Scroll Pinning (Split)']
```

## AIDA STRUCTURE CHECK
- ✅ Navigation: Floating glass pill navbar (Navbar.tsx)
- ✅ Attention (Hero): Editorial Split — text left, image right with massive negative space
- ✅ Interest (Bento): Core Competencies tag grid, Stats 4-column, Projects 2-col
- ✅ Desire (GSAP): ScrollyTelling (500vh canvas), Scroll Pinning Split, Image Scale & Fade
- ✅ Action (Footer): Dark obsidian footer with CTA

## HERO MATH VERIFICATION
- Layout: Editorial Split — H1 left, photo right
- Container: `max-w-6xl` (1152px) for H1 wrapper, ensures horizontal flow
- Font size: `clamp(3rem, 5vw, 5.5rem)` — guarantees 2-3 lines max
- NO stamp icons, NO spam tags, NO raw stats in hero
- Two high-contrast CTAs below text

## BENTO DENSITY VERIFICATION
- StatsSection: 4-column grid (2 on mobile) — `grid grid-cols-2 md:grid-cols-4 gap-6` — **zero empty cells**
- ProjectsSection: 2-column grid — `grid grid-cols-1 md:grid-cols-2 gap-6` — **4 cards fill perfectly**
- CompetenciesSection: `grid grid-cols-1 md:grid-cols-2 gap-6` with `grid-flow-dense` — **4 categories, zero voids**
- TeachingSection: `grid grid-cols-1 md:grid-cols-3 gap-6` — **3 modules, zero voids**
- QualificationsSection: `grid grid-cols-1 md:grid-cols-3 gap-6` — **3 degrees, zero voids**
- All grids: `grid-auto-flow: dense` applied

## LABEL SWEEP & BUTTON CHECK
- Meta-labels banned: "SECTION 01", "QUESTION 05", "ABOUT US" — **none found**
- Section eyebrows use semantic labels: "Expertise", "Education", "Credentials", "Portfolio", "Connect"
- Button contrast: Dark bg (obsidian) = white text; Light bg (zinc) = obsidian text; Accent (tangerine) = white text
- All CTAs verified for perfect legibility
</design_plan>