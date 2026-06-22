---
id: cycling-placeholder-violation
status: closed
deps: [cycling-dynamic-feed]
links: [cycling-section]
created: 2026-06-21T20:00:00Z
type: bug
priority: 2
parent: rankings123
tags: [cycling, ui, bug, cx-first-violation]
---
# Homepage cycling section shows placeholder content (CX-FIRST violation)

**URL:** https://rankings123.com (homepage)

**Repro:** Visit the homepage and scroll to the cycling events section.

**Expected:** Either real cycling event data OR the cycling section hidden entirely until dynamic data is available (per CX-FIRST rule).

**Actual:** Multiple 2026 cycling events display placeholder content:
- "Results not yet available" status on 8 major races (Milan-San Remo, Tour of Flanders, Paris-Roubaix, Liège-Bastogne-Liège, Giro d'Italia, Tour de France, La Vuelta, Il Lombardia)
- "TBD → Madrid · 2026" text for La Vuelta route
- Tour de France shows incorrect route "Paris → Nice · 2026" (should not match Paris-Nice race)

**Severity:** P2 (UI/CX violation — shows placeholder content when CX-FIRST rule requires hiding incomplete features)

**Context:** Per CLAUDE.md: "never ship placeholder, 'coming soon', empty, or fabricated UI to users... ships only when backed by a real, working source." The cycling-dynamic-feed ticket (P1, open) will wire real data, but until then the current placeholder content should be hidden rather than shown.

## Acceptance Criteria

1. Remove or hide all cycling events showing "Results not yet available" or "TBD" placeholder text from the homepage
2. Option A: Hide the entire cycling section until `cycling-dynamic-feed` is complete and real data is available
3. Option B: Show only cycling events with real, current data (if any exist)
4. No "coming soon", "TBD", or "Results not yet available" text visible to users
5. REGRESSION TEST REQUIRED: Add invariant to `scripts/check-data-sanity.mjs`:
   - Scan homepage content for prohibited placeholder patterns: /results not yet available|TBD|coming soon/i
   - Verify cycling events either have real data with valid dates/results OR are not rendered at all
   - Test fails with current placeholder content, passes when placeholders are removed/hidden
6. Run `npm run check:data-sanity` — passes
7. Build/lint green
8. Live-verified on https://rankings123.com
9. NOTE: This is a stopgap fix; `cycling-dynamic-feed` ticket will provide the real solution with dynamic data
