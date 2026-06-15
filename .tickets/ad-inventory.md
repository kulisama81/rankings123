---
id: ad-inventory
status: open
deps: []
links: []
created: 2026-06-14T22:50:48Z
type: feature
priority: 2
parent: tennis-site
tags: [ads, revenue]
---
# Ad inventory (slots + AdSense)

Ad slot components (top leaderboard, in-table, sidebar), AdSense integration, lazy/viewability-friendly. BLOCKED on publisher ID from user.

## Acceptance Criteria

Ad slots render without CLS; AdSense gated on consent; placeholders when no publisher ID. UX GUARDRAIL (do not overwhelm users): low, non-intrusive ad density — at most ~1 leaderboard + 1 in-content/sidebar unit per page, no stacking/ad-walls; NO pop-ups, interstitials, auto-play-with-sound or content-blocking formats (Better Ads Standards); rankings tables stay the hero; below-the-fold ads lazy-load; mobile ads never cover content; site stays pleasant + fast (no LCP/CLS regression).
