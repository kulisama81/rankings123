"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface RankChange {
  name: string;
  rank: number;
  change: number;
}

interface LiveSportCardProps {
  href: string;
  label: string;
  sub: string;
  sport: string;
  isLive: boolean;
  liveCount?: number;
  showRankPeek?: boolean;
}

export default function LiveSportCard({
  href,
  label,
  sub,
  sport,
  isLive,
  liveCount: liveCountProp,
  showRankPeek = false,
}: LiveSportCardProps) {
  const [rankChanges, setRankChanges] = useState<RankChange[]>([]);
  const [showPeek, setShowPeek] = useState(false);
  const [liveCount, setLiveCount] = useState<number | undefined>(liveCountProp);

  // Fetch live match count if not provided and card is live
  useEffect(() => {
    if (!isLive || liveCountProp !== undefined) return;

    async function fetchLiveCount() {
      try {
        if (sport === "atp" || sport === "wta") {
          const endpoint = sport === "atp" ? "/api/atp-live" : "/api/wta-live";
          const res = await fetch(endpoint);
          const data = await res.json();
          if (data.players) {
            const inProgressCount = data.players.filter((p: { tournament?: { active?: boolean } }) =>
              p.tournament?.active === true
            ).length;
            setLiveCount(inProgressCount);
          }
        } else if (sport === "worldcup") {
          const res = await fetch("/api/worldcup/live");
          const data = await res.json();
          if (data.matches) {
            const liveMatches = data.matches.filter((m: { state: string }) => m.state === "in");
            setLiveCount(liveMatches.length);
          }
        }
      } catch {
        // Silent fail
      }
    }

    fetchLiveCount();
  }, [isLive, sport, liveCountProp]);

  // Fetch top rank changes for hover peek
  useEffect(() => {
    if (!showRankPeek || !isLive) return;

    async function fetchRankChanges() {
      try {
        let endpoint = "";
        if (sport === "atp") endpoint = "/api/atp-live";
        else if (sport === "wta") endpoint = "/api/wta-live";
        else return;

        const res = await fetch(endpoint);
        const data = await res.json();

        interface PlayerWithChange {
          name: string;
          rank?: number;
          liveRank?: number;
          change?: number;
          movement?: number;
        }

        if (data.players && Array.isArray(data.players)) {
          const players = data.players as PlayerWithChange[];
          const movers = players
            .filter((p) => (p.change ?? p.movement ?? 0) !== 0)
            .sort((a, b) => Math.abs(b.change ?? b.movement ?? 0) - Math.abs(a.change ?? a.movement ?? 0))
            .slice(0, 3)
            .map((p) => ({
              name: p.name,
              rank: p.rank ?? p.liveRank ?? 0,
              change: p.change ?? p.movement ?? 0,
            }));

          setRankChanges(movers);
        }
      } catch {
        // Silent fail
      }
    }

    if (showPeek) {
      fetchRankChanges();
    }
  }, [showPeek, showRankPeek, isLive, sport]);

  // Live cards are enlarged, have glow, and float to top
  const cardClasses = isLive
    ? "group relative overflow-hidden rounded-2xl border border-accent/40 bg-surface p-6 transition-all duration-300 hover:border-accent/60 hover:bg-surface2 hover:scale-[1.02] sm:col-span-2"
    : "group relative overflow-hidden rounded-2xl border border-edge bg-surface p-5 transition-all duration-300 hover:border-accent/60 hover:bg-surface2";

  const glowStyle = isLive
    ? {
        boxShadow: `0 0 0 1px rgba(var(--accent-rgb), 0.1), 0 8px 24px rgba(var(--accent-rgb), 0.12), 0 2px 8px rgba(0, 0, 0, 0.24)`,
      }
    : {};

  return (
    <Link
      href={href}
      data-sport={sport}
      className={cardClasses}
      style={glowStyle}
      onMouseEnter={() => setShowPeek(true)}
      onMouseLeave={() => setShowPeek(false)}
    >
      {/* Subtle animated gradient on live cards */}
      {isLive && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] motion-reduce:opacity-0"
          style={{
            background: `radial-gradient(800px circle at 50% 50%, rgba(var(--accent-rgb), 0.15), transparent 50%)`,
            animation: "pulse-glow 3s ease-in-out infinite",
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              {isLive && (
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
                  />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]" />
                </span>
              )}
              <span className={`font-bold text-fg ${isLive ? "text-xl sm:text-2xl" : "text-lg"}`}>
                {label}
              </span>
            </div>

            <p className={`mt-1.5 text-muted ${isLive ? "text-sm sm:text-base" : "text-xs"}`}>
              {sub}
            </p>

            {isLive && liveCount !== undefined && liveCount > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-mono font-bold text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                </span>
                {liveCount} {liveCount === 1 ? "match" : "matches"} live
              </div>
            )}
          </div>

          <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>

        {/* Hover peek: top 3 rank changes (tennis only) */}
        {showRankPeek && showPeek && rankChanges.length > 0 && (
          <div
            className="mt-4 animate-slide-up rounded-xl border border-edge/50 bg-surface2/95 p-3 backdrop-blur-sm motion-reduce:animate-none"
            style={{ animation: "slide-up 0.2s ease-out" }}
          >
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
              Top Movers
            </div>
            <div className="space-y-1.5">
              {rankChanges.map((player, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="truncate text-fg font-medium">{player.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-muted">#{player.rank}</span>
                    <span
                      className={`font-mono font-bold ${player.change > 0 ? "text-up" : "text-down"}`}
                    >
                      {player.change > 0 ? "+" : ""}
                      {player.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
