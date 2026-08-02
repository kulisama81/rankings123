# Rankings123 Design Identity (North Star)

*Last updated: 2026-08-02*

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

**Performance optimization (2026-07-15):** All 5 fonts configured with `display: 'swap'` to prevent render-blocking and improve LCP. Fonts show fallback text immediately, then swap in when loaded — no invisible text (FOIT), better Core Web Vitals.

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

### 2026-06-28 (Weekly Run)

5. **["What Is a Brand Language?"](https://clay.global/blog/brand-language)** (June 22, 2026)
   - **Key takeaway:** Article was inaccessible (404 error) — retried 2026-07-05, still 404.
   - **Application:** Deferred — will check again next run.

### 2026-07-05 (Weekly Run)

6. **Clay Blog** — No new articles since last run (most recent still "What Is a Brand Language?" June 22, inaccessible).

### 2026-07-12 (Weekly Run)

7. **Clay Blog** — No new articles since last run (most recent still "What Is a Brand Language?" June 22, 2026)
   - Article URL remains inaccessible (404) — will retry next run

**Awwwards Data Visualization 2026 (May-June winners):**

8. **[Cleo AI](https://www.awwwards.com/)** (May 23, 2026) — Developer Award, Site of the Day
   - **Key takeaway:** Interactive financial data presentation with engaging UI, animated transitions between data states, clean typography for data hierarchy
   - **Application:** Confirms tooltips/interactive overlays are table-stakes for premium 2026 data viz — filed ticket `data-tooltip-overlays`

9. **[People's Audit](https://www.awwwards.com/)** (June 2026)
   - **Key takeaway:** Interactive charts with transparent data storytelling — hover/tap reveals context without cluttering the view
   - **Application:** Reinforces data tooltips pattern; also shows value of contextual overlays vs static numbers

**2026 Micro-Interactions Trends Research:**

10. **["How Micro-Interactions & Motion Design Improve UX in 2026"](https://acodez.in/micro-interactions-motion-design/)** + **["UI Trends 2026: Micro-Interactions, 3D & Immersive Design"](https://4tech.ma/en/ui-trends-2026-micro-interactions-3d-and-visual-immersion/)**
    - **Key takeaways:**
      - **Sophisticated easing functions:** Physics-based motion (spring, momentum) creates natural feel vs programmed cubic-bezier
      - **Haptic feedback integration:** Mobile devices pair visual animations with tactile vibrations (not visual-only)
      - **Minimalist, purposeful animation:** Moving away from flashy effects toward subtle, functional micro-interactions
      - **Accessibility standard:** `prefers-reduced-motion` becoming non-negotiable
    - **Application:** Filed tickets for `physics-based-easing-system` (spring motion), `haptic-feedback-micro-interactions` (mobile tactile), and `podium-trophy-micro-interactions` (purposeful celebration)

**Sports Website Design Trends 2026:**

11. **["Best Sports Website Designs 2026"](https://www.designrush.com/best-designs/websites/trends/best-sports-websites)** (DesignRush)
    - **Key takeaways:**
      - **Mobile-first critical:** 62.54% global traffic from mobile (Q4 2024), sports skews even higher
      - **High contrast & bold layouts:** Scores/rankings must pop instantly
      - **Performance matters:** 32% bounce increase from 1s to 3s load time (sports audiences less forgiving)
    - **Application:** Reinforces mobile-first priority; haptic feedback + gesture interactions are mobile-UX musts

12. **["How Data Visualization Is Changing Sports Analysis in 2026"](https://abstractsports.com/blog/how-data-visualization-is-changing-sports-analysis-in-2026/)** (Abstract Sports)
    - **Key takeaway:** "Raw data alone isn't enough" — need charts, comparison slides, highlight sequences, storytelling over statistics
    - **Application:** Tooltips/overlays add storytelling layer without cluttering view; filed `data-tooltip-overlays` as p2

**Awwwards Sports Sites (July 2026):**

7. **[day one® Run](https://www.awwwards.com/sites/day-one-r-run)** (Awwwards Nominee)
   - **Key takeaway:** Award-worthy through sophisticated motion choreography (GSAP, BARBA.js) — "Loader Reveal", "SVG Drawing", smooth page transitions. Combines big background imagery with parallax scrolling for layered depth. Scores 7.5+ across design, usability, creativity. "Effectively engages users through strategic use of color, typography, and imagery."
   - **Application:** Rankings123 needs similar entrance/transition choreography — not just static load. Filed ticket: `entrance-animation-choreography` (page load reveals, orchestrated timing).

**2026 Sports Data Viz Trends (Beyond Sports Report):**

8. **["From Data to Experience: Sports Visualization Trends to Watch in 2026"](https://www.beyondsports.nl/news/from-data-to-experience-sports-visualization-trends-to-watch-in-2026)** (Beyond Sports)
   - **Key takeaways:**
     - **Interactive over linear**: "Nearly 1/3 of viewers engage with interactive features while watching live broadcasts" — passive scrolling is out, active exploration is in
     - **Gaming platform integration**: Sports data in Roblox, platform-agnostic design
     - **Social-first short-form**: "48% of fans discover content via highlights and short clips on social platforms" — data-driven recreations ideal for instant visual storytelling
     - **Major events as gateways**: FIFA World Cup 2026 (LIVE NOW) is entry point for new audiences via interactive/gamified formats
     - **Core shift**: Sports data viz moving from "optional enhancement" to "core experience layer"
   - **Application:** Rankings123 is currently 100% static tables (passive). Need interactive tools (comparison, live match trackers, gamification). Filed tickets: `player-comparison-tool` (H2H interactive comparisons), `live-match-tracker-widget` (real-time urgency, gamification during World Cup).

**Awwwards Sports Sites (June 2026):**
- **Podium** (Site of the Day, June 27) — sophisticated interactive elements, Developer Award
- **Balmoral** (Site of the Day, June 19) — running community, movement-based design, photography-driven
- **FC Porto Memorial** (March 22) — sports heritage storytelling with narrative typography
- **Common patterns:** Motion design, responsive layouts, photography/imagery for hero moments, athletic energy + functional clarity
- **Application:** Filed tickets for sport background imagery (`sport-background-visuals`), premium table hover interactions (`table-hover-premium`), mobile-first table patterns (`mobile-table-patterns`), nav sport icons (`nav-sport-icons`), and accent glow system (`accent-glow-system`). Focus: move from "clean template" to "designed product people remember" with signature visual moments.

### 2026-07-19 (Weekly Run — WC Finals Day)

13. **["Partstack Picks Up Features and Awards Across the Design Community"](https://clay.global/blog/partstack-digest)** (July 14, 2026)
   - **Key takeaway:** "Two-typeface system that pairs Aeonik's personality with Inter's readability at small sizes" — strategic font pairing for both brand personality AND functional legibility in dense interfaces. Also: "Good design isn't reserved for consumer brands" — B2B/technical platforms benefit from same thoughtful design attention.
   - **Application:** Rankings123 has Geist Sans + Archivo but system is underutilized. Need more intentional pairing: Archivo extrabold for bold display moments (hero, page titles, podium ranks #1-3), Geist Sans for data-dense tables/body. Filed ticket: `typography-system-refinement` (p2).

### 2026-07-26 (Weekly Run — Post-WC, US Open Prep)

14. **["AI Is Changing Branding Whether You're Ready or Not"](https://clay.global/blog/brand-strategy-guide/ai-branding)** (July 22, 2026)
   - **Key takeaway:** "AI accelerates execution, not strategy" — critical warning: "Speed without direction produces polished noise." Before using AI to scale brand assets (social cards, OG images, ads), establish clear answers: What's your unique positioning? Who's your audience? What emotional response do you want? AI tools can encode brand language and rapidly generate visuals, but only AFTER the strategic foundation exists.
   - **Application:** Rankings123 has strong visual systems (tokens, typography, per-sport accents) but lacks documented strategic positioning. This creates risk: AI can generate hundreds of on-brand assets, but without clear strategy they'll be polished yet generic. Filed ticket: `brand-positioning-foundation` (p1) — create BRAND-STRATEGY.md BEFORE scaling AI-generated content. Clay's lesson: human expertise in domain knowledge (sports) and strategic positioning is irreplaceable; AI amplifies it, doesn't replace it.

**Awwwards Recent Winners (July 2026):**

15. **[Spotify Wrapped Party](https://www.awwwards.com/sites/spotify-wrapped-party)** (Site of the Day, Jul 24, 2026) — Developer Award
   - **Key takeaway:** "Transforms individual user data into compelling, shareable visual narratives" — takes personal streaming data and creates social-ready graphics fans WANT to share. Interactive, personalized, viral by design.
   - **Application:** Rankings123 should auto-generate shareable data cards for live moments (player reaches #1, tournament winner, milestone rank). Filed ticket: `shareable-data-cards-auto` (p1) — Spotify Wrapped pattern applied to sports rankings.

**2026 Design Trends Research (Figma + Industry):**

16. **Figma Web Design Trends 2026** + **Mobile-First Sports Patterns**
   - **Key takeaways:**
     - **3D/immersive elements:** Subtle 3D transforms (not heavy WebGL) create premium feel — card tilts on hover, layered depth, parallax
     - **Kinetic typography:** Numbers don't just update, they REVEAL — odometer flips, scale pulses, color flashes make data updates feel exciting
     - **Mobile-first imperative:** 62%+ global traffic is mobile, sports skews HIGHER — swipe gestures, haptic feedback, touch-optimized interactions are table stakes 2026
     - **Interactive data viz:** Award winners make data explorable (hover reveals context, charts tell stories) vs static tables
     - **Bold typography + vibrant colors:** Oversized headlines, neon gradients, high-contrast create energy matching sports' dynamic nature
   - **Application:** Filed tickets for `3d-depth-micro-effects` (p2), `kinetic-number-reveals` (p2), `interactive-performance-charts` (p3), `premium-mobile-swipe-gestures` (p2). These patterns differentiate premium 2026 sites from template-based competitors.

### 2026-08-02 (Weekly Run)

17. **["Cognitive Load: Hidden Reason Users Leave Your Website"](https://clay.global/blog/cognitive-load)** (July 28, 2026)
   - **Key takeaway:** Visual hierarchy breakdown (everything competing for attention at once) causes cognitive overload → users disengage. Each choice adds cognitive load (mental effort to process and act). Nielsen Norman Group research: reducing cognitive load directly increases task completion rates. "Clear hierarchy and fewer distractions cut cognitive load, improve readability, and lift conversions."
   - **Application:** Rankings123 site audit revealed CRITICAL cognitive load issues: "What's Live Now" carousel AND "All Sports" grid present similar content in different formats → redundancy forces users to scan multiple sections for same information. Filed ticket: `cognitive-load-homepage-ia` (p1) to consolidate into single prioritized section with progressive disclosure. Also filed `progressive-disclosure-tables` (p2) — showing 1000-row ATP tables all at once overwhelms users; collapsible rank bands (top 20 expanded, 21-50/51-100/etc collapsed) + "Jump to rank" navigation reduces cognitive load.

**Awwwards August 2026:**

18. **[Noomo Showcase](https://www.awwwards.com/sites/noomo-showcase)** (Site of the Day, Aug 1, 2026) — Developer Award (8.60/10)
   - **Key takeaway:** Award-winning through sophisticated GSAP + Three.js transitions: "Immersive Hero Transition", "3D Project Preview" cards with hover states, smooth preloader animations. Design is MINIMAL — just 2 colors (electric blue #0004EB + near-black #020411) for maximum visual impact, zero distraction. High-contrast + refined motion > complex palettes.
   - **Application:** Rankings123 lacks smooth transitions (pages feel abrupt, tables appear instantly). Filed tickets: `smooth-section-transitions` (p3, Framer Motion page cross-fades + table row staggers) and `high-contrast-minimal-mode` (p3, new "Focus Mode" theme with 2-color system for power users/accessibility). Also filed `realtime-data-indicators` (p2) — site audit showed no visible "Updated X ago" timestamps or pulse animations, undermining "live rankings" trust signal.

**2026 Web Design Trends — Post-Event Retention & Gamification:**

14. **Context-Aware Sticky Navigation** (timgraf.com/ui/beyond-sticky-context-aware-ui-patterns-redefine-user-experience-in-2026/)
   - **Key takeaway:** Sticky navigation in 2026 must be contextually aware, not just fixed. Contextual sticky bars appear/adapt as user scrolls past sections. A/B tests show 3-7% conversion lift (up to 25% in e-commerce).
   - **Application:** Rankings123 nav is already sticky + backdrop-blur (2026 pattern). Future evolution: contextual bars for live events ("Final in 2h" appears when scrolling past hero).

15. **Gamification for Retention** (StriveCloud benchmarks 2026, gr8.tech sports retention)
   - **Key takeaways:**
     - **Milestones drive 30%+ retention lift** — framing interaction as a journey with achievements (levels, badges, progress)
     - **Sports betting platforms:** Users engage more when it feels like a journey vs transactional (Club Brugge tripled return visits)
     - **Post-event critical window:** First 48 hours after major event determine lifetime value (MLS World Cup retention playbook)
     - **Discovery modules:** "What's next" content must go live WITHIN HOURS of tournament end to prevent bounce
   - **Application:** Filed tickets for post-event discovery modules (`post-event-discovery-module` p1, TIME-SENSITIVE for WC Finals today), gamification milestones (`gamification-retention-milestones` p3), and homepage urgency overhaul (`homepage-live-urgency-overhaul` p0 to fix 70% bounce crisis).

**World Cup Finals Day (July 19, 2026):**

Today is the FIFA World Cup 2026 Final (Spain vs Argentina, 3PM ET) — peak traffic moment for rankings123.com. This is a critical 48-hour window: post-tournament retention research shows the first 48 hours after a major event determine whether one-time visitors become recurring fans or bounce forever.

Filed TIME-SENSITIVE tickets:
- `wc-finals-celebration-treatment` (p1) — Special visual celebration for finals day (confetti, trophy prominence, gold accents)
- `post-event-discovery-module` (p1) — "What's Next" discovery for post-tournament pages (bridges WC → TdF final week → US Open)
- `homepage-live-urgency-overhaul` (p0) — Fix 70% homepage bounce by adding live urgency (dynamic headlines, countdowns, live card hierarchy)

---

## Evolution Roadmap

### Phase 1: Foundation Solidification (COMPLETE ✅)
- [x] Per-sport accent system
- [x] Dark/light themes + 3 design variants
- [x] Token-based CSS architecture
- [x] Apple Sports aesthetic base
- [x] **Logo/wordmark** (SHIPPED 2026-07-11 ✅) — Distinctive SVG with live dot integration
- [x] **Entrance animation choreography** (SHIPPED 2026-07-11 ✅) — Hero → cards → tables stagger
- [x] **Button 6-state system** (SHIPPED 2026-07-10 ✅) — Clay 2026 guidance
- [x] **Nav accent strengthening** (SHIPPED 2026-07-11 ✅) — Per-sport color identity
- [ ] **Favicon/app icons** (ticket `favicon`)

### Phase 2: Micro-Interaction Richness & Mobile-First (Current)
- [ ] **Data tooltip overlays** (ticket `data-tooltip-overlays`) — NEW 2026-07-12, p2 (award-winning pattern)
- [ ] **Sport hero imagery** (ticket `sport-hero-imagery`) — NEW 2026-07-12, p2 (replace emojis)
- [ ] **Rank change animations** (ticket `rank-change-animations`)
- [ ] **Hero depth treatment** (gradient layers, 3D transforms) (ticket `hero-depth-treatment`)
- [ ] **Mobile table patterns** (ticket `mobile-table-patterns`)
- [ ] **Podium trophy micro-interactions** (ticket `podium-trophy-micro-interactions`) — NEW 2026-07-12, p3
- [ ] **Haptic feedback micro-interactions** (ticket `haptic-feedback-micro-interactions`) — NEW 2026-07-12, p3 (mobile tactile)
- [ ] **Physics-based easing system** (ticket `physics-based-easing-system`) — NEW 2026-07-12, p3 (spring motion)
- [ ] **Typography scale amplification** (ticket `typography-scale-amplification`)
- [ ] **Icon system** (ticket `icon-system`)
- [ ] **Loading states** (ticket `loading-state-system`)
- [ ] **Empty states** (ticket `empty-state-design`)
- [ ] **Sport background visuals** (ticket `sport-background-visuals`)
- [ ] **Table hover premium** (ticket `table-hover-premium`)
- [ ] **Nav sport icons** (ticket `nav-sport-icons`)
- [ ] **Accent glow system** (ticket `accent-glow-system`)
- [ ] **Scroll reveal & parallax** (ticket `scroll-reveal-parallax`)
- [ ] **Ambient gradient pulse** (ticket `ambient-gradient-pulse`)

### Phase 3: Signature Moments & Interactive Features
- [ ] **World Cup finals countdown urgency** (ticket `wc-finals-countdown-urgency`) — p1 TIME-SENSITIVE (finals ~July 19)
- [ ] **WC Finals celebration treatment** (ticket `wc-finals-celebration-treatment`) — NEW 2026-07-19, p1 TIME-SENSITIVE (finals TODAY)
- [ ] **Post-event discovery module** (ticket `post-event-discovery-module`) — NEW 2026-07-19, p1 TIME-SENSITIVE (post-WC retention)
- [ ] **Homepage live urgency overhaul** (ticket `homepage-live-urgency-overhaul`) — NEW 2026-07-19, p0 CRISIS (70% bounce)
- [ ] **Typography system refinement** (ticket `typography-system-refinement`) — NEW 2026-07-19, p2 (Clay Partstack guidance)
- [ ] **Mobile table gestures** (ticket `mobile-table-gestures`) — NEW 2026-07-19, p2 (42% mobile traffic)
- [ ] **Gamification retention milestones** (ticket `gamification-retention-milestones`) — NEW 2026-07-19, p3 (2026 retention trend)
- [ ] **Live match tracker widget** (ticket `live-match-tracker-widget`)
- [ ] **Player comparison tool** (ticket `player-comparison-tool`)
- [x] **OG image templates** (ticket `og-image-templates`) — SHIPPED 2026-07-18 ✅
- [ ] **Social share cards** (ticket `social-share-cards`)
- [ ] **Data storytelling callouts** (ticket `data-storytelling-callouts`)

### Phase 4: Strategic Foundation & 2026 Premium Patterns (NEW — July 26)
- [ ] **Brand positioning foundation** (ticket `brand-positioning-foundation`) — NEW 2026-07-26, p1 (Clay AI branding guidance — strategy BEFORE AI scaling)
- [ ] **Shareable data cards auto** (ticket `shareable-data-cards-auto`) — NEW 2026-07-26, p1 (Spotify Wrapped viral pattern)
- [ ] **3D depth micro-effects** (ticket `3d-depth-micro-effects`) — NEW 2026-07-26, p2 (Figma 2026 — premium subtle 3D)
- [ ] **Kinetic number reveals** (ticket `kinetic-number-reveals`) — NEW 2026-07-26, p2 (Figma bold kinetic typography)
- [ ] **Premium mobile swipe gestures** (ticket `premium-mobile-swipe-gestures`) — NEW 2026-07-26, p2 (62% mobile traffic + haptic feedback)
- [ ] **Interactive performance charts** (ticket `interactive-performance-charts`) — NEW 2026-07-26, p3 (Awwwards data viz pattern)

### Phase 5: Cognitive Load Reduction & Minimal Premium (NEW — August 2)
- [ ] **Cognitive load homepage IA** (ticket `cognitive-load-homepage-ia`) — NEW 2026-08-02, p1 (Clay Jul 28 — consolidate redundant sections, clear hierarchy)
- [ ] **Real-time data indicators** (ticket `realtime-data-indicators`) — NEW 2026-08-02, p2 (trust signal: "Updated X ago" timestamps, pulse on changes)
- [ ] **Progressive disclosure tables** (ticket `progressive-disclosure-tables`) — NEW 2026-08-02, p2 (collapsible rank bands, jump-to-rank, reduces overwhelm)
- [ ] **High-contrast minimal mode** (ticket `high-contrast-minimal-mode`) — NEW 2026-08-02, p3 (Noomo 2-color system, Focus Mode theme)
- [ ] **Smooth section transitions** (ticket `smooth-section-transitions`) — NEW 2026-08-02, p3 (Noomo GSAP pattern, Framer Motion page cross-fades)

---

**Living document.** Update after each design-research run. All design tickets must ladder up to this identity — coherence over isolated tweaks.
