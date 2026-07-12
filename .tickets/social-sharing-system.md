---
id: social-sharing-system
title: Social sharing system (rankings, brackets, predictions)
status: open
deps: []
links: []
created: 2026-07-12T13:54:00Z
type: feature
priority: 2
parent: rankings123
tags: [engagement, viral, seo, retention]
---

# Social sharing system (rankings, brackets, predictions)

Enable users to share rankings, brackets, and predictions on social media for VIRAL GROWTH and SEO backlinks. Research insight: "No social sharing functionality visible" — missing a key organic growth lever.

## Why Social Sharing Matters (First Principles)

**Root user behavior:** Sports fans LOVE to share hot takes, predictions, and stats

**Viral growth pattern:**
1. User makes World Cup bracket prediction
2. Shares "My World Cup bracket" on Twitter/Facebook
3. Friends see link → click → use our bracket tool
4. Some friends share THEIR brackets → more clicks
5. **Compound effect:** One share → 5-10 new visitors → 2-3 shares → exponential

**SEO benefit:**
- Social shares → backlinks → domain authority
- Shared links → referral traffic (currently 3.1% of traffic, could be 20-30%)
- Twitter/Reddit shares → Google indexes → "World Cup bracket 2026" search visibility

**Engagement benefit:**
- Users who share = invested users = return visitors
- Sharing = commitment device ("I predicted France, gotta check if I'm right")

## What to Make Shareable

### 1. World Cup Bracket Predictions (HIGHEST VIRAL POTENTIAL)

**Flow:**
1. User fills out interactive bracket predictor
2. Click "Share my bracket"
3. Generates shareable image + link:
   ```
   [Image: User's bracket with their picks highlighted]
   "My World Cup 2026 bracket: France vs Argentina in the final! Make yours:"
   https://rankings123.com/world-cup/bracket?user=abc123
   ```

**Why this works:**
- Brackets = inherently shareable (March Madness proof)
- Friendly competition ("My bracket vs yours")
- World Cup = global event = massive sharing potential

### 2. "Share this ranking" Buttons (ATP/WTA)

**Use case:** User sees "Djokovic dropped to #3"
- Click "Share" → pre-populated tweet:
  ```
  "Djokovic drops to #3 in ATP Live Rankings after Wimbledon SF loss
  https://rankings123.com/atp-live"
  ```

**Why this works:**
- Tennis news = shareable content
- "Look at this ranking change!" = natural sharing behavior

### 3. Player Cards (Shareable Stats)

**Use case:** Golden Boot race
- Click "Share Mbappé's stats" → generates card:
  ```
  [Image: Mbappé - 8 goals, 5 assists, 6 matches played]
  "Mbappé leads the Golden Boot race with 8 goals!
  https://rankings123.com/world-cup/golden-boot"
  ```

**Why this works:**
- Fans share their favorite players' stats
- Visual cards perform better than text links on social

## Implementation Approach

### Phase 1: Basic Share Buttons (QUICK WIN)

**What:** Add share buttons to key pages
- World Cup bracket page
- ATP/WTA Live rankings
- Golden Boot page
- Match pages

**How:** Web Share API (native on mobile) + fallback social links
```typescript
if (navigator.share) {
  navigator.share({ title, text, url })
} else {
  // Fallback: Twitter, Facebook, Reddit links
}
```

**Effort:** LOW — Standard pattern, 1-2 hours

### Phase 2: Shareable Images (HIGH VIRAL POTENTIAL)

**What:** Generate images for sharing (bracket predictions, player cards)

**How:**
- Server-side: HTML → screenshot via Playwright or Puppeteer
- Or client-side: HTML Canvas → PNG
- Store image, generate unique URL

**Effort:** MEDIUM — Image generation + storage

**Priority:** Start with Phase 1 (share buttons), add Phase 2 if Phase 1 shows traction

## First Principles ROI Analysis

**Growth lever:**
- Current referral traffic: 3.1% (3/97 sessions)
- Industry benchmark for sports sites with social sharing: 15-25%
- **Upside:** 5-8× referral traffic growth potential

**Viral coefficient:**
- If 1 in 20 users shares (5% share rate)
- Each share → 3 clicks average
- 100 users → 5 shares → 15 new users → 0.75 shares → 2.25 new users
- **Viral coefficient = 0.15** (not self-sustaining but meaningful growth)

**Effort vs impact:**
- Phase 1 (share buttons): LOW effort, MEDIUM impact (enables sharing)
- Phase 2 (shareable images): MEDIUM effort, HIGH impact (maximizes viral potential)

**SEO benefit:**
- More shares → more backlinks → higher domain authority
- Social signals (Twitter shares, Reddit upvotes) → Google visibility
- Referral traffic → lower bounce rate → SEO ranking boost

**ROI:** MEDIUM-HIGH — Phase 1 is quick win, Phase 2 is high upside if Phase 1 validates

## Acceptance Criteria

### Phase 1 (MVP - Share Buttons):

- [ ] Share buttons on World Cup bracket page
- [ ] Share buttons on ATP Live and WTA Live pages
- [ ] Share buttons on Golden Boot page
- [ ] Share buttons on match pages
- [ ] Web Share API on mobile (native share sheet)
- [ ] Fallback social links (Twitter, Facebook, Reddit) on desktop
- [ ] Pre-populated share text (title + URL)
- [ ] Open Graph tags for rich link previews (image, title, description)
- [ ] Mobile-responsive placement
- [ ] Analytics tracking (measure share button clicks)

### Phase 2 (Future - Shareable Images):

- [ ] Bracket predictor generates shareable bracket image
- [ ] Player card image generation (Golden Boot, top scorers)
- [ ] Unique URL per shared item (e.g., /share/bracket/abc123)
- [ ] Image includes rankings123.com branding (subtle, bottom corner)

## Related Tickets

- `wc-bracket-predictor-interactive` (p2) — Interactive bracket tool (makes bracket sharing possible)
- `homepage-engagement-crisis` (p0) — Social proof on homepage (shares count as social proof)

## Success Metrics

- Share button click rate: target 5-10% of page visitors
- Referral traffic increase: 3.1% → 10%+ within 30 days
- Viral coefficient: measure new users from shared links
