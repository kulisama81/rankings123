// Rank bands for per-page SEO. Each band is a slice of the live ranking that
// gets its own indexable URL (e.g. /atp-rankings/101-250), targeting long-tail
// searches like "ATP rankings 101 to 200" and surfacing emerging players.
export interface RankBand {
  slug: string;
  label: string;
  from: number;
  to: number;
}

export const RANK_BANDS: RankBand[] = [
  { slug: "1-100", label: "Top 100", from: 1, to: 100 },
  { slug: "101-250", label: "101–250", from: 101, to: 250 },
  { slug: "251-500", label: "251–500", from: 251, to: 500 },
  { slug: "501-750", label: "501–750", from: 501, to: 750 },
  { slug: "751-1000", label: "751–1000", from: 751, to: 1000 },
];

export function bandBySlug(slug: string): RankBand | undefined {
  return RANK_BANDS.find((b) => b.slug === slug);
}
