# UCI DataRide API Investigation Report

**Investigation Date:** 2026-06-29  
**Target:** https://dataride.uci.ch  
**Goal:** Find keyless JSON API for UCI World Rankings (cycling)

---

## Executive Summary

**STATUS: ✅ VIABLE - Publicly accessible JSON API found**

The UCI DataRide platform exposes a **fully functional, keyless JSON API** that provides:
- **Men's Elite Road Rankings:** 3,400+ riders
- **Women's Elite Road Rankings:** 1,664+ riders
- **Pagination support:** Up to 200 riders per request
- **No authentication required**
- **No apparent rate limits** (tested with consecutive requests)
- **Rich data fields:** Rank, name, points, country, team, UCI ID, birth date, etc.

---

## API Endpoints Discovered

### 1. Main Ranking Data (Full List)
**Endpoint:** `POST https://dataride.uci.ch/iframe/ObjectRankings/`

**Content-Type:** `application/x-www-form-urlencoded; charset=UTF-8`

**Required Headers:**
```
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
X-Requested-With: XMLHttpRequest
```

**Parameters:**

**Men's Elite (Top 200 riders):**
```
rankingId=1
disciplineId=10
rankingTypeId=1
take=200
skip=0
page=1
pageSize=200
filter[filters][0][field]=CategoryId
filter[filters][0][value]=22
filter[filters][1][field]=SeasonId
filter[filters][1][value]=464
filter[filters][2][field]=MomentId
filter[filters][2][value]=0
```

**Women's Elite (Top 150 riders):**
```
rankingId=32
disciplineId=10
rankingTypeId=1
take=150
skip=0
page=1
pageSize=150
filter[filters][0][field]=CategoryId
filter[filters][0][value]=23
filter[filters][1][field]=SeasonId
filter[filters][1][value]=464
filter[filters][2][field]=MomentId
filter[filters][2][value]=0
```

