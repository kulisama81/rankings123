"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { AtpLivePlayer, AtpLiveSnapshot, Tour } from "@/types";
import { playerToSlug } from "@/lib/playerSlug";
import { formatTimeAgo, formatTimeAgoMobile } from "@/lib/timeUtils";
import AnimatedNumber from "./AnimatedNumber";
import EmptyState from "./EmptyState";
import Tooltip from "./Tooltip";
import { RankTooltip, PointsTooltip, MovementTooltip, PlayerTooltip } from "./TooltipContent";
import DataSourceBadge from "./DataSourceBadge";
import FlagIcon from "./FlagIcon";

// Lightweight share button component (perf-share-button-bloat optimization)
// Replaces 50-100 per-row ShareButton instances with a single button
function ShareRankingsButton({ tour }: { tour: Tour }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Live ${tour.toUpperCase()} Rankings - Rankings123`;

    // Try native share API on mobile
    if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ title: text, text, url });
        return;
      } catch {
        // Fall through to copy
      }
    }

    // Desktop: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="btn-base btn-secondary rounded-lg border border-edge text-sm min-h-11 px-3 flex items-center gap-1.5"
      aria-label="Share rankings"
      title="Share rankings"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="hidden sm:inline">Copied</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span className="hidden sm:inline">Share</span>
        </>
      )}
    </button>
  );
}

const REFRESH_INTERVAL_S = 20;
const PAGE_SIZE = 50;

interface LiveRankingTableProps {
  tour: Tour;
  initialSnapshot: AtpLiveSnapshot;
  showAgeGroupRank?: boolean;
}

function Movement({ value }: { value: number }) {
  // For implausibly large movements (>200), display "NEW" instead of the raw number
  // to indicate a newly-ranked player or re-entry from far down the rankings.
  // Prevents credibility-damaging displays like "▲867" (bug-atp-jodar-rank-jump).
  const MOVEMENT_THRESHOLD = 200;

  if (value > MOVEMENT_THRESHOLD)
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md bg-up/15 px-1.5 py-0.5 text-xs font-semibold text-up">
        NEW
      </span>
    );
  if (value > 0)
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md bg-up/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-up">
        ▲{value}
      </span>
    );
  if (value < -MOVEMENT_THRESHOLD)
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md bg-down/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-down">
        ▼▼
      </span>
    );
  if (value < 0)
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md bg-down/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-down">
        ▼{Math.abs(value)}
      </span>
    );
  return <span className="text-xs text-muted/50" title="No change in ranking">–</span>;
}

function RankBadge({ rank }: { rank: number }) {
  // Dramatic typographic scale system (Fontfabric 2026: performative typography)
  const scaleClass =
    rank === 1
      ? "rank-scale-1" // Hero spotlight: 36px, 900 weight, gradient text
      : rank <= 3
        ? "rank-scale-2-3" // Podium: 30px, 800 weight
        : rank <= 10
          ? "rank-scale-4-10" // Top-tier: 26px, 700 weight
          : rank <= 50
            ? "rank-scale-11-50" // Mid-tier: 18px, 600 weight
            : "rank-scale-default"; // Base: 16px, 600 weight

  // Podium tints (gold/silver/bronze)
  const tint =
    rank === 1
      ? "bg-[#f2c14e]/20" // Gold tint (gradient text already has accent color)
      : rank === 2
        ? "bg-[#c7cdd6]/20 text-[#c7cdd6]"
        : rank === 3
          ? "bg-[#d08b5b]/25 text-[#d99b6c]"
          : "text-muted";

  // Dynamic size/padding based on scale (larger ranks need more space)
  const sizeClass =
    rank === 1
      ? "min-w-[48px] h-12 px-2" // Hero: largest container
      : rank <= 3
        ? "min-w-[42px] h-11 px-2" // Podium: large
        : rank <= 10
          ? "min-w-[38px] h-10 px-1.5" // Top-tier: medium-large
          : rank <= 50
            ? "min-w-[34px] h-9 px-1.5" // Mid-tier: medium
            : "min-w-[30px] h-8 px-1.5"; // Base: compact

  return (
    <span
      className={`rank-hover-scale inline-flex items-center justify-center rounded-lg tabular-nums ${scaleClass} ${sizeClass} ${tint}`}
    >
      {rank}
    </span>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
        style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
      />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}

function Tournament({ player }: { player: AtpLivePlayer }) {
  const t = player.tournament;
  if (!t) return <span className="text-xs text-muted/50" title="Not competing this week">–</span>;
  if (!t.active) return <span className="text-xs text-muted/70">{t.name} · out</span>;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-fg/80">
      <LiveDot />
      {t.name} · {t.round}
      {t.liveScore && <span className="font-mono font-semibold text-accent">({t.liveScore})</span>}
    </span>
  );
}

function Delta({ value }: { value: number }) {
  if (value > 0) return <span className="points-delta-glow text-xs font-medium tabular-nums text-up">+{value}</span>;
  if (value < 0) return <span className="points-delta-glow text-xs font-medium tabular-nums text-down">{value}</span>;
  return <span className="text-xs tabular-nums text-muted/50" title="No points earned or lost this week">0</span>;
}

export default function LiveRankingTable({ tour, initialSnapshot, showAgeGroupRank }: LiveRankingTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [liveOnly, setLiveOnly] = useState(false);
  const [pinned, setPinned] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL_S);
  const [rankChanges, setRankChanges] = useState<Set<string>>(new Set());
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [, setCurrentTime] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetching = useRef(false);
  const mounted = useRef(false);
  const prevRanksRef = useRef<Map<string, number>>(new Map());

  // Load auto-refresh preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("autoRefresh");
    if (stored !== null) {
      setAutoRefreshEnabled(stored === "true");
    }
  }, []);

  // Persist auto-refresh preference to localStorage
  useEffect(() => {
    localStorage.setItem("autoRefresh", String(autoRefreshEnabled));
  }, [autoRefreshEnabled]);

  // Update current time every 60s to refresh "X ago" displays
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Read country from URL on mount (client-side only, using window.location to avoid SSR issues)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlCountry = params.get("country");
    if (urlCountry) {
      setCountry(urlCountry);
    }
    mounted.current = true;
  }, []);

  // Update URL when country filter changes (after mount to avoid initial write)
  useEffect(() => {
    if (!mounted.current) return;
    const params = new URLSearchParams(window.location.search);
    if (country !== "all") {
      params.set("country", country);
    } else {
      params.delete("country");
    }
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [country, pathname, router]);

  const refresh = useCallback(async () => {
    if (fetching.current) return;
    fetching.current = true;
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/${tour}/live`, { cache: "no-store" });
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
            // Clear animation after it completes (280ms + max stagger)
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
      setCurrentTime(Date.now()); // Force time ago update
    }
  }, [tour]);

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
      if (liveOnly && !p.tournament?.active) return false;
      if (country !== "all" && p.countryCode !== country) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.countryCode.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [snapshot.players, query, country, liveOnly]);

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
  const tabs: { key: Tour; label: string; href: string }[] = [
    { key: "atp", label: "ATP", href: "/atp-live" },
    { key: "wta", label: "WTA", href: "/wta-live" },
  ];
  const inputCls =
    "rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none";

  return (
    <div className="animate-entrance-table">
      {/* Screen reader announcement for rank updates */}
      <div id="rank-update-announcement" className="sr-only" role="status" aria-live="polite" aria-atomic="true" />
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-2.5 justify-between">
        <div className="inline-flex gap-1 rounded-xl bg-surface2 p-1">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                t.key === tour ? "bg-accent text-accentfg shadow-sm" : "text-muted hover:text-fg"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className={`flex-1 min-w-[140px] sm:w-48 sm:flex-none ${inputCls}`}
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
          <input
            type="checkbox"
            checked={liveOnly}
            onChange={(e) => setLiveOnly(e.target.checked)}
            className="accent-accent"
          />
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
          <ShareRankingsButton tour={tour} />
        </div>
      </div>

{filtered.length > 0 ? (
        <>
          {/* Desktop: dense table */}
          <div className="hidden overflow-hidden rounded-2xl border border-edge bg-surface md:block">
            <table className="min-w-full text-sm">
              <thead className="bg-surface2 text-sm uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-3 py-2.5 text-right">#</th>
                  {showAgeGroupRank && <th className="px-2 py-2.5 text-right">Overall</th>}
                  <th className="px-2 py-2.5 text-center">+/-</th>
                  <th className="px-3 py-2.5 text-left">Player</th>
                  <th className="px-2 py-2.5 text-center">Age</th>
                  <th className="px-3 py-2.5 text-right">Live Pts</th>
                  <th className="px-2 py-2.5 text-right">Δ</th>
                  <th className="px-3 py-2.5 text-right">
                    <Tooltip content="Next Monday's points (includes current tournament)" placement="top">
                      <span className="cursor-help">Next</span>
                    </Tooltip>
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    <Tooltip content="Maximum points if player wins current tournament" placement="top">
                      <span className="cursor-help">Max</span>
                    </Tooltip>
                  </th>
                  <th className="px-3 py-2.5 text-right">Official</th>
                  <th className="px-3 py-2.5 text-left">Tournament</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((p, idx) => {
                  const hasRankChange = rankChanges.has(p.name);
                  const changedArray = Array.from(rankChanges);
                  const changeIndex = changedArray.indexOf(p.name);
                  const staggerClass = hasRankChange && rankChanges.size > 5 && changeIndex >= 0 && changeIndex < 5
                    ? `rank-changed-stagger-${changeIndex + 1}` : "";

                  // Entrance stagger: first 20 rows on page load
                  const entranceStagger = idx < 20 ? `table-row-stagger table-row-stagger-${idx + 1}` : "table-row-stagger";

                  return (
                  <tr
                    key={p.name}
                    onClick={() => setPinned(pinned === p.name ? null : p.name)}
                    className={`table-row-premium ${
                      pinned === p.name
                        ? "table-row-active"
                        : p.tournament?.active
                          ? "bg-accent/[0.035]"
                          : ""
                    } ${hasRankChange ? `rank-changed ${staggerClass}` : ""} ${entranceStagger}`}
                  >
                    <td className="px-3 py-2 text-right">
                      <Tooltip
                        content={
                          <RankTooltip
                            currentRank={showAgeGroupRank && "ageGroupRank" in p ? p.ageGroupRank as number : p.liveRank}
                            movement={p.movement}
                            officialRank={p.officialRank}
                          />
                        }
                        placement="top"
                      >
                        <span><RankBadge rank={showAgeGroupRank && "ageGroupRank" in p ? p.ageGroupRank as number : p.liveRank} /></span>
                      </Tooltip>
                    </td>
                    {showAgeGroupRank && (
                      <td className="px-2 py-2 text-right text-sm text-muted">
                        #{p.liveRank}
                      </td>
                    )}
                    <td className="px-2 py-2 text-center">
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
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-2">
                        <FlagIcon code={p.flag} size="md" ariaLabel={`${p.countryCode} flag`} />
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
                            href={`/${tour}/player/${playerToSlug(p.name)}`}
                            className="font-semibold text-fg transition hover:text-accent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {p.name}
                          </Link>
                        </Tooltip>
                        <span className="text-xs text-muted">{p.countryCode}</span>
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center text-muted">{p.age || ""}</td>
                    <td className="px-3 py-2 text-right text-[15px] font-bold text-fg">
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
                    <td className="px-2 py-2 text-right"><Delta value={p.pointsDelta} /></td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted">
                      {p.nextPoints.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right text-sm">
                      {p.tournament?.active ? (
                        <Tooltip
                          content={`Max points if ${p.name} wins ${p.tournament.name}${p.projectedRank ? ` → Projected rank #${p.projectedRank}` : ""}`}
                          placement="top"
                        >
                          <span className="font-semibold tabular-nums text-accent">{p.maxPoints.toLocaleString()}</span>
                        </Tooltip>
                      ) : (
                        <span className="tabular-nums text-muted/50">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted">
                      {p.officialPoints.toLocaleString()}
                    </td>
                    <td className="px-3 py-2"><Tournament player={p} /></td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile: card rows */}
          <div className="space-y-2 md:hidden">
            {pageRows.map((p) => {
              const hasRankChange = rankChanges.has(p.name);
              const changedArray = Array.from(rankChanges);
              const changeIndex = changedArray.indexOf(p.name);
              const staggerClass = hasRankChange && rankChanges.size > 5 && changeIndex >= 0 && changeIndex < 5
                ? `rank-changed-stagger-${changeIndex + 1}` : "";

              return (
              <div
                key={p.name}
                onClick={() => setPinned(pinned === p.name ? null : p.name)}
                className={`rounded-xl border p-3 transition ${
                  pinned === p.name ? "border-accent bg-accent/10" : "border-edge bg-surface"
                } ${hasRankChange ? `rank-changed ${staggerClass}` : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <Tooltip
                    content={
                      <RankTooltip
                        currentRank={showAgeGroupRank && "ageGroupRank" in p ? p.ageGroupRank as number : p.liveRank}
                        movement={p.movement}
                        officialRank={p.officialRank}
                      />
                    }
                    placement="top"
                  >
                    <span><RankBadge rank={showAgeGroupRank && "ageGroupRank" in p ? p.ageGroupRank as number : p.liveRank} /></span>
                  </Tooltip>
                  {showAgeGroupRank && (
                    <span className="text-xs text-muted">
                      (#{p.liveRank} overall)
                    </span>
                  )}
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
                  <FlagIcon code={p.flag} size="md" ariaLabel={`${p.countryCode} flag`} />
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
                    placement="bottom"
                  >
                    <Link
                      href={`/${tour}/player/${playerToSlug(p.name)}`}
                      className="flex-1 font-semibold text-fg transition hover:text-accent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.name}
                    </Link>
                  </Tooltip>
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
                    <span><AnimatedNumber value={p.livePoints} className="font-bold text-fg" /></span>
                  </Tooltip>
                </div>
                <div className="mt-2 flex items-center justify-between pl-[38px] text-xs text-muted">
                  <Tournament player={p} />
                  <span className="flex items-center gap-2">
                    <Delta value={p.pointsDelta} />
                    <span className="tabular-nums">{p.countryCode}{p.age ? ` · ${p.age}y` : ""}</span>
                  </span>
                </div>
                {p.tournament?.active && (
                  <div className="mt-1.5 flex items-center gap-3 pl-[38px] text-xs">
                    <span className="text-muted">
                      Next: <span className="font-semibold tabular-nums text-fg">{p.nextPoints.toLocaleString()}</span>
                    </span>
                    <span className="text-muted">
                      Max: <span className="font-semibold tabular-nums text-accent">{p.maxPoints.toLocaleString()}</span>
                      {p.projectedRank && <span className="ml-1 text-muted/70">→ #{p.projectedRank}</span>}
                    </span>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </>
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
                    ? `No ${country} players in this view`
                    : "No players found"
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

      {filtered.length > PAGE_SIZE && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <span className="tabular-nums">
            {safePage * PAGE_SIZE + 1}–{Math.min(filtered.length, safePage * PAGE_SIZE + PAGE_SIZE)} of{" "}
            {filtered.length.toLocaleString()}
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
      )}

      <p className="mt-3 text-xs text-muted/70">
        Live = projected ranking including points earned at this week&apos;s tournaments, estimated
        from completed results and the {snapshot.tourLabel ?? tour.toUpperCase()} points table.
        Official = last published ranking. Δ = points earned/lost this week (rankings can change even when Δ=0 as other players gain/lose points). Tap a row to pin it.
        {snapshot.source === "espn" && " Data via ESPN."}
        {snapshot.source === "uts" && " Data via UTS."}
        {snapshot.source === "uts+espn" && " Data via UTS & ESPN."}
      </p>
    </div>
  );
}
