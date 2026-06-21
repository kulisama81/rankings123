# Rankings123 Design Identity (North Star)

*Last updated: 2026-06-21*

This document defines the visual identity for rankings123.com — a **distinctive, premium sports rankings hub** that stands out from commodity sites like live-tennis.eu. Data is always the hero; beauty serves scannability.

---

## Signature Idea

**Live data, living design.** The site feels *animated* without being gimmicky — pulsing live indicators, smooth number transitions, vibrant per-sport accent colors that shift as you move between ATP/WTA/World Cup. The design system **breathes** with the data it presents.

**Premium sports editorial** meets **real-time dashboard**. Think Apple Sports (clean, confident, bold type) crossed with high-end data viz (Awwwards-level craft, colorful-but-minimal). Not a spreadsheet, not a flashy distraction — a designed product people screenshot and remember.

---

## Type System

### Fonts in Use
- **Body:** Geist Sans (readable, neutral, modern)
- **Display/Headlines:** Archivo (600–900 weight) — sporty, condensed, distinctive vs. Inter/Roboto defaults
- **Monospace/Tabular:** Geist Mono (for data tables)
- **Broadcast variant:** Oswald (condensed uppercase, TV scoreboard aesthetic)
- **Classic variant:** Source Serif 4 (editorial almanac feel)

### Scale & Hierarchy
Current scale is functional but **can go bolder** on key data:
- **Hero headlines:** 3xl–5xl (48–72px), extrabold Archivo
- **Rank numbers in tables:** Large, prominent, tabular-nums always
- **Live scores/differentials:** Oversized when they're the story (2xl–3xl)
- **Section labels:** Small caps, tracked, muted — recede so data pops

**Next evolution:** Establish a more dramatic scale contrast — whisper-to-shout typographic rhythm that guides the eye to what matters (rank 1 is HUGE, rank 50 is smaller, metadata is tiny).

---

## Color & Accent Logic

### Base Themes
**Dark (default):**
- bg: `#0a0b0f` (near-black)
- surface: `#15171e` / `#1c1f28` (layered grays)
- text: `#f5f7fa` / muted `#9aa3b2`
- High contrast, premium feel

**Light:**
- bg: `#f6f7f9` (soft off-white)
- surface: `#ffffff` / `#eef0f3`
- text: `#0b1020` / muted `#5b6472`
- Crisp, editorial

### Per-Sport Accents (Dynamic)
Accent color shifts via `data-sport` attribute on wrapper:
- **ATP:** Lime `#b6f23c` (energy, grass courts)
- **WTA:** Magenta `#f472b6` (distinct from ATP, premium)
- **World Cup:** Green `#22c55e` (pitch, global)
- **Cycling:** Amber `#fbbf24` (sun, Grand Tours)

**Application:**
- Live dots, badges, active nav tabs, focus states, primary CTAs
- **Never** raw `text-gray-*`/`bg-white`/`text-white` — always use tokens (theming + readability enforcement)

### Semantic Colors
- **Up/Positive:** `#34d399` (green, gains)
- **Down/Negative:** `#f87171` (red, losses)
- **Trophy/Podium:** Gold `#d4af37`, Silver `#c7cdd6`, Bronze `#d08b5b`

---

## Spacing, Radius & Elevation

### Spacing Philosophy
**Generous whitespace = premium.** Dense data is readable when surrounded by breathing room.
- Card padding: 20–32px (p-5 to p-8)
- Section gaps: 48–64px vertical (mb-12+)
- Inline data: tight (gap-1.5 to gap-3)

### Border Radius
- **Court (default):** Bold rounded (2xl–3xl / 16–24px) — friendly, approachable
- **Broadcast:** Sharp (3px) — angular, TV graphics
- **Classic:** Subtle (5px) — restrained, editorial

**Consistency matters:** Use the established scale, don't introduce one-off `rounded-md`.

### Elevation Language
Layering via:
- **Borders:** Subtle `border-edge` lines separate without weight
- **Backgrounds:** `bg-surface` over `bg-bg`, `bg-surface2` for hover/active
- **Blur/Glass (selective):** `backdrop-blur` on modals, floating nav — max 2–3 instances per view (performance)
- **Gradients:** Radial accent washes in hero (`from-accent/20 via-accent/5 to-transparent`)

