---
id: evergreen-tournament-content
status: open
deps: []
links: []
created: 2026-07-19T13:50:20Z
type: feature
priority: 2
parent: rankings123
tags: [retention, seo, content, automation]
---
# Evergreen post-tournament content system (turn spikes into steady traffic)

Build a system to convert one-time tournament content into evergreen traffic drivers. After major events (World Cup Final, TdF, Grand Slams), transform event-specific articles into year-round content: 'World Cup 2026 Final Results + 2030 Preview', 'Tour de France Winners History + 2027 Preview', 'US Open Champions 2026 + All-Time Records'. Add internal links to current live rankings, create 'What's Next' modules on every archived event page, and maintain SEO value post-event. Prevents traffic cliff after tournaments end.

## Acceptance Criteria

- Post-tournament article template: [Event] [Year] Results + [Next Year] Preview + Historical Context
- Every archived event page has 'What's Next in [Sport]' module linking to current live events
- Internal link network: Grand Slam pages → player pages → live rankings → betting content
- Meta tags remain optimized post-event: 'World Cup 2026 Final Results' not 'Live World Cup'
- Automated: when an event ends (detected via data feed), trigger content update to add 'What's Next' section
- Examples: /world-cup/final-2026 becomes evergreen with 2030 preview + link to TdF/US Open

## Notes

**2026-07-19T13:50:29Z**

**ROI Justification (first-principles):**
- **User need:** Fans search 'World Cup 2026 Final Results' for YEARS after the event (historical interest never dies)
- **Traffic cliff problem:** Without evergreen conversion, our WC Final content dies July 20. With it, it drives traffic through 2027-2030.
- **SEO long-tail:** 'World Cup 2026 Final' will get 10K+ searches/month for years. We already have the content — just needs 'What's Next' pivot to retain visitors.
- **Revenue multiplier:** One archived event page → links to 5 current live pages → session depth 5x → ad revenue 5x
- **Competitive gap:** ESPN/BBC don't link archived events to current rankings. We can be the 'historical + live' hybrid.

**Research source:** Post-World Cup retention research (gr8.tech, NEXT.io) shows 'evergreen content transformation' as #1 retention tactic. Quote: 'Turn your top World Cup posts into evergreen templates for playoffs, rivalries, and local events later in the year.'

**Why this is high-ROI:** Zero marginal content cost (reuse existing), massive traffic tail (years not days).
