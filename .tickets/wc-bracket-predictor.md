---
id: wc-bracket-predictor
status: closed
deps: []
links: []
created: 2026-06-23T13:51:35Z
type: feature
priority: 1
parent: worldcup
tags: [worldcup, engagement, revenue]
---
# World Cup interactive bracket predictor (full tournament)

Interactive bracket predictor where users fill out complete R32→Final predictions, save/share bracket URLs, compare predictions vs actual results as tournament progresses. Inspired by ESPN's predictor (drag-drop, multiple brackets, live tracking). MAJOR engagement driver (5-10 min fill time, repeat visits to check, shareable with friends) + natural betting affiliate context (predictors drive betting interest).

**ROI (First Principles):**
- **User need:** Fans want to PREDICT outcomes and test their expertise, not just passively view standings
- **Engagement:** Interactive tools = 5-10 min session time vs. 30s passive viewing; users return to check predictions
- **Virality:** Shareable bracket URLs drive organic traffic (users share with friends to compare predictions)
- **Revenue:** Natural betting affiliate context (users who predict want to bet); higher-value traffic for ads
- **Effort:** MEDIUM (bracket projection logic exists in worldCupBracketFeed; add input UI + localStorage/URL persistence)
- **Time-sensitive:** Tournament ends July 19 (~26 days) — this captures peak knockout engagement
- **Impact:** VERY HIGH (ESPN/FIFA/FOX all feature this = table stakes for engagement)

**Competitive research:** ESPN predictor ($10k prize pool, 25 brackets, group play), FIFA official bracket challenge, WorldCupBracket.xyz, Bleacher Report predictions all validate this is a MUST-HAVE engagement feature.

## Acceptance Criteria

1. **Bracket input UI:** Interactive bracket showing R32 through Final; users click matchups to select winners for each round
2. **Prediction persistence:** Save predictions to localStorage + encode in shareable URL (e.g., /world-cup/bracket?p=BASE64_ENCODED)
3. **Live comparison:** Show user's predictions alongside actual results as matches complete; highlight correct/incorrect picks
4. **Current standings integration:** Auto-populate R32 from current group standings (top 2 + best 8 third-place teams per 2026 format)
5. **Mobile responsive:** Works on phone (tap to select winners)
6. **No fabricated data:** If R32 not determined yet, show "TBD" slots (don't predict group outcomes)
7. **Mechanical verify:** Build/lint/check:data-integrity green, live-verified on rankings123.com/world-cup/bracket
