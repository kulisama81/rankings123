---
id: backlog-hygiene-post-wc
status: open
deps: []
links: []
created: 2026-07-20T13:50:06Z
type: task
priority: 1
parent: rankings123
tags: [process, worldcup]
---
# Clean up stale World Cup Final tickets (post-tournament backlog hygiene)

World Cup Final was July 19 (yesterday). Multiple p0 tickets reference future WC Final events that already happened. Need immediate cleanup: close or reprioritize wc-final-kickoff-time-prominent, wc-final-spain-argentina-preview, wc-homepage-final-promo, wc-how-to-watch-guide, wc-finals-countdown-system. Also consolidate duplicate AdSense tickets (ads-txt-create-now, adsense-approval-sprint overlap). Reduces p0 inflation from 24 to <10 genuine p0s.

## Acceptance Criteria

✓ Stale WC Final tickets (5+ tickets referencing July 19 as future) closed or reprioritized to p2+ ✓ Duplicate AdSense tickets consolidated to 1-2 canonical tickets ✓ P0 count reduced to <12 ✓ Remaining p0s are genuinely urgent ✓ Document in commit message which tickets were closed/reprioritized and why

## Notes

**2026-07-20T13:50:19Z**

**First-principles ROI:** Loop efficiency depends on signal-to-noise ratio. 24 p0 tickets (many stale) = broken prioritization signal. The planner can't distinguish genuinely urgent work from noise. Clean backlog → planner picks right work → faster velocity. **Impact:** HIGH (loop efficiency), **Effort:** LOW (review + close/reprioritize), **ROI:** VERY HIGH. Unblocks accurate prioritization.
