---
id: cycling-hide-until-ready
status: open
deps: []
links: []
created: 2026-06-23T13:51:43Z
type: bug
priority: 1
parent: rankings123
tags: [cx, data]
---
# Hide broken cycling section until dynamic feed ships

Analytics show cycling event pages getting traffic but 0.0s avg duration + 100% bounce rate = broken UX. cycling-dynamic-feed is BLOCKED on Python scrapers. Until real cycling data ships, HIDE cycling from navigation and homepage (per CX FIRST - never show placeholder/broken features). Immediate UX protection. Remove cycling nav link, hide cycling section from homepage. Re-show when cycling-dynamic-feed closes.

**Evidence (GA4 analytics):**
- `/events/giro-2026` — 1 view, 0.0s duration, 100% bounce
- `/events/tdf-2026` — 1 view, 0.0s duration, 100% bounce  
- `/events/vuelta-2026` — 2 views, 0.1s duration, 100% bounce
- 7 other cycling event pages: all 0.0s duration, 100% bounce

Users ARE finding these pages (likely via nav or homepage) but immediately leaving = bad UX hurting site trust.

**ROI:**
- **Impact:** MEDIUM (protects CX, stops bad UX from hurting overall site perception)
- **Effort:** VERY LOW (remove nav link, conditionally hide homepage section)
- **Urgency:** HIGH (every day cycling is visible = more users hitting broken pages)

## Acceptance Criteria

1. Remove "Cycling" from main navigation (src/components/Navigation.tsx or equivalent)
2. Hide cycling section from homepage (src/app/page.tsx) — use conditional render or remove section entirely
3. Cycling routes (/events/*) can stay (direct links still work for testing) but shouldn't be discoverable via site navigation
4. Add TODO comment: "Re-add cycling when cycling-dynamic-feed (ticket) ships"
5. Build/lint green, live-verified (cycling nav link gone from rankings123.com)
