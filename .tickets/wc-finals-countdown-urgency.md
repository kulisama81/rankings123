---
id: wc-finals-countdown-urgency
status: open
deps: []
links: []
created: 2026-07-12T07:30:00Z
type: feature
priority: 1
parent: rankings123
tags: [design, worldcup, engagement]
---
# World Cup finals countdown urgency widget

**TIME-SENSITIVE (World Cup finals ~July 19, 2026)** — Add countdown widget + urgency callouts to World Cup page to capture traffic spike. Show "Finals in X days" prominently, "Semi-finals TODAY" when live, match-in-progress indicators. Creates FOMO and engagement during tournament climax.

## Acceptance Criteria

- Countdown widget to finals match (July 19) visible on World Cup page
- Dynamic urgency messaging: "Finals in 3 days" → "Semi-finals TODAY" → "Finals LIVE NOW"
- Match-in-progress indicator (pulsing live dot + score) for current matches
- Widget positioned prominently (hero or sticky above bracket)
- Respects timezone (user-local or tournament-local time)
- Per-sport accent (World Cup green) for countdown/urgency elements
- Mobile-friendly (no horizontal scroll, readable on small screens)
- Auto-hides after tournament ends (~July 20)

## ROI

World Cup 2026 is a short-lived traffic spike (ends ~July 19) — urgency features capture casual visitors and drive repeat visits during finals week. Differentiation vs competitors (live-tennis.eu has no World Cup coverage). Quick implementation (~2-3h), high engagement impact.

## References

- 2026 trends: gamification drives engagement (Beyond Sports report)
- Current live dot + AnimatedNumber components (extend to countdown)
- Per-sport accent system (World Cup green #22c55e)
