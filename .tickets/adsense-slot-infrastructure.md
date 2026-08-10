---
id: adsense-slot-infrastructure
status: closed
deps: []
links: []
created: 2026-07-06T13:48:51Z
type: task
priority: 1
parent: rankings123
tags: [monetization, revenue]
---
# AdSense ad slot infrastructure preparation

Prepare AdSense ad slot infrastructure so we can activate ads IMMEDIATELY when approval comes (1-2 week lag). Define: leaderboard (top), in-content (mid-page), sidebar slots. Lazy-load below-fold. Zero-CLS (reserve space). Test with placeholder divs. First principles: Revenue = Traffic × RPM × Ad Inventory. This unblocks ad inventory axis. DOES NOT ship real ads until AdSense approval (CX-first: no placeholder ads to users).

## Acceptance Criteria

Ad slot components defined (Leaderboard, InContent, Sidebar). Lazy-load implemented. Zero CLS (reserved space). Slots conditionally render (only if AdSense approved). Code ready to flip env var and go live. Tested with placeholder divs locally. Does NOT show to users until AdSense ID is live. Effort: LOW. Impact: UNBLOCKS revenue path.

## Closed in backlog triage 2026-08-10
dup: ad-inventory
