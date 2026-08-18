import type { MetadataRoute } from "next";
import { getWorldCupData, getWorldCupStats } from "@/lib/worldCupFeed";
import { venueToSlug } from "@/lib/worldCupVenue";
import { getAtpDeepRankingData } from "@/lib/atpDeepRanking";
import { fetchWtaDeepRankingSnapshot } from "@/lib/wtaDeepRanking";
import { getTop200WithSlugs } from "@/lib/playerSlug";

const BASE = "https://rankings123.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/atp-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/wta-live`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/atp-race`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/wta-race`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/atp-doubles`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/wta-doubles`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/tournaments/wimbledon-2026`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/us-open-2026`, lastModified: now, changeFrequency: "always", priority: 0.95 },
    { url: `${BASE}/articles/us-open-2026-betting-favorites`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/articles/jannik-sinner-ranking-2026`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${BASE}/articles/carlos-alcaraz-ranking-2026`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${BASE}/articles/aryna-sabalenka-ranking-2026`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${BASE}/cycling`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/cycling/tour-de-france-2026`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/cycling/vuelta-2026`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE}/cycling/giro-2026`, lastModified: now, changeFrequency: "always", priority: 0.85 },
    { url: `${BASE}/cycling/uci-ranking`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/cycling/uci-team-ranking`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${BASE}/world-cup`, lastModified: now, changeFrequency: "always", priority: 0.8 },
    { url: `${BASE}/world-cup/golden-boot`, lastModified: now, changeFrequency: "always", priority: 0.8 },
    { url: `${BASE}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Add Tour de France stage pages (21 stages — SEO for "tour de france stage N results")
  const tdfStageRoutes: MetadataRoute.Sitemap = Array.from({ length: 21 }, (_, i) => ({
    url: `${BASE}/events/tdf-2026/stage/${i + 1}`,
    lastModified: now,
    changeFrequency: "always" as const,
    priority: 0.8,
  }));

  // Add tennis player pages (SEO long-tail: "Jannik Sinner ATP ranking", etc.)
  // Top 200 ATP/WTA with slug-based URLs for organic search
  const tennisPlayerRoutes: MetadataRoute.Sitemap = [];
  try {
    const [atpData, wtaData] = await Promise.all([
      getAtpDeepRankingData().catch(() => null),
      fetchWtaDeepRankingSnapshot().catch(() => null),
    ]);

    if (atpData) {
      const atpTop200 = getTop200WithSlugs(atpData.players, 200);
      tennisPlayerRoutes.push(
        ...atpTop200.map((p) => ({
          url: `${BASE}/atp/player/${p.slug}`,
          lastModified: now,
          changeFrequency: "daily" as const,
          priority: 0.7,
        }))
      );
    }

    if (wtaData) {
      const wtaTop200 = getTop200WithSlugs(wtaData.players, 200);
      tennisPlayerRoutes.push(
        ...wtaTop200.map((p) => ({
          url: `${BASE}/wta/player/${p.slug}`,
          lastModified: now,
          changeFrequency: "daily" as const,
          priority: 0.7,
        }))
      );
    }
  } catch {
    // If tennis data fails, continue with empty player routes
  }

  // Add World Cup match, team, and player pages (SEO long-tail)
  try {
    const [snapshot, stats] = await Promise.all([getWorldCupData(), getWorldCupStats()]);

    const matchRoutes: MetadataRoute.Sitemap = snapshot.matches.map((match) => ({
      url: `${BASE}/world-cup/match/${match.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    // Extract all unique teams from all groups
    const allTeams = snapshot.groups.flatMap((group) => group.teams);
    const teamRoutes: MetadataRoute.Sitemap = allTeams.map((team) => ({
      url: `${BASE}/world-cup/team/${team.code.toLowerCase()}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    // Player pages for top scorers and assisters (SEO long-tail: "Messi World Cup stats", etc.)
    const allPlayers = [...stats.topScorers, ...stats.topAssisters];
    const uniquePlayers = Array.from(
      new Map(allPlayers.map((p) => [p.playerId, p])).values()
    );
    const playerRoutes: MetadataRoute.Sitemap = uniquePlayers.map((player) => ({
      url: `${BASE}/world-cup/player/${player.playerId}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    // Venue pages (SEO: "MetLife Stadium World Cup 2026", "Dallas World Cup matches", etc.)
    const uniqueVenues = Array.from(
      new Set(snapshot.matches.map((m) => m.venue).filter(Boolean))
    ) as string[];
    const venueRoutes: MetadataRoute.Sitemap = uniqueVenues.map((venue) => ({
      url: `${BASE}/world-cup/venue/${venueToSlug(venue)}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...tdfStageRoutes,
      ...tennisPlayerRoutes,
      ...matchRoutes,
      ...teamRoutes,
      ...playerRoutes,
      ...venueRoutes,
    ];
  } catch {
    // If World Cup data fails, still return static routes + tennis player routes + TdF stages
    return [...staticRoutes, ...tdfStageRoutes, ...tennisPlayerRoutes];
  }
}
