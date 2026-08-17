"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface RankingPlayer {
  rank: number;
  name: string;
  flag?: string;
  points: number;
  movement?: number;
}

interface GoldenBootPlayer {
  name: string;
  team: string;
  goals: number;
}

interface PreviewData {
  atp: RankingPlayer[];
  wta: RankingPlayer[];
  goldenBoot: GoldenBootPlayer[];
  timestamps: {
    atp?: number;
    wta?: number;
    goldenBoot?: number;
  };
}

interface ApiPlayer {
  liveRank?: number;
  officialRank?: number;
  name: string;
  flag?: string;
  countryCode?: string;
  livePoints?: number;
  officialPoints?: number;
  movement?: number;
}

interface ApiGoldenBootPlayer {
  playerName: string;
  teamCode: string;
  goals: number;
}

/**
 * Homepage Rankings Preview
 *
 * Shows top 5 ATP/WTA rankings and top 3 Golden Boot scorers
 * directly on the homepage. Reduces bounce rate by showing value
 * before users click through.
 */
export default function HomepageRankingsPreview() {
  const [data, setData] = useState<PreviewData>({
    atp: [],
    wta: [],
    goldenBoot: [],
    timestamps: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  // Update current time every minute for timestamp display
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchPreviewData() {
      try {
        const now = Date.now();

        // Fetch all data in parallel with explicit error handling per endpoint
        const [atpRes, wtaRes, wcRes] = await Promise.all([
          fetch("/api/atp-live")
            .then(r => {
              if (!r.ok) throw new Error(`ATP API returned ${r.status}`);
              return r.json();
            })
            .catch((err) => {
              console.warn("ATP fetch failed:", err);
              return null;
            }),
          fetch("/api/wta-live")
            .then(r => {
              if (!r.ok) throw new Error(`WTA API returned ${r.status}`);
              return r.json();
            })
            .catch((err) => {
              console.warn("WTA fetch failed:", err);
              return null;
            }),
          fetch("/api/worldcup/stats")
            .then(r => {
              if (!r.ok) throw new Error(`WC API returned ${r.status}`);
              return r.json();
            })
            .catch((err) => {
              console.warn("World Cup fetch failed:", err);
              return null;
            }),
        ]);

        const atpTop5 = atpRes?.players?.slice(0, 5).map((p: ApiPlayer) => ({
          rank: p.liveRank || p.officialRank || 0,
          name: p.name,
          flag: p.flag,
          points: p.livePoints || p.officialPoints || 0,
          movement: p.movement || 0,
        })) || [];

        const wtaTop5 = wtaRes?.players?.slice(0, 5).map((p: ApiPlayer) => ({
          rank: p.liveRank || p.officialRank || 0,
          name: p.name,
          flag: p.flag,
          points: p.livePoints || p.officialPoints || 0,
          movement: p.movement || 0,
        })) || [];

        const goldenBootTop3 = wcRes?.topScorers?.slice(0, 3).map((p: ApiGoldenBootPlayer) => ({
          name: p.playerName,
          team: p.teamCode,
          goals: p.goals,
        })) || [];

        setData({
          atp: atpTop5,
          wta: wtaTop5,
          goldenBoot: goldenBootTop3,
          timestamps: {
            atp: atpRes ? now : undefined,
            wta: wtaRes ? now : undefined,
            goldenBoot: wcRes ? now : undefined,
          },
        });
      } catch {
        // Fail silently - individual fetches already logged with console.warn
      } finally {
        setIsLoading(false);
      }
    }

    fetchPreviewData();

    // Auto-refresh every 3 minutes
    const refreshInterval = setInterval(fetchPreviewData, 180000);

    return () => clearInterval(refreshInterval);
  }, []);

  function formatTimestamp(timestamp?: number): string {
    if (!timestamp) return "";
    const minutes = Math.floor((currentTime - timestamp) / 60000);
    if (minutes === 0) return "just now";
    if (minutes === 1) return "1 minute ago";
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 hour ago";
    return `${hours} hours ago`;
  }

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Live Rankings Preview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse rounded-2xl border border-edge bg-surface p-5">
              <div className="h-6 w-24 bg-surface2 rounded mb-3" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(j => (
                  <div key={j} className="h-4 bg-surface2 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (data.atp.length === 0 && data.wta.length === 0 && data.goldenBoot.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
        Live Rankings Preview
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* ATP Top 5 */}
        {data.atp.length > 0 && (
          <Link
            href="/atp-live"
            aria-label="View full ATP Live rankings - top 5 preview shown"
            className="group relative overflow-hidden rounded-2xl border border-edge bg-surface p-5 transition-all duration-300 hover:border-accent/60 hover:bg-surface2 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-fg">🎾 ATP Live</span>
              </div>
              <span className="text-accent opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                →
              </span>
            </div>

            <div className="space-y-2.5">
              {data.atp.map((player) => (
                <div key={player.rank} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-mono text-muted text-xs w-6 flex-shrink-0">
                      {player.rank}.
                    </span>
                    <span className="truncate text-fg font-medium">{player.name}</span>
                    {player.flag && (
                      <span className="flex-shrink-0 text-xs">{player.flag}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="font-mono text-muted text-xs">
                      {player.points.toLocaleString()}
                    </span>
                    {(player.movement ?? 0) !== 0 && (
                      <span
                        className={`font-mono text-xs font-bold w-8 text-right ${
                          (player.movement ?? 0) > 0 ? "text-up" : (player.movement ?? 0) < 0 ? "text-down" : "text-muted"
                        }`}
                      >
                        {(player.movement ?? 0) > 0 ? "+" : ""}
                        {player.movement}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-edge/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Updated {formatTimestamp(data.timestamps.atp)}</span>
                <span className="text-accent font-medium group-hover:underline">
                  View full rankings
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* WTA Top 5 */}
        {data.wta.length > 0 && (
          <Link
            href="/wta-live"
            aria-label="View full WTA Live rankings - top 5 preview shown"
            className="group relative overflow-hidden rounded-2xl border border-edge bg-surface p-5 transition-all duration-300 hover:border-accent/60 hover:bg-surface2 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-fg">🎾 WTA Live</span>
              </div>
              <span className="text-accent opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                →
              </span>
            </div>

            <div className="space-y-2.5">
              {data.wta.map((player) => (
                <div key={player.rank} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-mono text-muted text-xs w-6 flex-shrink-0">
                      {player.rank}.
                    </span>
                    <span className="truncate text-fg font-medium">{player.name}</span>
                    {player.flag && (
                      <span className="flex-shrink-0 text-xs">{player.flag}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="font-mono text-muted text-xs">
                      {player.points.toLocaleString()}
                    </span>
                    {(player.movement ?? 0) !== 0 && (
                      <span
                        className={`font-mono text-xs font-bold w-8 text-right ${
                          (player.movement ?? 0) > 0 ? "text-up" : (player.movement ?? 0) < 0 ? "text-down" : "text-muted"
                        }`}
                      >
                        {(player.movement ?? 0) > 0 ? "+" : ""}
                        {player.movement}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-edge/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Updated {formatTimestamp(data.timestamps.wta)}</span>
                <span className="text-accent font-medium group-hover:underline">
                  View full rankings
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Golden Boot Top 3 */}
        {data.goldenBoot.length > 0 && (
          <Link
            href="/world-cup/golden-boot"
            aria-label="View full World Cup Golden Boot standings - top 3 scorers shown"
            className="group relative overflow-hidden rounded-2xl border border-edge bg-surface p-5 transition-all duration-300 hover:border-accent/60 hover:bg-surface2 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-fg">⚽ Golden Boot</span>
              </div>
              <span className="text-accent opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                →
              </span>
            </div>

            <div className="space-y-2.5">
              {data.goldenBoot.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-mono text-muted text-xs w-6 flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="truncate text-fg font-medium">{player.name}</span>
                    <span className="flex-shrink-0 text-xs">{player.team}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <span className="font-mono text-fg font-bold text-sm">
                      {player.goals}
                    </span>
                    <span className="text-muted text-xs">goals</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-edge/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Updated {formatTimestamp(data.timestamps.goldenBoot)}</span>
                <span className="text-accent font-medium group-hover:underline">
                  View full standings
                </span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
