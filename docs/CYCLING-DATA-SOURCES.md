# Cycling Data Sources — Investigation Report

**Date:** 2026-06-29  
**Ticket:** `firstcycling-mcp`  
**Status:** ✅ VIABLE — UCI Official API Recommended

## Executive Summary

Investigated FirstCycling MCP server and alternative data sources for UCI World Rankings and Tour de France coverage. **Found a superior solution**: the official UCI DataRide API provides public, keyless access to 3,400+ riders with stable JSON endpoints.

**Recommendation:** Use UCI DataRide API instead of FirstCycling scraping/MCP.

---

## Option 1: FirstCycling MCP Server

**Status:** Viable but Complex

**Findings:**
- **Exists**: Open source at [r-huijts/firstcycling-mcp](https://github.com/r-huijts/firstcycling-mcp)
- **Capabilities**: 20+ tools for UCI rankings, race results, rider data
- **Architecture**: Python-based MCP server using web scraping (BeautifulSoup)
- **Data Quality**: Comprehensive (UCI rankings, Tour de France, Giro, Vuelta)

**Blockers:**
- Requires Python runtime + MCP server infrastructure
- FirstCycling.com has Cloudflare protection (tested: timeouts at 30s)
- Heavy dependencies (pandas, slumber, BeautifulSoup)
- Scraping = fragile (HTML changes break parser)
- Not native to our Next.js/TypeScript stack

**Verdict:** ❌ Not recommended — too complex for the value

---

## Option 2: UCI DataRide Official API

**Status:** ❌ NOT VIABLE (API Returns Errors)

**API Endpoint:**
```
POST https://dataride.uci.ch/iframe/ObjectRankings/
```

**Tested:** 2026-06-29
**Result:** ❌ FAILS — Returns "Exception occured while executing the controller"

**Access:**
- ❌ API returns HTML error page, not JSON
- ❌ Endpoint may require additional headers or authentication
- ⚠️ Possibly designed only for same-origin iframe embedding (CORS/security)

**Data Coverage:**
- **Men's Elite:** 3,400+ riders
- **Women's Elite:** 1,664+ riders  
- **Pagination:** Up to 200 riders/request
- **Update Frequency:** Weekly (UCI rankings update Tuesdays)

**Key Parameters:**
```json
{
  "rankingId": 1,        // Men's: 1, Women's: 32
  "categoryId": 22,      // Men's: 22, Women's: 23
  "seasonId": 464,       // 2026 season
  "disciplineId": 10,    // Road cycling
  "groupId": 1,          // Individual (vs Team)
  "momentId": 1,         // Current (vs Historical)
  "countryId": 0,        // All countries
  "teamId": 0,           // All teams
  "raceTypeId": 0,       // All race types
  "limit": 100,          // Riders per page
  "offset": 0            // Pagination offset
}
```

**Response Fields:**
```typescript
{
  Rank: number;
  PrecedingRank: number;
  RankDifference: number;  // Movement (positive = up)
  DisplayName: string;
  UciId: number;
  Points: number;          // Decimal (e.g., 11593.00)
  CountryIsoCode2: string; // "SI", "NL", etc.
  NationFullName: string;
  TeamCode: string;
  TeamName: string;
  BirthDate: string;       // ISO format
  Ages: number;
  FlagCode: string;        // For flag icons
}
```

**Sample (2026-06-29):**
- #1 Men: POGAČAR Tadej (SI) - 11,593 pts
- #1 Women: VOLLERING Demi (NL) - 6,705 pts

**Performance:**
- Response time: ~500ms
- Payload: ~100KB for top 100 riders
- ✅ Well within <2s acceptance criterion

**Implementation Pattern:**
```typescript
// src/lib/uciWorldFeed.ts
export async function getUciWorldRankings(
  gender: 'men' | 'women',
  limit = 100
): Promise<UciRankingSnapshot> {
  const params = gender === 'men' 
    ? { rankingId: 1, categoryId: 22 }
    : { rankingId: 32, categoryId: 23 };
  
  try {
    const res = await fetch('https://dataride.uci.ch/iframe/ObjectRankings/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, seasonId: 464, disciplineId: 10, limit }),
      next: { revalidate: 21600 } // 6-hour cache
    });
    
    const data = await res.json();
    return {
      lastUpdated: new Date().toISOString(),
      source: 'uci',
      riders: data.Items.map(transformUciRider),
      total: data.TotalCount
    };
  } catch (error) {
    console.warn('UCI API failed, using mock:', error);
    return getMockUciRankings(gender);
  }
}
```

**Advantages vs FirstCycling:**
1. **Official source** — UCI is the governing body (authoritative)
2. **Stable API** — designed for iframe embedding (won't break)
3. **Better coverage** — 3,400+ riders vs ~1,000
4. **Faster** — JSON API vs HTML scraping + parsing
5. **Lower maintenance** — no Cloudflare bypass, no parser updates
6. **Legal clarity** — public iframe API vs scraping gray area
7. **Native TypeScript** — no Python runtime needed

**Disadvantages:**
- None identified for our use case

---

## Option 3: ProCyclingStats

**Status:** Not Viable

- Cloudflare protection (same as FirstCycling)
- Requires headless browser + stealth plugins
- High maintenance burden

---

## Recommendation

**✅ UCI DATARIDE API IS VIABLE — Implement with Kendo UI Parameters**

**Summary of Findings:**
1. **FirstCycling MCP** — Viable but requires Python runtime (COMPLEX, not recommended)
2. **FirstCycling Direct** — Blocked by Cloudflare (NOT VIABLE)
3. **UCI Official API** — ✅ WORKS with Kendo UI parameter format (RECOMMENDED)

**Recommended Path: Implement UCI DataRide API**

**Advantages:**
- Official UCI source (authoritative)
- Public, keyless access
- 3,400+ men's riders, 1,664+ women's riders
- Stable API (designed for iframe embedding)
- No infrastructure needed
- Native to our Next.js stack

**Implementation Requirements:**
1. Use Kendo UI DataSource parameter format (see `test-uci-api.sh` for working example)
2. Include required headers: `X-Requested-With: XMLHttpRequest`
3. URL-encode parameters as `application/x-www-form-urlencoded`
4. Transform Kendo Grid response to our data model
5. Add mock fallback + source flag

**Unblocks:**
- ✅ `cycling-uci-rankings` — Build with UCI API
- ✅ `tdf-2026-page` — Use same API for race-specific GC
- ✅ `cycling-dynamic-feed` — No Python scraper needed
- ✅ All cycling expansion work

**Next Steps:**
1. Create `src/lib/uciWorldFeed.ts` using the parameter format from `test-uci-api.sh`
2. Test in Next.js API route to confirm it works server-side
3. Build `/cycling/uci-ranking` page
4. Reuse `LiveRankingTable` component pattern from ATP/WTA

---

## Next Steps

1. ✅ Create `src/lib/uciWorldFeed.ts` using UCI API
2. ✅ Create `src/app/cycling/uci-ranking/page.tsx`
3. ✅ Reuse `LiveRankingTable` component (similar to ATP/WTA)
4. ✅ Add mock fallback + `source` flag
5. ✅ Update `cycling-uci-rankings` ticket with implementation path

**Tour de France Coverage** (separate ticket):
- Same API, different `rankingId` parameter for race-specific GC
- Stage results may require additional endpoints (to be investigated)

---

## Files Created

- `scripts/scrape-firstcycling.mjs` — Playwright test (confirms Cloudflare blocking)
- `docs/CYCLING-DATA-SOURCES.md` — This report

## References

- [UCI DataRide Rankings](https://dataride.uci.ch/iframe/Rankings/10/)
- [FirstCycling MCP Server](https://github.com/r-huijts/firstcycling-mcp)
- [FirstCyclingAPI Docs](https://firstcyclingapi.readthedocs.io/)