**Working curl command (Men's):**
```bash
curl -X POST 'https://dataride.uci.ch/iframe/ObjectRankings/' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' \
  -H 'X-Requested-With: XMLHttpRequest' \
  --data 'rankingId=1&disciplineId=10&rankingTypeId=1&take=200&skip=0&page=1&pageSize=200&filter%5Bfilters%5D%5B0%5D%5Bfield%5D=CategoryId&filter%5Bfilters%5D%5B0%5D%5Bvalue%5D=22&filter%5Bfilters%5D%5B1%5D%5Bfield%5D=SeasonId&filter%5Bfilters%5D%5B1%5D%5Bvalue%5D=464&filter%5Bfilters%5D%5B2%5D%5Bfield%5D=MomentId&filter%5Bfilters%5D%5B2%5D%5Bvalue%5D=0'
```

**Working curl command (Women's):**
```bash
curl -X POST 'https://dataride.uci.ch/iframe/ObjectRankings/' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' \
  -H 'X-Requested-With: XMLHttpRequest' \
  --data 'rankingId=32&disciplineId=10&rankingTypeId=1&take=150&skip=0&page=1&pageSize=150&filter%5Bfilters%5D%5B0%5D%5Bfield%5D=CategoryId&filter%5Bfilters%5D%5B0%5D%5Bvalue%5D=23&filter%5Bfilters%5D%5B1%5D%5Bfield%5D=SeasonId&filter%5Bfilters%5D%5B1%5D%5Bvalue%5D=464&filter%5Bfilters%5D%5B2%5D%5Bfield%5D=MomentId&filter%5Bfilters%5D%5B2%5D%5Bvalue%5D=0'
```

### 2. Metadata Endpoints

**Discipline Seasons:**
```
GET https://dataride.uci.ch/iframe/GetDisciplineSeasons/?disciplineId=10
```
Returns: Season IDs (2026 = 464, 2025 = 444, etc.)

**Categories:**
```
GET https://dataride.uci.ch/iframe/GetRankingsCategories/?disciplineId=10&disciplineSeasonId=464
```
Returns: Men Elite (22), Women Elite (23), U23, Junior

**Ranking Groups (Dashboard View):**
```
POST https://dataride.uci.ch/iframe/RankingsDiscipline/
```
Returns: Top 3 riders from each ranking group (World, One Day, Stage Race, Continental Tours)

---

## Response Format

**Structure:**
```json
{
  "total": 3400,
  "data": [
    {
      "ObjectId": 149727,
      "Rank": 1,
      "PrecedingRank": 1,
      "UciId": 10014972740,
      "DisplayName": "POGAČAR Tadej",
      "FullName": "POGAČAR Tadej (UEX)",
      "IndividualFullName": "POGAČAR Tadej",
      "TeamName": "UAE TEAM EMIRATES XRG",
      "TeamCode": "UEX",
      "CountryIsoCode2": "SI",
      "NationFullName": "SLOVENIA",
      "BirthDate": "/Date(906328800000)/",
      "Ages": 28,
      "Points": 11593.00,
      "SanctionPoints": 25.00,
      "RankDifference": 0,
      "FlagCode": "si",
      "Position": "1st"
    },
    ...
  ]
}
```

**Key Fields for Rankings Table:**
- `Rank` - Current ranking position
- `RankDifference` - Change from previous rank (0, +N, -N)
- `DisplayName` - Rider name (formatted)
- `CountryIsoCode2` - ISO country code (SI, DK, etc.)
- `FlagCode` - Lowercase country code for flag CSS
- `Points` - UCI ranking points (decimal)
- `TeamCode` - 3-letter team abbreviation
- `TeamName` - Full team name
- `UciId` - Official UCI rider ID (unique)
- `BirthDate` - Microsoft JSON date format `/Date(timestamp)/`
- `Ages` - Current age

---

## Key Constants

**Discipline IDs:**
- `10` = Road Cycling (ROA)

**Ranking IDs:**
- `1` = Men's Elite UCI World Ranking
- `32` = Women's Elite UCI World Ranking

**Category IDs:**
- `0` = All
- `22` = Men Elite (ME)
- `23` = Women Elite (WE)
- `26` = Men Under 23 (MU)
- `27` = Women Under 23 (WU)
- `24` = Men Junior (MJ)
- `25` = Women Junior (WJ)

**Season IDs:**
- `464` = 2026
- `444` = 2025

**Ranking Type IDs:**
- `1` = Individual Ranking

---

## Pagination

**Maximum tested:** 200 riders per request (works without issue)

**Total available:**
- Men's: 3,400 riders
- Women's: 1,664 riders

**Pagination parameters:**
- `take` / `pageSize` - Number of results (max tested: 200)
- `skip` - Offset (0, 200, 400, ...)
- `page` - Page number (1, 2, 3, ...)

**To get top 100:**
```
take=100&skip=0&page=1&pageSize=100
```

**To get next 100 (101-200):**
```
take=100&skip=100&page=2&pageSize=100
```

---

## Rate Limits

**Tested:** 5 consecutive requests within 5 seconds  
**Result:** All requests succeeded with HTTP 200  
**Conclusion:** No apparent rate limit (or limit is very generous)

**Recommendation:** Still implement respectful delays (500ms-1s between requests) and caching to be a good API citizen.

---

## Data Freshness

**ComputationDate field example:** `/Date(1782172810488)/`  
This translates to: **2026-06-19** (approximately)

The rankings appear to update weekly (typical UCI schedule).

---

## Comparison: UCI API vs FirstCycling Scraping

| Feature | UCI DataRide API | FirstCycling Scraping |
|---------|------------------|----------------------|
| **Access** | Keyless JSON API | HTML scraping |
| **Reliability** | Official UCI data | Third-party aggregator |
| **Coverage** | 3,400+ men, 1,664+ women | ~1,000 men, fewer women |
| **Maintenance** | Low (stable API) | High (HTML changes break it) |
| **Data Quality** | Official UCI source | Derived from UCI |
| **Legal/ToS** | Public iframe API | Gray area (scraping) |
| **Implementation** | Simple fetch() | Complex parsing |

**Winner:** UCI DataRide API (official, stable, comprehensive)

---

## Sample Data

### Men's Top 10 (as of investigation)
1. POGAČAR Tadej (SI) - 11,593.00 pts - UEX
2. VINGEGAARD HANSEN Jonas (DK) - 8,625.14 pts - TVL
3. DEL TORO ROMERO Isaac (MX) - 5,339.71 pts - UEX
4. EVENEPOEL Remco (BE) - 5,277.86 pts - RBH
5. PIDCOCK Tom (GB) - 3,913.38 pts - PQT
6. GALL Felix (AT) - 3,663.00 pts - DCT
7. PHILIPSEN Jasper (BE) - 3,471.00 pts - APT
8. SEIXAS Paul (FR) - 3,403.83 pts - DCT
9. VAN DER POEL Mathieu (NL) - 3,290.00 pts - APT
10. DE LIE Arnaud (BE) - 3,193.00 pts - LOI

### Women's Top 10 (as of investigation)
1. VOLLERING Demi (NL) - 6,705.00 pts - TFS
2. BLASI CAIROL Paula (ES) - 4,956.33 pts - UAD
3. VAN DER BREGGEN Anna (NL) - 4,561.00 pts - SDW
4. WIEBES Lorena (NL) - 4,005.00 pts - SDW
5. NIEWIADOMA-PHINNEY Kasia (PL) - 4,001.00 pts - CSZ
6. LONGO BORGHINI Elisa (IT) - 3,212.00 pts - UAD
7. KOPECKY Lotte (BE) - 3,041.00 pts - SDW
8. SWINKELS Karlijn (NL) - 2,827.00 pts - UAD
9. KOCH Franziska (DE) - 2,691.67 pts - TFS
10. RÜEGG Noemi (CH) - 2,691.00 pts - EFO

---

## Implementation Recommendations for rankings123.com

### 1. Create Feed Module
Pattern: Similar to `src/lib/atpDeepFeed.ts`

```typescript
// src/lib/uciWorldFeed.ts
export async function fetchUCIRankings(gender: 'men' | 'women', limit = 100) {
  const rankingId = gender === 'men' ? 1 : 32;
  const categoryId = gender === 'men' ? 22 : 23;
  
  const params = new URLSearchParams({
    rankingId: String(rankingId),
    disciplineId: '10',
    rankingTypeId: '1',
    take: String(limit),
    skip: '0',
    page: '1',
    pageSize: String(limit),
    'filter[filters][0][field]': 'CategoryId',
    'filter[filters][0][value]': String(categoryId),
    'filter[filters][1][field]': 'SeasonId',
    'filter[filters][1][value]': '464', // TODO: Make dynamic per season
    'filter[filters][2][field]': 'MomentId',
    'filter[filters][2][value]': '0'
  });

  const response = await fetch('https://dataride.uci.ch/iframe/ObjectRankings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (compatible; rankings123.com)',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: params.toString()
  });

  const json = await response.json();
  return json.data.map(mapUCIRider);
}

function mapUCIRider(raw: any) {
  return {
    rank: raw.Rank,
    prevRank: raw.PrecedingRank,
    name: raw.DisplayName,
    country: raw.CountryIsoCode2,
    countryName: raw.NationFullName,
    points: raw.Points,
    team: raw.TeamCode,
    teamName: raw.TeamName,
    uciId: raw.UciId,
    age: raw.Ages,
    movement: raw.RankDifference
  };
}
```

### 2. Caching Strategy
- **Server-side:** Cache for 6-12 hours (rankings update weekly)
- **Client-side:** SWR with 1-hour stale time
- **Mock fallback:** Bundle top 100 as static JSON for offline/error scenarios

### 3. Page Structure
Create `/cycling` route with tabs:
- Men's UCI World Rankings
- Women's UCI World Rankings
- (Future: U23, Junior, Continental Tours)

### 4. Table Component
Reuse `LiveRankingTable.tsx` pattern with cycling-specific columns:
- Rank (with +/- indicator)
- Rider Name
- Country (flag)
- Team (abbreviation with hover for full name)
- UCI Points (formatted to 2 decimals)
- Age (optional column)

### 5. SEO Strategy
- Title: "Live UCI World Rankings - Men's & Women's Cycling 2026 | rankings123"
- Description: "Real-time UCI World Rankings for professional road cycling. Track the top riders..."
- Schema.org markup for SportsEvent/Standings

---

## Risks & Mitigations

### Risk 1: API is undocumented / could change
**Mitigation:** 
- Monitor for breaking changes via daily `data-sanity` checks
- Implement mock fallback (same pattern as ATP/WTA)
- Version the feed module for easy rollback

### Risk 2: SeasonId/MomentId hardcoded
**Mitigation:**
- Fetch current season dynamically from `GetDisciplineSeasons` endpoint
- Use `momentId=0` for "latest" (appears to work)
- Add season-switcher UI later for historical rankings

### Risk 3: Rate limiting added later
**Mitigation:**
- Cache aggressively (6-12 hour TTL)
- Implement exponential backoff on 429/503
- Add User-Agent identifying rankings123.com (be transparent)

### Risk 4: Legal / ToS concerns
**Assessment:** 
- This is a **public iframe API** designed for embedding
- No robots.txt restrictions on `/iframe/` path
- Similar usage pattern to live-tennis.eu (who likely use similar methods)
- **Recommendation:** Proceed, but add attribution link to dataride.uci.ch

---

## Next Steps

1. **Immediate:** Create `src/lib/uciWorldFeed.ts` (feed module)
2. **Immediate:** Add `/cycling` route with Men's/Women's tabs
3. **Soon:** Add UCI to the sport nav menu
4. **Soon:** Implement caching layer (same pattern as ATP/WTA)
5. **Later:** Add U23/Junior rankings
6. **Later:** Add historical rankings (season switcher)
7. **Later:** Add rider detail pages (via `/iframe/RiderRankingDetails/`)

---

## Files Created During Investigation

- `investigate-uci-api.js` - Initial network capture script
- `capture-uci-request.js` - POST request capture
- `capture-full-ranking.js` - Full ranking details capture
- `final-uci-test.js` - Working endpoint verification
- `uci-response-sample.json` - Sample dashboard response (8 groups, top 3 each)
- `UCI-API-INVESTIGATION-REPORT.md` - This report

---

## Conclusion

The UCI DataRide API is **production-ready for rankings123.com**. It's:
- ✅ Publicly accessible (no API key)
- ✅ Official source (direct from UCI)
- ✅ Comprehensive (3,400+ men, 1,664+ women)
- ✅ Well-structured JSON
- ✅ Supports pagination
- ✅ No apparent rate limits
- ✅ More reliable than scraping FirstCycling

**Recommendation: PROCEED with implementation. Priority: HIGH (Phase 2 differentiation)**

This gives rankings123 a **competitive edge** — cycling rankings are a natural extension that competitors (live-tennis.eu) don't offer, and it's a sport with **significant global following** (Tour de France, Giro, Vuelta, Classics).

---

*Investigation completed: 2026-06-29*  
*Investigator: Claude (rankings123 research agent)*
