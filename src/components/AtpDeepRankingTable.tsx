"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { AtpDeepRankingSnapshot, AtpLivePlayer } from "@/types";
import { playerToSlug } from "@/lib/playerSlug";
import { formatTimeAgo, formatTimeAgoMobile } from "@/lib/timeUtils";
import AnimatedNumber from "./AnimatedNumber";
import EmptyState from "./EmptyState";
import Tooltip from "./Tooltip";
import { RankTooltip, PointsTooltip, MovementTooltip, PlayerTooltip } from "./TooltipContent";
import DataSourceBadge from "./DataSourceBadge";

const REFRESH_INTERVAL_S = 30;
const PAGE_SIZE = 50;

interface AtpDeepRankingTableProps {
  initialSnapshot: AtpDeepRankingSnapshot;
  band?: { from: number; to: number };
  apiEndpoint?: string;
}

function Movement({ value }: { value: number }) {
  // For implausibly large movements (>200), display "NEW" instead of the raw number
  // to indicate a newly-ranked player or re-entry from far down the rankings.
  // Prevents credibility-damaging displays like "▲867" (bug-atp-jodar-rank-jump).
  const MOVEMENT_THRESHOLD = 200;

  if (value > MOVEMENT_THRESHOLD)
    return <span className="inline-flex rounded-md bg-up/15 px-1.5 py-0.5 text-xs font-semibold text-up">NEW</span>;
  if (value > 0)
    return <span className="inline-flex rounded-md bg-up/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-up">▲{value}</span>;
  if (value < -MOVEMENT_THRESHOLD)
    return <span className="inline-flex rounded-md bg-down/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-down">▼▼</span>;
  if (value < 0)
    return <span className="inline-flex rounded-md bg-down/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-down">▼{Math.abs(value)}</span>;
  return <span className="text-xs text-muted/50">—</span>;
}

function PointsDelta({ value }: { value: number }) {
  if (value > 0) return <span className="points-delta-glow text-xs font-medium tabular-nums text-up">+{value}</span>;
  if (value < 0) return <span className="points-delta-glow text-xs font-medium tabular-nums text-down">{value}</span>;
  return <span className="text-xs text-muted/40">—</span>;
}

function TournamentStatus({ player }: { player: AtpLivePlayer }) {
  const t = player.tournament;
  if (!t) return <span className="text-xs text-muted/40">—</span>;
  if (!t.active) return <span className="text-xs text-muted/70">{t.name} · out</span>;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-fg/80">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }} />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {t.name} · {t.round}
    </span>
  );
}

