---
id: homepage-live-urgency-widget
status: open
deps: []
links: []
created: 2026-07-13T13:48:07Z
type: feature
priority: 1
parent: rankings123
tags: [engagement, homepage]
---
# Cross-sport 'Live Now' homepage widget - fix 72.6% bounce with urgency

## Notes

**2026-07-13T13:49:13Z**

## FIX 72.6% HOMEPAGE BOUNCE RATE

**Problem:** Analytics show 72.6% bounce rate on homepage (71 views, 22s avg session). Users land and leave without exploring.

**First Principles - Why Users Bounce:**
1. **No urgency signal:** Nothing tells them 'something is happening RIGHT NOW'
2. **No preview of value:** Can't see data without clicking through
3. **No personalization:** Can't tell what's relevant to them (tennis fan? soccer fan?)

**Solution: Cross-Sport 'Live Now' Widget**

Show WHICH events are live RIGHT NOW with preview data + urgency:

**Widget Design:**
- Position: Hero section below tagline, above sport categories
- Layout: Horizontal card carousel (mobile: swipe, desktop: 3 visible)
- Per-event card shows:
  - Sport icon + event name ('Wimbledon 2026', 'World Cup Semifinal', 'Tour de France Stage 10')
  - Live indicator (pulsing dot + 'LIVE' badge)
  - Key stat snapshot ('Pogačar leads by 2:42', 'Spain 1-0 France (67′)', 'Djokovic def. Alcaraz')
  - CTA: 'View Live Standings →'
- Auto-refresh every 20s (match other live data)
- Empty state: 'No live events — Next up: [upcoming event]'

**Data Sources:**
- Tour de France: check if race day (not rest day) → show GC leader
- World Cup: check if matches in progress → show score + time
- Tennis: check if Grand Slam dates → show latest result or ongoing match
- Aggregate from existing feeds (no new API needed)

**Engagement Hypothesis:** 'LIVE' urgency + data preview → users click through → bounce rate drops to <50%.

**Acceptance:** Homepage shows live widget when ≥1 event is live, widget hidden when no live events, click-through tracked, bounce rate measured before/after.
