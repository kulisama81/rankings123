---
id: homepage-data-preview-snippets
status: closed
deps: []
links: [homepage-engagement-crisis]
created: 2026-07-12T13:50:00Z
type: feature
priority: 1
parent: rankings123
tags: [homepage, engagement, ux, bounce-rate]
title: Homepage live data preview snippets (show value before click)
---
# Untitled ticket

# Homepage live data preview snippets (show value before click)

Fix the 71.4% homepage bounce rate by showing PREVIEW DATA before users click through. Research insight: "No sample data shown: Visitors can't preview what 'live rankings' looks like" — users leave because they can't see the value.

## Acceptance Criteria

- [ ] Top 5 ATP Live rankings shown on homepage (rank, player, country, points, change)
- [ ] Top 5 WTA Live rankings shown on homepage (same format)
- [ ] Top 3 World Cup Golden Boot shown on homepage
- [ ] Live match ticker if any matches in progress (tennis or WC)
- [ ] "Updated X minutes ago" timestamp under each preview
- [ ] "View full rankings →" CTA links to detailed pages
- [ ] Mobile-optimized cards (stack vertically on mobile)
- [ ] Data refreshes automatically (client-side polling or SSR revalidation)
- [ ] Independent verifier confirms: Value is VISIBLE without clicking

## Root Problem

**Analytics evidence:**
- Homepage: 71.4% bounce, 22.7s avg session
- ATP Live: 6.7% bounce, 17.3s avg session
- WTA Live: 0% bounce, 30.5s avg session
- Golden Boot: 0% bounce, 281.9s avg session

**Pattern:** Once users see the DATA, they stay. But homepage shows only LINKS — no data preview.

**Competitor insight:** FlashScore shows "quick-access match lists" on homepage, ESPN shows live scores. Users can see value immediately.

## Solution: Data Preview Snippets

### 1. Live Rankings Mini-Tables (Top 5)

Show condensed ranking previews ON the homepage:

**ATP Live Rankings (Top 5):**
```
🎾 ATP LIVE
1. Sinner 🇮🇹 10,330 pts (→)
2. Djokovic 🇷🇸 8,360 (+1)
3. Alcaraz 🇪🇸 7,950 (-1)
4. Zverev 🇩🇪 6,885 (→)
5. Medvedev 🇷🇺 6,485 (+2)
View full rankings →
```

**WTA Live Rankings (Top 5):**
Similar format, separate card

**World Cup Golden Boot (Top 3):**
```
⚽ GOLDEN BOOT RACE
1. Mbappé 🇫🇷 8 goals
2. Messi 🇦🇷 8 goals
3. Kane 🏴󠁧󠁢󠁥󠁮󠁧󠁿 6 goals
View full standings →
```

### 2. Live Match Ticker

If any matches are live NOW:
```
🔴 LIVE NOW
Djokovic vs Alcaraz — Set 2, 4-3
France vs Spain — 23', 1-0
```

### 3. "Updated X minutes ago" Timestamp

Under each preview:
- "Updated 2 minutes ago" (creates trust + urgency)
- Shows data is LIVE, not stale

## First Principles Reasoning

**Root user need:** "Is this site worth my time?" — answered in 3 seconds or they bounce

**Truth about bounce rate:**
- 71% bounce = value prop invisible
- Users who see data (ATP/WTA pages) = 0-6.7% bounce
- Proof: The data IS valuable, homepage just doesn't show it

**Conversion funnel:**
- Homepage with links only → user guesses value → 71% leave
- Homepage with data preview → user SEES value → stay to explore

**Sports site pattern:**
- FlashScore: Quick-access match lists (see matches without clicking)
- ESPN: Live score widgets (immediate value)
- Rankings123 currently: Directory of links (no immediate value)

## Success Metrics

- Reduce homepage bounce from 71.4% → <50% (match World Cup page at 41.7%)
- Increase homepage → content page CTR by 40%+ (more users click "View full rankings")
- Increase avg session duration from 22.7s → 45s+

## ROI Justification

**Impact:** VERY HIGH — Homepage is 39% of all pageviews (74/188), 71% bounce = losing 52 potential users  
**Effort:** MEDIUM — Reuse existing data feeds, build 3 mini-table components  
**Revenue:** More users reaching content pages = more ad impressions + session depth  
**Retention:** Users who see live data return more (proven by 0% bounce on content pages)  
**ROI:** VERY HIGH — Unlocks the 71% of homepage visitors currently bouncing

## Related Tickets

- `homepage-engagement-crisis` (p0) — Broader homepage engagement system
- This ticket is a SPECIFIC, high-ROI subset: show the data
