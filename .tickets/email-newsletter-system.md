---
id: email-newsletter-system
status: open
deps: []
links: [editorial-content-system, daily-report]
created: 2026-07-15T13:52:00Z
type: feature
priority: 1
parent: rankings123
tags: [email, engagement, revenue, retention]
---
# Email Newsletter System (Capture & Automated Digests)

**Context:** We have ZERO email capture. 73% homepage bounce means most visitors never return. Email is the #1 owned-audience channel for sports sites — direct communication, not dependent on search/social algorithms.

**Problem (First Principles):**
- **User's root need:** "Tell me when something interesting happens" (don't make me check manually)
- **Business need:** Build owned audience independent of Google/social platforms
- **Retention:** One-time visitors = $0 LTV; returning subscribers = compound engagement + revenue
- **Competitive disadvantage:** Every major sports site has email newsletters (ESPN, The Athletic, Sporting News)

**Proof from Analytics:**
- 55 users in 28 days, 74 sessions → most are first-time visitors
- No way to re-engage visitors who found us once
- World Cup ends July 19 — if we don't capture these visitors, we lose them forever

**ROI Justification:**
- **LTV multiplier:** Email subscriber LTV = 5-10× one-time visitor (return visits compound)
- **Revenue:** Direct monetization via betting picks emails (highest RPM content delivery)
- **SEO independence:** Owned channel protects against algorithm changes
- **Urgency:** World Cup traffic spike ending July 19 — capture NOW or lose audience
- **Low cost:** Email platforms (Mailchimp/ConvertKit) free tier covers <1,000 subscribers

## Solution

Build email newsletter system with:

1. **Email Capture:**
   - Homepage email signup form (prominent but non-intrusive)
   - Post-article signup CTA (content-gated upgrade)
   - Exit-intent popup (when user about to leave)

2. **Newsletter Types:**
   - **Daily Digest** (during major tournaments): top ranking changes, match previews, betting picks
   - **Weekly Recap** (off-season): ranking movers, upcoming tournaments, analysis articles
   - **Tournament Alerts** (2 weeks before major tournaments): draw release, predictions article
   - **Breaking News** (as-needed): major upsets, ranking milestones

3. **Automated Content:**
   - Pull from our existing data (top ranking changes, live events)
   - Link to new articles (from editorial content system)
   - Betting picks (when affiliate partnerships live)
   - Personalization (eventually): subscribe to ATP-only, WTA-only, World Cup, etc.

## Acceptance Criteria

1. **Email Service Integration:**
   - Choose platform: Mailchimp (easiest) or ConvertKit (creator-focused) or Loops (modern)
   - Free tier supports <1,000-2,000 subscribers (sufficient for launch)
   - API integration for programmatic email sending

2. **Signup Forms:**
   - **Homepage form:**
     - Below hero banner, above sport cards
     - Simple: email input + "Get weekly rankings updates" CTA
     - GDPR-compliant (checkbox consent, privacy policy link)
   - **Article page form:**
     - End of each article: "Want more predictions? Subscribe for weekly picks."
   - **Exit-intent popup:**
     - Trigger on mouse-leave-viewport
     - Show once per session
     - Easy dismiss (not annoying)

3. **Welcome Email (Automated):**
   - Sends immediately after signup
   - Subject: "Welcome to Rankings123 — Your Weekly Sports Update"
   - Content: What to expect, link to ATP Live + WTA Live + World Cup pages
   - CTA: "Check out this week's top ranking movers"

4. **Weekly Digest (Pilot):**
   - Send **every Monday 9 AM ET**
   - Subject: "[Week of July 15] Top Tennis Ranking Moves & Upcoming Tournaments"
   - Sections:
     - This week's biggest ranking changes (ATP + WTA top 3 movers)
     - Live events this week (tournaments in progress)
     - Upcoming: Next major tournament preview
     - Featured article link (from editorial content system)
     - World Cup update (while tournament live)
   - Footer: unsubscribe link, preferences link

5. **Email Template Design:**
   - Mobile-responsive (60%+ opens are mobile)
   - Brand-consistent (match site theme: clean, Apple Sports aesthetic)
   - Clear hierarchy: headline → key data → CTA
   - Fast-loading images (< 100KB total)

6. **Analytics:**
   - Track: open rate, click rate, unsubscribe rate
   - Goal: >25% open rate (industry avg 20-25% for sports newsletters)
   - Goal: >3% click rate

7. **Verification:**
   - Test signup flow on localhost
   - Receive welcome email within 1 minute of signup
   - Weekly digest sends on schedule
   - Unsubscribe link works
   - Mobile preview looks good (test in Gmail, iOS Mail, Outlook)
   - Live: homepage signup form visible at https://rankings123.com

## Technical Approach

**Option A (Recommended): Mailchimp**
- Free tier: 500 contacts, 1,000 emails/month
- API: `@mailchimp/mailchimp_marketing` npm package
- Pros: Reliable, good templates, GDPR-compliant
- Cons: Limited automation on free tier

**Option B: ConvertKit**
- Free tier: 1,000 subscribers
- Creator-focused (good for growing newsletter)
- API: REST API for automations
- Pros: Better automation, designed for content creators
- Cons: Learning curve

**Implementation:**
- `src/components/EmailSignupForm.tsx` — reusable form component
- `src/app/api/newsletter/subscribe/route.ts` — API endpoint for signups
- Server-side API calls (keep API keys secret)
- Store subscriber emails in email service only (not our DB — GDPR simplicity)

## Content Calendar (First 4 Weeks)

**Week 1 (July 15):** "World Cup Final Countdown + Tennis Ranking Shakeup"
**Week 2 (July 22):** "Post-World Cup Wrap-Up + US Open Countdown Begins"
**Week 3 (July 29):** "US Open Draw Release + Betting Odds Preview"
**Week 4 (Aug 5):** "US Open Predictions + This Week's Top Matches"

## Related Tickets
- `editorial-content-system` — newsletter links to articles
- `daily-report` (P2) — internal report, newsletter is public-facing version
- `email-newsletter` (existing?) — check for duplicates

## Privacy & Compliance

- GDPR-compliant: explicit consent checkbox, clear privacy policy
- CAN-SPAM compliant: physical address in footer, one-click unsubscribe
- Privacy policy: state we use email service, don't sell data
- No spam: only send content users signed up for

## ROI Summary
**High ROI:** Captures World Cup traffic spike before July 19, builds owned audience (5-10× LTV vs one-time visitors), enables direct betting picks monetization (highest RPM), protects against SEO algorithm changes, low cost (free tier platforms).

**URGENT:** World Cup ends in 4 days — every visitor we don't capture = lost forever. This is the single best time to build email list (high traffic moment).