**Avoid:** Heavy box-shadows everywhere (dated 2018 card aesthetic). Use borders + background layers instead.

---

## Motion Principles

### Active Animations
- **Pulse dot:** Live indicator (1.6s ease-in-out loop) — site signature
- **Count-up:** Numbers animate on data refresh (smooth, not jarring)
- **Hover transitions:** 150–200ms, subtle translate/scale (`group-hover:translate-x-0.5`)

### Constraints
- **GPU-cheap only:** `transform`, `opacity` — never `width`/`height`/`top`/`left`
- **Respect `prefers-reduced-motion`:** Essential for accessibility
- **Purpose-driven:** Motion clarifies state change (loading → loaded, rank up), not decoration

**Next evolution:** Define a cohesive motion language — loading skeletons, page transitions, data refresh cues that feel like a choreographed system, not isolated effects.

---

## Component Language

### Current Patterns (Extend These)
1. **HeroBanner:** Gradient accent wash, large emoji icon, bold title, live badge, stat grid
2. **SportCard:** Rounded border, hover accent glow, live dot + label, arrow →
3. **RankBadge:** Tinted top-3 (gold/silver/bronze), tabular-nums
4. **Movement chips:** Colored pills (up green, down red, ▲▼ symbols)
5. **LiveDot:** Two-layer pulse (outer opacity fade, inner solid)

### Gaps to Fill (Design Tickets)
- **Logo/Wordmark:** Distinctive mark beyond "RANKINGS 123" text (see ticket `logo-wordmark`)
- **Loading states:** Branded skeleton/spinner that matches the accent system
- **Empty states:** Illustrations or messaging when no data (tournaments off-season)
- **Icon system:** Move beyond emojis (🏆🎾) to a cohesive icon set (sport glyphs, UI icons)
- **OG images:** Templated social cards with logo, accent gradient, dynamic data
- **Button refinement:** Full 6-state system per Clay 2026 guidance (enabled, hover, focus, pressed, disabled, loading)

---

## Do's & Don'ts

### DO
✅ Use design tokens exclusively (`text-fg`, `bg-surface`, `border-edge`)  
✅ Let data dominate — rankings/scores are always largest  
✅ Apply per-sport accents consistently (nav, badges, focus states)  
✅ Test dark + light + all 3 design variants on every change  
✅ Maintain WCAG AA contrast in both themes  
✅ Keep ad density LOW (≤1 leaderboard + 1 in-content per page)  
✅ Optimize for mobile-first (sports fans check scores on phones)  
✅ Preserve Core Web Vitals (LCP < 2.5s, no layout shift)

### DON'T
❌ Use raw Tailwind grays (`text-gray-400`, `bg-white`) — breaks theming  
❌ Add motion that doesn't serve a purpose (no "cool effect" for its own sake)  
❌ Obscure data with heavy graphics/illustrations  
❌ Introduce new fonts beyond the established system  
❌ Create one-off spacing/radius values (stick to the scale)  
❌ Ship placeholder/"coming soon" UI (hide unfinished features; CX-first)  
❌ Sacrifice performance for aesthetics (`backdrop-blur` limit: 2–3 layers)  
❌ Ignore `prefers-reduced-motion` (accessibility non-negotiable)

---

## References & Inspiration

