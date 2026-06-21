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
