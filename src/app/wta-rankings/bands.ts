// Rank bands for per-page SEO. Each band is a slice of the WTA ranking that
// gets its own indexable URL (e.g. /wta-rankings/101-250), targeting long-tail
// searches like "WTA rankings 101 to 200" and surfacing emerging players.
export interface RankBand {
  slug: string;
  label: string;
  from: number;
  to: number;
}

// ESPN WTA rankings provide ~200 players, so we only define bands within that range.
// Additional bands can be added when a deeper WTA data source becomes available.
export const RANK_BANDS: RankBand[] = [
  { slug: "1-100", label: "Top 100", from: 1, to: 100 },
  { slug: "101-200", label: "101–200", from: 101, to: 200 },
];

export function bandBySlug(slug: string): RankBand | undefined {
  return RANK_BANDS.find((b) => b.slug === slug);
}