export default function AtpDeepRankingTable({ initialSnapshot, band, apiEndpoint = "/api/atp/rankings" }: AtpDeepRankingTableProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [liveOnly, setLiveOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL_S);
  const [rankChanges, setRankChanges] = useState<Set<string>>(new Set());
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [, setCurrentTime] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetching = useRef(false);
  const prevRanksRef = useRef<Map<string, number>>(new Map());

  // Load auto-refresh preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("autoRefresh");
    if (stored !== null) {
      setAutoRefreshEnabled(stored === "true");
    }
  }, []);

  // Persist auto-refresh preference
  useEffect(() => {
    localStorage.setItem("autoRefresh", String(autoRefreshEnabled));
  }, [autoRefreshEnabled]);

  // Update current time every 60s for "X ago" displays
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const refresh = useCallback(async () => {
    if (fetching.current) return;
    fetching.current = true;
    setIsRefreshing(true);
    try {
      const res = await fetch(apiEndpoint, { cache: "no-store" });
      if (res.ok) {
        const newSnapshot = await res.json();

        // Detect rank changes
        const changedPlayers = new Set<string>();
        newSnapshot.players.forEach((p: AtpLivePlayer) => {
          const prevRank = prevRanksRef.current.get(p.name);
          if (prevRank !== undefined && prevRank !== p.liveRank) {
            changedPlayers.add(p.name);
          }
          prevRanksRef.current.set(p.name, p.liveRank);
        });

        setSnapshot(newSnapshot);

        // Announce to screen readers on every refresh
        const announcement = document.getElementById("rank-update-announcement");
        if (announcement) {
          if (changedPlayers.size > 0) {
            announcement.textContent = `Rankings updated. ${changedPlayers.size} ${changedPlayers.size === 1 ? "player" : "players"} changed rank.`;
            setRankChanges(changedPlayers);
            setTimeout(() => setRankChanges(new Set()), 500);
          } else {
            announcement.textContent = "Rankings updated.";
          }
        }
      }
    } catch {
      /* keep last good snapshot */
    } finally {
      fetching.current = false;
      setIsRefreshing(false);
      setSecondsLeft(REFRESH_INTERVAL_S);
      setCurrentTime(Date.now());
    }
  }, [apiEndpoint]);

  useEffect(() => {
    if (!autoRefreshEnabled) {
      setSecondsLeft(REFRESH_INTERVAL_S);
      return;
    }
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          void refresh();
          return REFRESH_INTERVAL_S;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [refresh, autoRefreshEnabled]);

  const countries = useMemo(() => {
    const codes = new Set(snapshot.players.map((p) => p.countryCode));
    return [...codes].sort();
  }, [snapshot.players]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return snapshot.players.filter((p) => {
      if (band && (p.liveRank < band.from || p.liveRank > band.to)) return false;
      if (liveOnly && !p.tournament?.active) return false;
      if (country !== "all" && p.countryCode !== country) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.countryCode.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [snapshot.players, query, country, liveOnly, band]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  useEffect(() => {
    setPage(0);
  }, [query, country, liveOnly]);

  const pageRows = useMemo(
    () => filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE),
    [filtered, safePage]
  );

  const liveCount = snapshot.players.filter((p) => p.tournament?.active).length;
  const rangeStart = filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1;
  const rangeEnd = Math.min(filtered.length, safePage * PAGE_SIZE + PAGE_SIZE);
  const inputCls =
    "rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none";

  return (
    <div className="animate-entrance-table">
      {/* Screen reader announcement for rank updates */}
      <div id="rank-update-announcement" className="sr-only" role="status" aria-live="polite" aria-atomic="true" />
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className={`flex-1 min-w-[140px] sm:w-56 sm:flex-none ${inputCls}`}
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={`flex-1 min-w-[100px] sm:w-auto sm:flex-none ${inputCls}`}
          aria-label="Filter by country"
        >
          <option value="all">Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex cursor-pointer items-center gap-1.5 text-sm text-muted">
          <input type="checkbox" checked={liveOnly} onChange={(e) => setLiveOnly(e.target.checked)} className="accent-accent" />
          In play ({liveCount} overall)
        </label>
        <div className="ml-auto flex items-center gap-3 text-xs text-muted">
          <DataSourceBadge source={snapshot.source} showLiveDot={liveCount > 0} />
          {isRefreshing && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              Updating...
            </span>
          )}
          <div className="hidden items-center gap-1.5 sm:flex" role="status" aria-live="polite">
            <span className="hidden md:inline">Updated </span>
            <span className="font-medium text-fg">{formatTimeAgo(snapshot.lastUpdated)}</span>
            {autoRefreshEnabled && (
              <>
                <span className="text-muted/50">·</span>
                <span className="tabular-nums">{secondsLeft}s</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:hidden" role="status" aria-live="polite">
            <span className="font-medium text-fg">{formatTimeAgoMobile(snapshot.lastUpdated)}</span>
            {autoRefreshEnabled && (
              <>
                <span className="text-muted/50">·</span>
                <span className="tabular-nums">{secondsLeft}s</span>
              </>
            )}
          </div>
          <button
            onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
            className={`hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs transition sm:flex ${
              autoRefreshEnabled
                ? "bg-accent/10 text-accent hover:bg-accent/15"
                : "bg-surface2 text-muted hover:bg-surface2/80"
            }`}
            title={autoRefreshEnabled ? "Auto-refresh enabled" : "Auto-refresh disabled"}
            aria-label={autoRefreshEnabled ? "Disable auto-refresh" : "Enable auto-refresh"}
          >
            <span className="text-base leading-none">{autoRefreshEnabled ? "⏸" : "▶"}</span>
            <span className="hidden lg:inline">{autoRefreshEnabled ? "Auto" : "Manual"}</span>
          </button>
          <button
            onClick={() => void refresh()}
            className="btn-base btn-secondary rounded-lg border border-edge text-sm min-h-11 px-3"
            aria-label="Refresh ranking data"
          >
            Refresh
          </button>
        </div>
      </div>

{filtered.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-edge bg-surface">
          <table className="min-w-full text-sm">
            <thead className="bg-surface2 text-sm uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-3 text-right">#</th>
                <th className="px-2 py-3 text-center">+/-</th>
                <th className="px-4 py-3 text-left">Player</th>
                <th className="px-3 py-3 text-center">Country</th>
                <th className="px-3 py-3 text-right">CH</th>
                <th className="px-4 py-3 text-right">Live Pts</th>
                <th className="px-2 py-3 text-right">Δ</th>
                <th className="px-3 py-3 text-right">Official</th>
                <th className="px-4 py-3 text-left">Tournament</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((p, idx) => {
                const hasRankChange = rankChanges.has(p.name);
                const changedArray = Array.from(rankChanges);
                const changeIndex = changedArray.indexOf(p.name);
                const staggerClass = hasRankChange && rankChanges.size > 5 && changeIndex >= 0 && changeIndex < 5
                  ? `rank-changed-stagger-${changeIndex + 1}` : "";

                // Entrance stagger: first 20 rows
                const entranceStagger = idx < 20 ? `table-row-stagger table-row-stagger-${idx + 1}` : "table-row-stagger";

                return (
                <tr
                  key={`${p.officialRank}-${p.name}`}
                  className={`table-row-premium ${
                    p.tournament?.active ? "bg-accent/[0.035]" : ""
                  } ${hasRankChange ? `rank-changed ${staggerClass}` : ""} ${entranceStagger}`}
                >
                  <td className="px-3 py-2.5 text-right">
                    <Tooltip
                      content={
                        <RankTooltip
                          currentRank={p.liveRank}
                          movement={p.movement}
                          officialRank={p.officialRank}
                        />
                      }
                      placement="top"
                    >
                      <span className={`rank-hover-scale inline-flex items-center justify-center ${
                        p.liveRank === 1
                          ? "rank-scale-1 min-w-[48px]"
                          : p.liveRank <= 3
                            ? "rank-scale-2-3 min-w-[42px]"
                            : p.liveRank <= 10
                              ? "rank-scale-4-10 min-w-[38px]"
                              : p.liveRank <= 50
                                ? "rank-scale-11-50 min-w-[34px]"
                                : "rank-scale-default min-w-[30px]"
                      }`}>{p.liveRank}</span>
                    </Tooltip>
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    {p.movement !== 0 ? (
                      <Tooltip
                        content={
                          <MovementTooltip
                            movement={p.movement}
                            previousRank={p.officialRank}
                            currentRank={p.liveRank}
                          />
                        }
                        placement="top"
                      >
                        <span><Movement value={p.movement} /></span>
                      </Tooltip>
                    ) : (
                      <Movement value={p.movement} />
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-2">
                      <span className="text-base leading-none">{p.flag}</span>
                      <Tooltip
                        content={
                          <PlayerTooltip
                            name={p.name}
                            countryCode={p.countryCode}
                            age={p.age}
                            tournament={p.tournament?.name}
                            tournamentRound={p.tournament?.round}
                          />
                        }
                        placement="right"
                      >
                        <Link
                          href={`/atp/player/${playerToSlug(p.name)}`}
                          className="font-semibold text-fg transition hover:text-accent"
                        >
                          {p.name}
                        </Link>
                      </Tooltip>
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs text-muted">{p.countryCode}</td>
                  <td className="px-3 py-2.5 text-right text-xs tabular-nums text-muted">
                    {p.careerHigh ? `#${p.careerHigh}` : "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-fg">
                    <Tooltip
                      content={
                        <PointsTooltip
                          livePoints={p.livePoints}
                          officialPoints={p.officialPoints}
                          delta={p.pointsDelta}
                          tournament={p.tournament?.name}
                        />
                      }
                      placement="top"
                    >
                      <span><AnimatedNumber value={p.livePoints} /></span>
                    </Tooltip>
                  </td>
                  <td className="px-2 py-2.5 text-right"><PointsDelta value={p.pointsDelta} /></td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-muted">
                    {p.officialPoints.toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5"><TournamentStatus player={p} /></td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={query ? "search" : liveOnly || country !== "all" ? "filter" : "trophy"}
          headline={
            query
              ? `0 players match "${query}"`
              : liveOnly && country !== "all"
                ? `No ${country} players currently in play`
                : liveOnly
                  ? "No players currently in play"
                  : country !== "all"
                    ? `No ${country} players in this range`
                    : "No players in this range"
          }
          description={
            query || liveOnly || country !== "all"
              ? "Try adjusting your search or filters"
              : undefined
          }
          action={
            query || liveOnly || country !== "all"
              ? {
                  label: "Clear all filters",
                  onClick: () => {
                    setQuery("");
                    setCountry("all");
                    setLiveOnly(false);
                  },
                }
              : undefined
          }
        />
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>
          Showing {rangeStart}–{rangeEnd} of {filtered.length.toLocaleString()}
          {snapshot.total > snapshot.players.length && ` · ${snapshot.total.toLocaleString()} ranked`}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="btn-base btn-secondary rounded-lg border border-edge text-sm min-h-11 px-3"
            aria-label="Previous page"
            title={safePage === 0 ? "Already on first page" : "Go to previous page"}
          >
            ← Prev
          </button>
          <span className="tabular-nums">Page {safePage + 1} / {pageCount}</span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={safePage >= pageCount - 1}
            className="btn-base btn-secondary rounded-lg border border-edge text-sm min-h-11 px-3"
            aria-label="Next page"
            title={safePage >= pageCount - 1 ? "Already on last page" : "Go to next page"}
          >
            Next →
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted/70">
        Live = projected ranking including this week&apos;s points. Official = last published ATP
        points. CH = career-high rank.
        {(snapshot.source === "uts" || snapshot.source === "uts+espn") &&
          " Full ranking via Ultimate Tennis Statistics; live results via ESPN."}
      </p>
    </div>
  );
}
