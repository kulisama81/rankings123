---
id: wc-semifinals-betting-hub
title: World Cup semifinals betting preview hub (July 14-15)
type: feature
status: open
priority: 1
parent: rankings123
tags: [worldcup]
created: 2026-07-09
---

# World Cup semifinals betting preview hub (July 14-15)

**TIME-SENSITIVE**: Semifinals are July 14-15 (5 days away). Build a comprehensive betting preview to capture search traffic and affiliate revenue.

## Opportunity
- **Search intent**: "World Cup semifinals odds", "[team A] vs [team B] prediction"
- **Timing**: 24-48hr before match = peak search + betting activity
- **Monetization**: Highest-RPM content type ($15-40 RPM for sports betting)
- **Tournament context**: Only 4 teams left = maximum attention

## Solution: Semifinals Betting Preview Hub

### Core Content (Per Match)
1. **Match Overview**
   - Teams qualified, how they got here (QF results)
   - Head-to-head history
   - Tournament form (goals scored, conceded, clean sheets)

2. **Betting Odds Comparison**
   - Moneyline (win/draw/win)
   - Over/Under goals
   - Both teams to score
   - Correct score predictions

3. **Key Player Matchups**
   - Golden Boot contenders
   - Goalkeepers (clean sheet odds)
   - Star player props (anytime goalscorer)

4. **Tactical Analysis**
   - Strengths/weaknesses
   - Predicted lineups
   - Injury news (ESPN API provides this)

5. **Prediction & Pick**
   - Expert pick with reasoning
   - "Best bet" highlight
   - Risk assessment (confidence level)

### Structure
```
/world-cup/semifinals
  ├─ Hub page: Both matches overview + bracket context
  ├─ /match/[id-sf1]: Detailed SF1 preview
  └─ /match/[id-sf2]: Detailed SF2 preview
```

### Affiliate Integration
- **Betting CTA boxes** (DraftKings, FanDuel, Bet365)
- "Get $200 bonus" prominent placement
- Affiliate links on odds displays
- Mobile-optimized (38% traffic)

## First Principles Reasoning
- **Root need**: "Who will win? Where can I bet on this?"
- **Timing truth**: Betting content value = f(time to match) — peak at 24-48hr before
- **Revenue driver**: Sports betting RPM = 3-4x general sports content
- **Tournament arc**: Only 3 matches left (2 SF + Final) = scarcity = urgency

## Data Sources
- **ESPN API**: Team stats, form, lineups, injury news
- **Odds** (manual for now; future: odds API integration)
- **Historical data**: FIFA archives, team records

## Success Metrics
- Pageviews on semifinals hub/previews (target >100 views over 3 days)
- Affiliate clicks (track outbound links to betting sites)
- Session duration >2 min (content depth)
- Organic search traffic (rank for "[team A] vs [team B] prediction")

## Acceptance Criteria
- [ ] Hub page at /world-cup/semifinals (both matches + bracket context)
- [ ] Detailed preview pages for each SF match
- [ ] Betting odds comparison table (manual entry OK for now)
- [ ] Key player matchups section
- [ ] Tactical analysis + prediction
- [ ] Affiliate CTAs (3+ placements per page)
- [ ] Mobile-optimized
- [ ] SEO metadata (title, description, og:image)
- [ ] Publish by July 13 EOD (24hr before SF1)
- [ ] Update after QF matches complete (teams confirmed)

## ROI Justification
**Impact**: HIGH — Semifinals = peak tournament attention; betting content = highest RPM  
**Effort**: MEDIUM — Content creation + odds data + affiliate integration  
**ROI**: VERY HIGH — Time-sensitive revenue opportunity (tournament ends July 19)

## Content Timeline
- **July 11**: QF matches complete, semifinalists known
- **July 12-13**: Write and publish previews (48hr before SF1)
- **July 14**: SF1 kicks off
- **July 15**: SF2 kicks off
- **July 17-18**: Prep final betting preview (reuse this pattern)