### Primary (Check Every Run)
- **[Clay Blog](https://clay.global/blog)** — premium web design best practices, UI patterns, trends

### Award/Curation Sites
- **[Awwwards](https://www.awwwards.com/)** — cutting-edge web design, esp. sports/data viz categories
- **[Godly](https://godly.website/)** — curated design inspiration
- **[Land-book](https://land-book.com/)**, **[Mobbin](https://mobbin.com/)**, **[SiteInspire](https://www.siteinspire.com/)** — pattern libraries

### Sports/Data Apps Done Well
- **Apple Sports** (iOS/Android) — clean premium, bold type, per-sport color, smooth motion
- **ESPN**, **SofaScore**, **FotMob**, **The Athletic**, **FlashScore** — scannable data, high-contrast scores
- **[Awwwards: World Cup 2026, simplified](https://www.awwwards.com/sites/world-cup-2026-simplified)** — colorful + minimal + 3D, tournament data viz

### Design Fundamentals
- **Refactoring UI** — practical design for developers
- **Apple Human Interface Guidelines** — clarity, deference, depth
- **WCAG 2.1 AA** — accessibility baseline

---

## Clay Blog — Reviewed

Articles read and applied to rankings123 design strategy:

### 2026-06-21 (Initial Run)

1. **["Complete Guide to Buttons in Web Design for 2026"](https://clay.global/blog/buttons-web-design)** (April 21, 2026)
   - **Key takeaway:** Full 6-state system (enabled, hover, focus, pressed, disabled, loading) with specific labels ("Save changes" not "Submit"). Minimum 44×44px touch targets, clear hierarchy (primary/secondary/tertiary/destructive).
   - **Application:** Audit current buttons (nav tabs, toggles, filters) — ensure all states designed, focus rings visible (WCAG 2.2), generous mobile targets. *Ticket filed: `button-state-system`*

2. **["Why Everything Is Going Glassmorphism (And How to Do It Right)"](https://clay.global/blog/glassmorphism-ui)** (July 21, 2025)
   - **Key takeaway:** Use selectively (modals, floating cards), not full-page. Requires colorful backgrounds to work. Limit to 2–3 blur layers (performance). Dark mode needs higher opacity (20–30%).
   - **Application:** Current `backdrop-blur` on nav is good; avoid adding more without performance testing. If modals/overlays added later, use glass treatment with accent gradients behind. *No immediate ticket; noted for future.*

3. **[Awwwards: World Cup 2026, simplified](https://www.awwwards.com/sites/world-cup-2026-simplified)** (site analysis)
   - **Key takeaway:** Colorful + minimal + clean + 3D/animation. High scores (8–9.6) for balancing vibrant visuals with functional clarity. Experimental but digestible.
   - **Application:** Rankings123 already has colorful accents + clean layout. Opportunity: add subtle 3D depth to hero/cards (CSS transforms, layering), more ambitious loading/transition animations. *Ticket filed: `hero-depth-treatment`*

### 2026-06-21 (Afternoon Run)

4. **["20 Popular AI Assistants Compared"](https://clay.global/blog/ai-assistants)** (June 8, 2026)
   - **Key takeaway:** Not directly applicable to rankings123 design (focuses on AI tools comparison).
   - **Application:** Skipped — not relevant to visual identity work.

**2026 Sports Data Viz Trends Research:**
- **Awwwards Data Visualization Collection** — patterns: interactive data hierarchy, micro-interactions on state changes, strategic color for position changes (green up/red down), typography for numerical emphasis (scores/ranks larger/bolder than names), smooth animation frameworks (GSAP/Framer for rank transitions).
- **Beyond Sports 2026 report** — trends: interactive experiences over passive viewing, short-form social-first content, real-time dashboards, automated social-ready graphics.
- **Application:** Filed tickets for rank-change animations, social share cards, data storytelling callouts, nav accent strengthening. Focus on making "live" feel tangible through motion and making content viral-ready.

---

## Evolution Roadmap

### Phase 1: Foundation Solidification (Current)
- [x] Per-sport accent system
- [x] Dark/light themes + 3 design variants
- [x] Token-based CSS architecture
- [x] Apple Sports aesthetic base
- [ ] **Logo/wordmark** (ticket `logo-wordmark`)
- [ ] **Favicon/app icons** (ticket `favicon`)

### Phase 2: Refinement & Distinction (Next)
- [ ] **Button 6-state system** (ticket `button-state-system`)
- [ ] **Hero depth treatment** (gradient layers, 3D transforms) (ticket `hero-depth-treatment`)
- [ ] **Typography scale amplification** (ticket `typography-scale-amplification`)
- [ ] **Icon system** (ticket `icon-system`)
- [ ] **Loading states** (ticket `loading-state-system`)
- [ ] **Empty states** (ticket `empty-state-design`)
- [ ] **Nav accent strengthening** (ticket `nav-accent-strengthen`)
- [ ] **Rank change animations** (ticket `rank-change-animations`)

### Phase 3: Signature Moments (Future)
- [ ] **OG image templates** (ticket `og-image-templates`)
- [ ] **Social share cards** (ticket `social-share-cards`)
- [ ] **Data storytelling callouts** (ticket `data-storytelling-callouts`)
- [ ] **Ambient motion** — subtle background gradients that shift with sport context

---

**Living document.** Update after each design-research run. All design tickets must ladder up to this identity — coherence over isolated tweaks.
