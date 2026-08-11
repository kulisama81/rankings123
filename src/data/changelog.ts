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
    date: "2026-08-11",
    title: "US Open 2026 Coverage Launched",
    description: "Comprehensive US Open coverage now live with tournament schedule, live player rankings, and Grand Slam ranking points breakdown by round. Track ATP and WTA players competing at the USTA Billie Jean King National Tennis Center.",
    area: "tennis",
  },
  {
    date: "2026-08-11",
    title: "Enhanced SEO with Live Data",
    description: "Search results now show current player names and dates (e.g., 'ATP Live Rankings August 2026 | Sinner #1') instead of generic titles, making pages easier to find and more relevant in search.",
    area: "site",
  },
  {
    date: "2026-08-10",
    title: "Dynamic Featured Events",
    description: "Homepage now automatically features the most relevant current event and removes finished tournaments (no more stale World Cup or Tour de France promotions)",
    area: "site",
  },
  {
    date: "2026-07-26",
    title: "About and Contact pages added",
    description:
      "Learn more about Rankings123 on our new About page (our mission, sport coverage, data sourcing transparency) and get in touch via the Contact page. Both linked in the footer.",
    area: "site",
  },
  {
    date: "2026-07-26",
    title: "Shareable ranking cards for social media",
    description:
      "Share your favorite players' rankings directly to social media with auto-generated cards. Each player now has a share button that creates premium graphics (OG + Instagram sizes) with sport-specific accent colors, perfect for Twitter, Instagram, or WhatsApp. Tap share to spread the word!",
    area: "all",
  },
  {
    date: "2026-07-26",
    title: "Tour de France 2026 Champion Article Live",
    description:
      "Final results article featuring champion profile, complete final GC podium, jersey winners, notable stage highlights, and preview of upcoming Vuelta a España.",
    area: "cycling",
  },
  {
    date: "2026-07-25",
    title: "Enhanced typography system",
    description: "Refined typography with dramatic scale contrast — hero headlines are larger and bolder, podium ranks (#1-3) stand out more, and page titles use premium Archivo font consistently. Better visual hierarchy guides your eye to what matters.",
    area: "all",
  },
  {
    date: "2026-07-25",
    title: "Tour de France Stage 21 Live Coverage",
    description: "Enhanced live coverage for the final stage into Paris with real-time GC standings, live leader updates, countdown to finish, and auto-refresh every 30 seconds. Ready for the July 27 finale.",
    area: "cycling",
  },
  {
    date: "2026-07-24",
    title: "Live ranking animations",
    description: "Rankings now animate smoothly when they update — rows flash with per-sport accent colors when players change position, making live movement easier to track in real time.",
    area: "all",
  },
  {
    date: "2026-07-24",
    title: "ATP Race to Turin & WTA Race to Finals",
    description: "New race rankings pages show year-to-date points only (current season performance). Track who's qualifying for the ATP Finals in Turin and WTA Finals. Race rankings reset January 1 each year.",
    area: "tennis",
  },
  {
    date: "2026-07-23",
    title: "Clarified 'In play' count label",
    description: "Tennis ranking pages now show 'In play (X overall)' instead of just 'In play (X)' to clarify the count includes all active players across all pages, not just the current page.",
    area: "tennis",
  },
  {
    date: "2026-07-22",
    title: "World Cup Finals Celebration",
    description: "Special visual treatment for Finals week: gold trophy-themed hero with confetti animation, live countdown, champion highlights with 3x trophy on winner's row, and mobile Finals badge.",
    area: "worldcup",
  },
  {
    date: "2026-07-21",
    title: "Upcoming event countdown timer",
    description: "Homepage now shows a countdown to upcoming major events (e.g., 'Tour de France Final Stage in 5 days'). Never miss the start of big tournaments and finals.",
    area: "all",
  },
  {
    date: "2026-07-21",
    title: "Live match scores",
    description: "ATP and WTA live ranking pages now show real-time set scores for in-progress matches",
    area: "tennis",
  },
  {
    date: "2026-07-20",
    title: "What's Next Discovery — Post-Tournament Retention",
    description:
      "After the World Cup Final, discover what's live NOW with our new What's Next module. Shows active sports with live pulse indicators, per-sport accent colors, and smooth animations. Never miss the action — Tour de France, ATP, WTA, and more are just a click away.",
    area: "all",
  },
  {
    date: "2026-07-20",
    title: "Tour de France 2026 Winner Predictions & Final Week Analysis",
    description:
      "New betting analysis article covering Pogačar's historic 5th title run, current odds from multiple sportsbooks, stage-by-stage final week preview (stages 16-21), podium battle analysis, and historical Pogačar vs Vingegaard rivalry context. SEO-optimized for Tour de France betting searches.",
    area: "cycling",
  },
  {
    date: "2026-07-19",
    title: "Homepage: Live NOW Indicator & Priority Cards",
    description:
      "The homepage now shows exactly what's live right now with a dynamic LIVE NOW headline and pulsing indicator. Live sport cards are enlarged and float to the top, making it instant to see active matches. Fixes the 'nothing looks live' bounce problem.",
    area: "all",
  },
  {
    date: "2026-07-19",
    title: "ATP/WTA Live Rankings: Clearer Tournament Status",
    description:
      "Fixed confusing display where players scheduled for upcoming matches showed '0' point change. Tournament status now only appears once players have started or finished their matches, making live point tracking easier to understand.",
    area: "tennis",
  },
  {
    date: "2026-07-18",
    title: "Dynamic Social Share Cards",
    description:
      "Every rankings page now has custom Open Graph images that auto-generate with live data — player names, ranks, and points in the sport's signature accent color. Share a link and the preview card shows real rankings, not a generic placeholder.",
    area: "all",
  },
  {
    date: "2026-07-18",
    title: "UCI Cycling Team Rankings Now Available",
    description:
      "Added UCI team rankings page showing the top professional cycling teams ranked by points. View standings for UAE Team Emirates, Visma–Lease a Bike, and all major WorldTour teams.",
    area: "cycling",
  },
  {
    date: "2026-07-18",
    title: "ATP/WTA Live Pages Now Load Faster",
    description:
      "Optimized ATP and WTA live ranking pages for faster loading, especially on mobile. Removed duplicate content rendering to reduce page size and improve performance.",
    area: "tennis",
  },
  {
    date: "2026-07-17",
    title: "Tour de France Stage Status Accuracy Fixed",
    description:
      "Fixed Tour de France page showing stale stage status ('Stage 11 in progress') when later stages had already completed. The page now correctly tracks the most recent completed stage.",
    area: "cycling",
  },
  {
    date: "2026-07-17",
    title: "Clearer WTA/ATP Ranking Data",
    description:
      "Improved clarity in tennis live rankings: point changes now show '0' (not '—') when rankings shift due to other players' results. Removed ambiguous placeholder symbols, making it clearer when data is zero vs. missing.",
    area: "tennis",
  },
  {
    date: "2026-07-16",
    title: "Premium Sport Imagery & Icon System",
    description:
      "Refreshed visual identity with sport-specific background textures (tennis clay court, football pitch, cycling road) in hero sections and custom SVG icons replacing emojis throughout. Navigation tabs now show sport-specific icons. A more premium, cohesive look.",
    area: "all",
  },
  {
    date: "2026-07-16",
    title: "Tour de France Stage Winners Fixed",
    description:
      "Fixed a bug where stage winners were showing as '—' instead of displaying the actual rider/team names. All completed stage results now display correctly.",
    area: "cycling",
  },
  {
    date: "2026-07-15",
    title: "Faster Page Load Performance",
    description:
      "Optimized font loading across all pages — fonts now display swap behavior for immediate text visibility and improved Core Web Vitals. Pages load faster, especially on slower connections.",
    area: "site",
  },
  {
    date: "2026-07-15",
    title: "UCI World Ranking",
    description:
      "New UCI Cycling World Rankings page showing top 100+ professional cyclists ranked by points across all disciplines. Updated daily from CyclingRanking.com.",
    area: "cycling",
  },
  {
    date: "2026-07-14",
    title: "World Cup Final 2026 Predictions Page",
    description:
      "New dedicated page for the FIFA World Cup 2026 Final with match preview, finalists display, and tactical context. Updates live as the final approaches on July 19.",
    area: "worldcup",
  },
  {
    date: "2026-07-14",
    title: "Improved Rank Movement Display",
    description:
      'Fixed implausible rank movement indicators (e.g., "+867") by showing "NEW" for players entering the rankings from far outside the top positions. Enhances data credibility and clarity across ATP/WTA live rankings.',
    area: "tennis",
  },
  {
    date: "2026-07-13",
    title: "Interactive Data Tooltips",
    description:
      "Tap or hover on rankings, points, and player names to reveal contextual information — movement history, points breakdown, and quick stats. Award-winning 2026 data viz pattern for richer engagement.",
    area: "all",
  },
  {
    date: "2026-07-13",
    title: "Tour de France Event Page: Complete GC Standings Added",
    description:
      "Enhanced /events/tdf-2026 with full General Classification table showing top 10 overall standings (rank, rider, team, country, time/gap). Jersey leaders, stage results, and live race status all in one dedicated Tour page. Race data updates every 5 minutes through July 27.",
    area: "cycling",
  },
  {
    date: "2026-07-13",
    title: "Tour de France Live GC Standings Now Updating",
    description:
      "Fixed critical bug where Tour de France page showed stale preview data instead of live race standings. GC table now displays real-time overall standings with Pogačar in yellow, all 9 completed stage winners, and a 'Last updated' timestamp. Race data refreshes every 5 minutes during the Tour (through July 27).",
    area: "cycling",
  },
  {
    date: "2026-07-12",
    title: "World Cup Finals Countdown Widget",
    description:
      "New countdown widget on the World Cup page creates urgency and FOMO for the tournament climax. Shows days to finals (July 19), escalating urgency messaging ('Finals in 3 days' → 'Semi-finals TODAY' → 'Finals LIVE NOW'), and pulsing live match indicators. Auto-hides after the tournament ends. Time-sensitive feature to capture the finals week traffic spike.",
    area: "worldcup",
  },
  {
    date: "2026-07-12",
    title: "SEO-Friendly Player Page URLs",
    description:
      "Player pages now use human-readable URLs like /atp/player/jannik-sinner instead of technical IDs. All 200 ATP and 150 WTA player pages are pre-rendered for faster loading and better search engine visibility. Find your favorite players' rankings and stats with URLs that are easy to remember and share.",
    area: "tennis",
  },
  {
    date: "2026-07-11",
    title: "Enhanced Sport Navigation Visibility",
    description:
      "Strengthened per-sport color identity in navigation — active tabs now feature bold accent underlines, subtle glows, and filled backgrounds that instantly signal which sport you're viewing. ATP's lime, WTA's magenta, World Cup's green, and Cycling's amber are now unmistakable at a glance across all themes and devices.",
    area: "site",
  },
  {
    date: "2026-07-11",
    title: "Tour de France Live Stage Winners",
    description:
      "Tour de France 2026 page now shows actual stage winners for all completed stages. Real-time results from Wikipedia display the winning riders and teams (Tadej Pogačar, Isaac del Toro, Tim Merlier, and more) with last-updated timestamps, replacing the previous preview placeholders.",
    area: "cycling",
  },
  {
    date: "2026-07-11",
    title: "Fixed Duplicate ATP Ranking Table",
    description:
      "Fixed visual bug where the ATP Live ranking table appeared twice on the page. The page now correctly shows a single ranking table with full functionality — filters, pagination, and live updates all working as expected.",
    area: "tennis",
  },
  {
    date: "2026-07-10",
    title: "Enhanced Button Interactions",
    description:
      "Upgraded all interactive buttons with a comprehensive 6-state system following modern design standards. Buttons now provide smooth hover feedback, visible focus rings for keyboard navigation, instant tactile response when pressed, and meet mobile touch target guidelines. Improved accessibility across dark/light themes.",
    area: "site",
  },
  {
    date: "2026-07-10",
    title: "Cycling Page Status Message Fix",
    description:
      "Fixed contradictory race status messages on the cycling page. The data source notice now properly adapts to the current race state: shows 'will update once race begins' before the race starts, and 'updates as the race progresses' when the race is active.",
    area: "cycling",
  },
  {
    date: "2026-07-09",
    title: "World Cup Match Pages Fixed",
    description:
      "Fixed issue where World Cup match detail pages were returning 404 errors. Match pages now always load successfully, showing either live ESPN data when available or a graceful fallback with a clear 'Demo data' indicator.",
    area: "worldcup",
  },
  {
    date: "2026-07-08",
    title: "Page Entrance Animations",
    description:
      "Added choreographed entrance animations across the site — pages now come to life with a subtle, athletic motion sequence. Heroes fade up first, sport cards cascade in with rhythm, then tables arrive. Fast (under 1 second), GPU-efficient, and respectful of accessibility preferences.",
    area: "site",
  },
  {
    date: "2026-07-08",
    title: "Individual Tour de France Stage Pages",
    description:
      "Added dedicated pages for all 21 Tour de France 2026 stages at /events/tdf-2026/stage/[N]. Each page shows stage details (date, route, distance, type), winner when completed, and current jersey leaders. Click any stage number in the main TdF page to view detailed information.",
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
