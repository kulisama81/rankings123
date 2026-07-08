/**
 * Site changelog — customer-facing "What's new" entries.
 * Each entry: date, title, short description, area/sport tag.
 * Newest entries first.
 */

export interface ChangelogEntry {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  area: "tennis" | "worldcup" | "cycling" | "site" | "all";
}

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-07-08",
    title: "Individual Tour de France Stage Pages",
    description:
      "Added dedicated pages for all 21 Tour de France 2026 stages at /events/tdf-2026/stage-[N]. Each page shows stage details (date, route, distance, type), winner when completed, and current jersey leaders. Click any stage number in the main TdF page to view detailed information.",
    area: "cycling",
  },
  {
    date: "2026-07-06",
    title: "New Rankings123 Logo & Wordmark",
    description:
      "Introduced a distinctive new logo design featuring the signature pulsing live dot integrated into the wordmark. The logo adapts to dark and light themes and appears in the navigation, favicon, and across the site.",
    area: "site",
  },
  {
    date: "2026-07-06",
    title: "Tour de France Live Widget on Homepage",
    description:
      "Added live Tour de France widget to homepage showing General Classification top 5 (when available) or yellow jersey leader during the race (July 4-26). Updates every 5 minutes with current stage progress and links to full TdF coverage.",
    area: "cycling",
  },
  {
    date: "2026-07-06",
    title: "Wimbledon Live Status Widget",
    description:
      "Added live Wimbledon tournament status widget to homepage and ATP/WTA ranking pages. Shows current tournament round and days remaining during Wimbledon 2026 (June 29 - July 12), with direct link to full tournament coverage.",
    area: "tennis",
  },
  {
    date: "2026-07-05",
    title: "Tour de France 2026 Live Race Data",
    description:
      "Tour de France page now shows live race data during the 2026 edition, including current stage status, jersey leaders (yellow, green, polka-dot, white), and real-time standings from Wikipedia. Race progress updates as stages complete.",
    area: "cycling",
  },
  {
    date: "2026-07-05",
    title: "Wimbledon 2026 Post-Tournament Champions Display",
    description:
      "Enhanced Wimbledon tournament page to show champions and final point changes after the tournament concludes (July 12). When the tournament ends, the page will display both Men's and Women's Singles champions with their final rankings and Wimbledon point gains.",
    area: "tennis",
  },
  {
    date: "2026-07-04",
    title: "Player Profile Pages",
    description:
      "Individual player pages now available for all ATP and WTA players, showing live rank, official rank, movement, points, and current tournament status. Click any player name in the rankings to view their profile.",
    area: "tennis",
  },
  {
    date: "2026-07-04",
    title: "Fixed ATP/WTA Live Rankings SEO",
    description:
      "Fixed server-side rendering for ATP and WTA live ranking pages — full player tables now load instantly for search engines and users, improving discoverability and initial page load experience.",
    area: "tennis",
  },
  {
    date: "2026-07-03",
    title: "Improved Empty State Designs",
    description:
      "Enhanced no-results and off-season messaging with sport-themed icons, helpful guidance, and clear filter-clearing actions. When search returns no players or tournaments are off-season, you'll see friendly, animated empty states instead of generic messages.",
    area: "site",
  },
  {
    date: "2026-07-03",
    title: "Giro d'Italia & Tour de Suisse 2026 Final Results",
    description:
      "Added final General Classification standings for completed cycling events: Giro d'Italia 2026 (winner: Jonas Vingegaard) and Tour de Suisse 2026 (winner: Tadej Pogačar). Browse complete top-20 GC standings and jersey winners for both races.",
    area: "cycling",
  },
  {
    date: "2026-06-30",
    title: "Distinctive Brand Icon & Favicon",
    description:
      "Launched new Rankings123 brand icon featuring bold '123' numerals with signature live-dot pulse. Distinctive favicon appears in browser tabs, home screen icons, and PWA installs — premium, on-brand, and memorable across all devices.",
    area: "site",
  },
  {
    date: "2026-06-30",
    title: "Wimbledon 2026 Live Coverage",
    description:
      "Added prominent Wimbledon 2026 live banner on homepage with tournament dates (June 29-July 12), defending champions, and direct link to tournament page. Capturing the massive search traffic spike during tennis's most prestigious Grand Slam.",
    area: "tennis",
  },
  {
    date: "2026-06-30",
    title: "ATP/WTA Live Performance Permanently Optimized",
    description:
      "Permanently resolved recurring performance issue on ATP and WTA Live pages. Pages now load 38% faster (ATP: 0.60s → 0.37s TTFB) with edge caching fully restored, while maintaining all table functionality. Architectural fix ensures fast load times during Wimbledon 2026 and all future tournaments.",
    area: "tennis",
  },
  {
    date: "2026-06-29",
    title: "ATP/WTA Live Tables Fixed",
    description:
      "Fixed critical bug where ATP and WTA Live ranking pages only showed 1 player instead of the full 1000+ ranking. Full tables and pagination controls are now working correctly.",
    area: "tennis",
  },
  {
    date: "2026-06-28",
    title: "Tour de France 2026 Live",
    description:
      "Added Tour de France 2026 coverage with 21-stage schedule, jersey leaders (yellow, green, polka-dot, white), and General Classification standings. Live updates throughout the race (July 4-26).",
    area: "cycling",
  },
  {
    date: "2026-06-28",
    title: "ATP/WTA Live Pages 2–3× Faster",
    description:
      "Restored edge caching on ATP and WTA Live ranking pages, reducing load times by 50-75% (ATP: 0.61s → ~0.2s, WTA: 0.31s → ~0.15s). Pages now load from the edge instead of origin servers, improving Core Web Vitals and user experience worldwide.",
    area: "tennis",
  },
  {
    date: "2026-06-27",
    title: "Tour de France 2026 Coverage",
    description:
      "Complete Tour de France 2026 coverage at /cycling featuring all 21 stages (Barcelona start on July 4 through Paris finish on July 26), stage types (mountain, hilly, flat, time trials), and live General Classification standings once the race begins. Stage schedule sourced from Wikipedia with real-time updates. New Cycling tab in main navigation.",
    area: "cycling",
  },
  {
    date: "2026-06-27",
    title: "Wimbledon 2026 Live Rankings",
    description:
      "Dedicated Wimbledon Championships page showing live ATP and WTA rankings during the tournament (June 29 - July 12). Toggle between men's and women's draws, see real-time ranking projections as matches complete, and track which players are still competing. Live points updates throughout the tournament at /tournaments/wimbledon-2026.",
    area: "tennis",
  },
  {
    date: "2026-06-27",
    title: "Interactive World Cup Knockout Bracket",
    description:
      "Visual bracket tree showing the full knockout path from Round of 16 through Final. Track projected matchups based on current group standings (marked with 'Proj' badge), watch them convert to confirmed fixtures as results come in, see live match indicators with pulsing badges, and click any match to view full details. The bracket updates in real-time as matches complete and scrolls horizontally on mobile for easy viewing.",
    area: "worldcup",
  },
  {
    date: "2026-06-26",
    title: "Advanced World Cup Match Statistics",
    description:
      "Match pages now display advanced statistics beyond just goals: possession percentage, pass accuracy, shots on target, saves, corners, fouls, and offsides. Stats are organized into visual comparison bars showing Possession & Passing, Shooting, and Discipline & Set Pieces. All stats pulled from ESPN in real-time, elevating rankings123 from basic score tracking to analytics-forward coverage.",
    area: "worldcup",
  },
  {
    date: "2026-06-26",
    title: "Live World Cup Scores on Homepage",
    description:
      "Homepage now shows live World Cup match scores when games are in progress! See real-time scores, match minute, and team flags for up to 4 live matches. Updates automatically every 20 seconds. Click any match to view full details. The widget appears only during live matches and hides when no games are happening.",
    area: "worldcup",
  },
  {
    date: "2026-06-25",
    title: "Improved Knockout Bracket Labels",
    description:
      "Knockout bracket now shows user-friendly match labels like 'Winner of R32 Match 1' instead of technical ESPN codes. Easier to understand which teams feed into each round of the knockout stage.",
    area: "worldcup",
  },
  {
    date: "2026-06-25",
    title: "World Cup Knockout Stage Hub",
    description:
      "New knockout stage hub at /world-cup/knockout! See the full R32→R16→QF→SF→Final bracket with live results, upcoming matches with countdown timers, and highlighted next matches. The primary destination for tracking the knockout rounds as they unfold. Click any match to view detailed stats and lineups.",
    area: "worldcup",
  },
  {
    date: "2026-06-24",
    title: "World Cup Head-to-Head History",
    description:
      "Historical head-to-head records now displayed on match pages! See past World Cup meetings between teams going back to 2002, including total wins, draws, losses, and recent match results. Great context for understanding rivalry history before big matches.",
    area: "worldcup",
  },
  {
    date: "2026-06-24",
    title: "World Cup Match Predictions",
    description:
      "Win probability predictions for upcoming World Cup matches! See which team is favored based on live betting odds from The Odds API. Predictions appear automatically for all scheduled fixtures, helping you gauge match outcomes before kickoff.",
    area: "worldcup",
  },
  {
    date: "2026-06-24",
    title: "World Cup Venue Pages",
    description:
      "New venue pages for all 16 World Cup 2026 stadiums! Visit /world-cup/venue/[stadium-name] to see all matches hosted at each venue, including schedule, results, and total goals scored. Great for planning your stadium visits or tracking matches by city.",
    area: "worldcup",
  },
  {
    date: "2026-06-23",
    title: "World Cup Group Qualification Scenarios",
    description:
      "Interactive group qualification calculator at /world-cup/scenarios! Simulate upcoming match results to see who advances from each group. Enter scores for remaining group stage matches and watch the standings update live. See which teams qualify as top 2 or best third-place finishers.",
    area: "worldcup",
  },
  {
    date: "2026-06-23",
    title: "Interactive World Cup Bracket Predictor",
    description:
      "New bracket predictor at /world-cup/bracket! Fill out your R32→Final predictions, save your bracket, and share with friends via URL. Compare your picks with actual results as the tournament progresses. Track how well you predict the knockout rounds.",
    area: "worldcup",
  },
  {
    date: "2026-06-23",
    title: "Faster World Cup page loads",
    description:
      "Improved World Cup page load performance by lazy-loading below-the-fold content. The page now loads faster on mobile, especially on slower connections, making it easier to check standings during live matches.",
    area: "worldcup",
  },
  {
    date: "2026-06-23",
    title: "Fixed /whats-new route",
    description:
      "The /whats-new URL now properly redirects to /changelog. Both URLs work, with /changelog as the canonical route.",
    area: "site",
  },
  {
    date: "2026-06-23",
    title: "Fixed ATP/WTA ranking tables",
    description:
      "Resolved a critical issue where ATP and WTA Live ranking tables were only showing the top player instead of the full ranking. All 1000 players now load correctly.",
    area: "tennis",
  },
  {
    date: "2026-06-23",
    title: "What's New page launched",
    description:
      "New public changelog page at /changelog showing all recent updates and features. Now you can see what's changed and what's coming next.",
    area: "site",
  },
  {
    date: "2026-06-23",
    title: "Focused on live features",
    description:
      "Removed cycling from our site description to focus on what's live now: tennis and World Cup. Cycling will return when we have real data to show.",
    area: "site",
  },
  {
    date: "2026-06-22",
    title: "Filter ATP/WTA rankings by country",
    description:
      "Tennis rankings now include a country filter dropdown. Select any nation to view only players from that country — perfect for tracking your country's players. Filter choice is saved in the URL so you can bookmark or share filtered views.",
    area: "tennis",
  },
  {
    date: "2026-06-22",
    title: "World Cup legend now always visible",
    description:
      "The group standings legend explaining team status colors (Advancing/Eliminated) is now always visible, helping you understand what to expect as the tournament progresses.",
    area: "worldcup",
  },
  {
    date: "2026-06-22",
    title: "World Cup page loads faster",
    description:
      "Optimized data fetching for the World Cup page — eliminated redundant API calls, reducing load time by ~100-200ms for a snappier experience during the tournament.",
    area: "worldcup",
  },
  {
    date: "2026-06-21",
    title: "Removed placeholder archive content",
    description:
      "Removed non-functional archive event pages to focus on live, real-time rankings. Tennis and World Cup coverage remain fully functional with live data.",
    area: "site",
  },
  {
    date: "2026-06-21",
    title: "Golden Boot race gets its own page",
    description:
      "New dedicated page for the adidas Golden Boot race with detailed stats: goals, assists, appearances, and goals-per-match for all top scorers.",
    area: "worldcup",
  },
  {
    date: "2026-06-21",
    title: "World Cup legend now matches visible team statuses",
    description:
      "The group standings legend now only shows 'Advancing' and 'Eliminated' keys when teams actually have those statuses, eliminating the confusing mismatch during mid-group play.",
    area: "worldcup",
  },
];
