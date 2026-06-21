---
id: site-changelog
status: open
deps: []
links: []
created: 2026-06-21T07:15:02Z
type: feature
priority: 1
parent: rankings123
tags: [ui, seo, content]
---
# Public changelog / What's New page (site log) linked in footer

Add a customer-facing 'What's New' / changelog page at /changelog, linked in the footer (next to Privacy/Cookies/Terms). Back it with a typed data file src/data/changelog.ts (entries: date, title, short blurb, area/sport tag) rendered newest-first, tokens-themed, with SEO metadata + sitemap entry. Seed it with the notable recent customer-facing changes (full World Cup schedule, projected knockout bracket with official FIFA pairings, World Cup top scorers/assists, ATP top-1000 + pagination, light mode + 3 designs, etc.). Going forward the planner appends an entry per customer-facing ship (now in the loop).

## Acceptance Criteria

1) /changelog renders entries from src/data/changelog.ts newest-first; linked in the footer; tokens-themed (dark+light); SEO metadata + sitemap entry. 2) Seeded with >=6 real recent customer-facing changes (no fabricated/placeholder entries). 3) REGRESSION TEST: a node --test unit test under tests/ asserting the changelog data is well-formed (each entry has date+title+blurb, dates valid, sorted/ sortable newest-first); npm test green. 4) build/lint/readability green; live-verified at rankings123.com/changelog (200).
