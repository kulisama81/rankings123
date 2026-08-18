---
id: bug-betting-guide-no-links
status: open
deps: []
links: [cincinnati-betting-guide, betting-affiliate-integration]
created: 2026-08-17T21:00:00Z
type: bug
priority: 1
parent: rankings123
tags: [bug, betting, cx-first, revenue]
---
# Cincinnati betting guide live without affiliate links (CX-first violation)

The Cincinnati Open 2026 betting guide at `/articles/cincinnati-open-2026-betting-guide` is live to users but contains **ZERO actual betting affiliate links**, despite ticket `cincinnati-betting-guide` being marked closed with acceptance criteria stating "Affiliate links integrated (FanDuel + Bet365 when approved)".

**CX-FIRST VIOLATION:** Per CLAUDE.md: "never ship placeholder, 'coming soon', empty, or fabricated UI to users — no 'Affiliate Partner: Placeholder', no made-up odds/stats/predictions, no dead links. Monetization or data UI ships only when backed by a real, working source/link; until then it stays hidden."

**Current state:**
- Page is publicly accessible and indexed
- Content includes betting analysis and odds
- NO betting partner CTAs or affiliate links anywhere on the page
- Only "affiliate" mention is disclaimer saying NOT affiliated with ATP/WTA (line 477)

**Impact:**
- Users see betting content but have no path to act on it (incomplete UX)
- Monetization UI shipped as placeholder (violates CX-first principle)
- SEO/content live but generating zero affiliate revenue

**Root cause:**
Ticket `cincinnati-betting-guide` was closed prematurely before affiliate links were integrated. Tickets `betting-affiliate-integration` and `betting-affiliate-top3-apply` are still open (affiliate programs not yet approved).

**URL:** https://rankings123.com/articles/cincinnati-open-2026-betting-guide
**Verified:** 2026-08-17 via live inspection

## Acceptance Criteria

1. EITHER: Hide the Cincinnati betting guide page (return 404 or show "coming soon") until affiliate links are ready
   OR: Integrate real, working affiliate links with proper tracking

2. If hiding: Add `export const dynamic = 'force-dynamic'` and gate on `process.env.BETTING_AFFILIATES_LIVE === 'true'`

3. If integrating links: Follow criteria from `betting-affiliate-integration` ticket (disclosure, tracking params, rel="noopener sponsored", mobile responsive)

4. **Regression test REQUIRED (per inspector mandate):** Create `tests/betting-content-gate.test.js` that:
   - Scans all `/articles/*betting*` and `/betting-*` routes
   - Fetches each page's HTML
   - FAILS if page is public (200 status) but contains NO affiliate links (no `href` matching known betting partner domains)
   - OR PASSES if page is gated (404/auth) when `BETTING_AFFILIATES_LIVE !== 'true'`
   - Run via `npm test`

5. Apply same fix to other betting content pages if they have the same issue (US Open betting guide, etc.)

6. Update `cincinnati-betting-guide` ticket notes documenting the premature closure
