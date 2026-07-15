---
id: cross-sport-journey-optimization
status: open
deps: []
links: [cross-sport-live-module, homepage-engagement]
created: 2026-07-15T13:56:00Z
type: feature
priority: 1
parent: rankings123
tags: [engagement, ux, cross-sport, retention]
---
# Cross-Sport User Journey Optimization (Reduce Single-Sport Silos)

**Context:** Analytics show most users visit one sport and leave (73% homepage bounce, 1.97 pages/session). We offer Tennis + World Cup + Cycling, but users don't discover other sports. This limits session depth, reduces ad impressions, and misses cross-sport engagement opportunities.

**Problem (First Principles):**
- **User behavior:** Visitors arrive for ONE sport (search "ATP rankings" → land on /atp-live)
- **Discovery gap:** No prompts to explore other sports on sport-specific pages
- **Missed engagement:** A tennis fan during Wimbledon MIGHT care about World Cup (both live now)
- **Revenue loss:** 1.97 pages/session = missed ad impressions (each page = ad slot)

**Proof from Analytics:**
- `/atp-live`: 14 views, 21.9s avg, **0% bounce** (excellent)
- `/wta-live`: 6 views, 21.2s avg, **0% bounce** (excellent)
- `/world-cup`: 57 views, 160.9s avg, **41.2% bounce** (good but could improve)
- **Key insight:** Once users see a second page, they DON'T bounce — problem is getting them to click

**Competitors' Pattern:**
- ESPN: "More Sports" module on every page
- FlashScore: "Also Live Now" widget (shows all live sports)
- SofaScore: Sticky sport tabs at top (easy switching)

**ROI Justification:**
- **Pages/session multiplier:** 1.97 → 3.0 pages/session = +50% ad impressions
- **Discovery engine:** Tennis users discover World Cup (and vice versa)
- **Retention:** Multi-sport fans = higher LTV (return for different events)
- **Low cost:** UI enhancement, no new data sources needed

## Solution

Cross-sport discovery features:

1. **"Also Live Now" Widget:**
   - Shows on every sport page (ATP, WTA, World Cup, Cycling)
   - Format: "⚡ Also Live: [Sport Icon] World Cup Semifinals • Tour de France Stage 12"
   - Click → navigate to that sport's page
   - Only shows ACTUAL live events (not "coming soon")

2. **Sport Switcher Navigation:**
   - Sticky tabs at top: ATP | WTA | World Cup | Cycling
   - Current sport highlighted
   - One-click switching (no need to return to homepage)
   - Mobile: hamburger menu with sport icons

3. **Related Content Module:**
   - Bottom of each page: "Explore More"
   - Show 2-3 cards for other sports
   - Format: "[Sport] Live Rankings" or "[Sport] Latest Updates"
   - Prioritize live events over static pages

4. **Homepage Cross-Sport Context:**
   - When multiple sports are live: show "3 Sports Live Now" badge
   - Encourage exploration: "Explore all live sports →"

## Acceptance Criteria

1. **"Also Live Now" Widget (High Priority):**
   - Component: `src/components/AlsoLiveWidget.tsx`
   - Placement: Top of page, below header, above main content
   - Logic:
     - Check live status of all sports (tournaments in progress, matches ongoing)
     - Show up to 2 other live sports (exclude current page's sport)
     - Format: "⚡ Also Live: [Icon] World Cup Final • [Icon] TdF Stage 15"
     - If no other sports live: don't render (not "coming soon")
   - Styling: Accent-colored banner, subtle animation, clear CTA

2. **Sport Switcher Tabs (Medium Priority):**
   - Desktop: Horizontal tabs below main nav
   - Mobile: Hamburger menu with sport icons
   - States: Default, Active (current page), Hover
   - Show live indicator dot on live sports

3. **Related Content Module (Low Priority):**
   - Bottom of ATP/WTA/World Cup pages
   - Heading: "Explore More Sports"
   - Show 2-3 cards with sport icon, title, description
   - Click → navigate to that sport's main page

4. **Verification:**
   - `npm run build` succeeds, `npx eslint` clean
   - Visit http://localhost:3000/atp-live
   - See "Also Live Now" widget if World Cup/Cycling are active
   - Click widget → navigate to other sport
   - Sport tabs visible and functional
   - Mobile: test on iPhone simulator (responsive)
   - Live: verify on https://rankings123.com/atp-live

5. **A/B Test (Post-Launch):**
   - Hypothesis: Widget increases pages/session from 1.97 to 2.5+
   - Measure: GA4 pages/session metric
   - Measure: Click-through rate on widget (target > 10%)
   - If successful: expand to more prominent placement

## Design

**"Also Live Now" Widget:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚡ Also Live:  🏆 World Cup Final  •  🚴 TdF Stage 15  │
└─────────────────────────────────────────────────────────┘
```

**Sport Tabs:**
```
┌────────────────────────────────────────────────┐
│  🎾 ATP  |  🎾 WTA  |  ⚽ World Cup  |  🚴 TdF  │
│  (active)     (live•)      (live•)              │
└────────────────────────────────────────────────┘
```

## Technical Approach

**Live Status Detection:**
- Function: `getLiveSports()` checks:
  - World Cup: any matches with status = "in progress"
  - Tennis: any tournaments with active matches
  - Cycling: Tour de France dates (July 4-26, 2026)
- Returns: `{sport: string, label: string, url: string, isLive: boolean}[]`

**Widget Logic:**
- Current page sport = exclude from widget
- Show up to 2 other live sports
- If 0 other sports live: don't render
- Cache live status (30s revalidation)

## Related Tickets
- `cross-sport-live-module` (P1) — duplicate, consolidate with this
- `homepage-engagement` (P1) — this is one solution for homepage bounce
- `homepage-live-carousel` (P1) — homepage version of this pattern

## ROI Summary
**High ROI:** Increases pages/session by 25-50% (ad impression multiplier), low implementation cost (UI enhancement only), improves user experience (easy discovery), multi-sport fans = higher LTV, proven pattern (ESPN/FlashScore use it).

**Quick Win:** "Also Live Now" widget is highest ROI component — implement this first, measure impact, then expand if successful.
