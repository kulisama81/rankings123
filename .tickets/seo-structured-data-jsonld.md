---
id: seo-structured-data-jsonld
status: closed
deps: []
links: []
created: 2026-07-25T13:51:10Z
type: feature
priority: 1
parent: rankings123
tags: [seo, traffic]
---
# Structured Data (JSON-LD) for All Page Types

Implement JSON-LD structured data (Schema.org) for all page types to get rich results in Google. Current state: zero structured data = missing rich snippets, knowledge panels, enhanced search results. Need: Organization (homepage), SportsEvent (tournaments), Person (players), Article (content pages). This unlocks rich results = 2-3x higher CTR in search.

## Notes

**2026-07-25T13:51:26Z**

**ROI (First Principles - Enhanced Search Visibility):**

CURRENT STATE: Zero structured data on any page. Google treats us as generic webpage → no rich results.

COMPETITIVE DISADVANTAGE: Competitors with structured data get:
- Rich snippets (star ratings, event dates, player stats in search results)
- Knowledge panels (enhanced visibility)
- Event carousels (World Cup, TdF, Grand Slams)
These formats get 2-3x HIGHER CTR than plain text snippets.

ROOT DRIVER: Structured data = machine-readable markup. Tells Google 'this is a tennis player with ranking X' vs 'this is a webpage with text'. Google rewards explicit structure with enhanced display.

SEARCH BEHAVIOR: User searches 'jannik sinner' → Google shows knowledge panel with photo, current ranking, recent results (from competitor with structured data) → user clicks that, not us.

IMPACT: HIGH - 2-3x CTR improvement on pages with rich results
EFFORT: MEDIUM - JSON-LD templates per page type
ROI: VERY HIGH - Multiplies value of all SEO work (meta tags + structured data = rich results)

SCHEMA TYPES NEEDED:
- Organization (homepage): site name, logo, social links
- SportsEvent (tournaments): event name, dates, location, competitors
- Person (player pages): name, nationality, sport, stats
- Article (content): headline, author, date, description
- SportsTeam (World Cup teams)

**ACCEPTANCE CRITERIA:**
✓ JSON-LD on every page type
✓ Organization schema (homepage)
✓ SportsEvent schema (World Cup, TdF, Wimbledon pages)
✓ Person schema (player pages when built)
✓ Article schema (content pages)
✓ Validates in Google Rich Results Test
✓ No errors in Search Console Rich Results report
✓ Builds green

## Closed in backlog triage 2026-08-10
dup: seo meta cluster
