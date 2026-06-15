---
id: fold-top1000
status: open
deps: []
links: []
created: 2026-06-15T01:40:30Z
type: feature
priority: 1
parent: tennis-site
tags: [ui, ux, seo]
---
# Fold Top 1000 into ATP Live (remove separate page/nav)

Remove the standalone 'Top 1000' nav item and the /atp-rankings page; fold full-depth ATP ranking into /atp-live so users see the live top PLUS expandable depth to ~1000 in one view (a toggle or 'show more'/pagination beyond the live top 100). Data nuance: /atp-live uses ESPN (top ~100, live overlay); depth comes from UTS (atpDeepRanking) — unify so the live overlay applies to those in current draws and the tail simply extends. 301-redirect /atp-rankings (and /atp-rankings/[band]) to /atp-live to preserve SEO.

## Acceptance Criteria

/atp-live exposes ATP ranking to ~1000 via toggle/pagination with live overlay intact on top players; standalone Top 1000 nav link + /atp-rankings page removed or 301-redirected; no broken internal links or sitemap entries; build+lint green; verified live on rankings123.com.
