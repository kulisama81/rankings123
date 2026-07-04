---
id: bug-atp-wta-isr-single-player
status: closed
deps: []
links: []
created: 2026-07-03T05:04:06Z
type: bug
priority: 0
parent: rankings123
tags: [bug, atp, wta, isr, ui]
---
# ATP/WTA ISR renders only 1 player (API works, SSR broken)

**URL:** https://rankings123.com/atp-live and /wta-live

**Repro:**
1. Visit https://rankings123.com/atp-live or /wta-live
2. Inspect the initial SSR HTML (before client-side hydration)
3. Observe only 1 player rendered in the initial page load

**Expected:** Full ranking table (1000 ATP, 100 WTA) rendered in SSR HTML
**Actual:** Only 1 player (rank #1) rendered in SSR; grep -c "liveRank" returns 1 instead of 100+

**Severity:** P0 - Core feature broken. Users see incomplete rankings on page load until client-side refresh kicks in (20s delay). Terrible UX and hurts SEO (crawlers see only 1 player).

**Data verification:**
- API endpoints work correctly: /api/atp/live returns 1000 players, /api/wta/live returns 100 players ✓
- Client-side refresh works ✓
- SSR/ISR snapshot only contains 1 player ✗

**Root cause hypothesis:** ISR build-time data fetch or serialization truncating player array to first element.

## Acceptance Criteria

- SSR HTML for /atp-live and /wta-live must contain the full player list (verify with curl | grep -c "liveRank" ≥ 50)
- Regression test REQUIRED: Add a test in tests/ that verifies getLiveData('atp') and getLiveData('wta') return at least 50 players, OR add an invariant to check:data-sanity that validates SSR player counts
