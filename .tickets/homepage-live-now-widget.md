---
id: homepage-live-now-widget
status: closed
deps: []
links: []
created: 2026-08-15T13:51:43Z
type: feature
priority: 1
parent: rankings123
tags: [homepage, engagement, mobile]
---
# Homepage 'Live Now' cross-sport widget (fix 68% bounce)

BOUNCE CRISIS: Homepage 68.4% bounce rate (analytics). Users land, don't know what's happening now, leave.

FIRST-PRINCIPLES FIX: Sports fans visit for 'what's happening RIGHT NOW'. Show them immediately:
- 'Live Now: Cincinnati Open - 3 matches in play'
- 'Live Now: WTA Toronto - Sabalenka vs Rybakina'
- 'Upcoming: Vuelta Stage 1 - Aug 22'

COMPETITIVE REFERENCE: livetennis.com shows 'Happening Now' section. We don't.

IMPLEMENTATION: Hero widget at top of homepage pulling:
- Tennis: ESPN scoreboard (in-progress matches)
- Cycling: current race + stage
- World Cup: if active (tournament ended, so placeholder for next event)

MOBILE-FIRST: Large, high-contrast, obvious CTA → event page.

ROI: 9/10 — Addresses #1 bounce driver, mobile-friendly urgency signal, reuses existing data feeds.

## Acceptance Criteria

✅ Homepage hero section: 'Live Now' widget above sport cards
✅ Shows: Current in-progress matches/events from all sports
✅ Tennis: ESPN scoreboard (Cincinnati Open matches)
✅ Cycling: current race + stage
✅ Format: 'Live: [Event] - [Detail]' with →
✅ Click → event page (e.g., Cincinnati widget → /cincinnati-open-2026)
✅ Auto-hides if no live events
✅ Mobile: large touch target, high contrast
✅ Build green
