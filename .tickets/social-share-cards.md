---
id: social-share-cards
status: open
deps: [logo-wordmark, icon-system]
links: []
created: 2026-06-21T12:00:00Z
type: feature
priority: 3
parent: rankings123
tags: [design, engagement, social, viral]
---
# Shareable player/ranking graphics for social media

Enable users to generate + download/share branded graphics of specific rankings or player cards: "ATP Top 10 - June 21, 2026" with rankings123 logo, per-sport accent gradient, and data. Makes rankings123 content go viral on Twitter/Instagram; drives referral traffic. Per 2026 trends: "social-media-ready cards" are a core data viz feature.

## Acceptance Criteria

- "Share" button on ranking tables and player pages
- Generates PNG/JPG graphic (1080×1080 square for Instagram, 1200×675 for Twitter)
- Includes: rankings123 logo, accent gradient bg, selected data (Top 10 or player card), date stamp
- User can download or copy to clipboard
- Design matches site aesthetic (dark premium, per-sport accents)
- Works on mobile (tap to share via native share API)
- No server-side generation required (canvas API or html2canvas client-side)
- Applied to: LiveRankingTable, player detail pages (future), WorldCupTable

## References

- Spotify Wrapped shareable cards (viral social pattern)
- NBA app "Share Stat" graphics
- 2026 data viz trends: "automated, social-media-ready cards"
- Logo-wordmark + icon-system tickets (dependencies)
