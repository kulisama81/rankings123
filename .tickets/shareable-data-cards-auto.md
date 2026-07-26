---
id: shareable-data-cards-auto
status: closed
deps: []
links: []
created: 2026-07-26T00:00:00Z
type: feature
priority: 1
parent: rankings123
tags: [design, viral, engagement, revenue]
---
# Auto-generated shareable data cards — Spotify Wrapped pattern

Awwwards winner (July 24, 2026): Spotify Wrapped Party — "transforms individual user data into compelling, shareable visual narratives." Apply to rankings123: auto-generate social-ready graphics for live data moments (Alcaraz reaches #1, Messi scores winner, Pogacar takes yellow). Users share → viral growth → traffic → ad revenue.

Current gap: OG images are static templates. 2026 pattern: DYNAMIC, personalized, auto-generated cards optimized for Twitter/Instagram. FlashScore, SofaScore don't do this — differentiation opportunity.

## Acceptance Criteria

- API route `/api/share-card` generates PNG cards (1200×630 OG, 1080×1080 Instagram square)
- Templates: Rank milestone (player reaches top 10), Match result (score + winner hero), Tournament winner (trophy + podium)
- Dynamic data: player name, rank/score, sport accent color, rankings123 logo watermark (bottom-right)
- Typography: Archivo extrabold display (rank/score huge), Geist Sans metadata
- Background: sport-specific gradient (ATP lime, WTA magenta, WC green) + subtle texture
- Render: Satori (Vercel OG) or Playwright screenshots — fast, cacheable
- Share button on ranking tables: "Share [Player]'s rank" → generates card, copies link, opens share sheet (mobile)
- Pre-generate cards for top 10 players daily (cache in Vercel Blob), on-demand for others
- Performance: card generation < 500ms, CDN cached 24h
- A/B test: measure social referral traffic lift (expect 15-30% from similar implementations)
- Example: "Carlos Alcaraz reaches #1 — Live on Rankings123" card with big #1, player flag, accent glow
