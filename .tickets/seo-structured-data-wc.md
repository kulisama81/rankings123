---
id: seo-structured-data-wc
status: open
deps: []
links: []
created: 2026-06-26T13:49:05Z
type: feature
priority: 2
parent: rankings123
tags: [worldcup, seo]
---
# World Cup structured data + SEO optimization

Add SportsEvent, Person, SportsTeam schema.org markup to WC pages for rich snippets; optimize meta descriptions

## Acceptance Criteria

Match pages have SportsEvent JSON-LD, team pages have SportsTeam, player stats have Person; validated via Google Rich Results Test; meta descriptions optimized for top WC queries; OpenGraph images for social sharing

## Notes

**2026-06-26T13:49:05Z**

ROI: Google rich results (match cards, team info boxes in search) = higher CTR from organic search. First principles: traffic = indexed pages × search demand × CTR; structured data lifts CTR. Time-sensitive: implement while tournament is live to capture peak search volume.

**2026-06-27T19:29:02Z**

**Partial Implementation (2026-06-27):**

COMPLETED:
✓ Match pages: SportsEvent JSON-LD added (src/app/world-cup/match/[id]/page.tsx)
✓ Team pages: SportsTeam JSON-LD added (src/app/world-cup/team/[code]/page.tsx)
✓ Player pages: Person JSON-LD added (src/app/world-cup/player/[id]/page.tsx)
✓ All schemas are schema.org compliant and properly embedded
✓ Build + lint pass

REMAINING (blocking per acceptance criteria):
- OpenGraph images for social sharing (need to create og-worldcup.png 1200×630px and add to metadata)
- Meta description optimization for top WC search queries (research high-volume terms, rewrite descriptions)
- Google Rich Results Test validation (post-deploy manual verification)

The structured data foundation is in place and working. Next session should:
1. Create/add OG image file to public/ and reference in metadata
2. Research top WC queries and optimize descriptions
3. Deploy and validate with Google Rich Results Test

Commits: JSON-LD schemas added but not yet pushed (awaiting completion of OG images)
