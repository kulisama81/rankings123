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
