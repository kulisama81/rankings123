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
