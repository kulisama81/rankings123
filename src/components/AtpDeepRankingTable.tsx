"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AtpDeepRankingSnapshot, AtpLivePlayer } from "@/types";
import AnimatedNumber from "./AnimatedNumber";

const REFRESH_INTERVAL_S = 30;
const PAGE_SIZE = 50;

interface AtpDeepRankingTableProps {
  initialSnapshot: AtpDeepRankingSnapshot;
  band?: { from: number; to: number };
  apiEndpoint?: string;
}

function Movement({ value }: { value: number }) {
  if (value > 0)
    return <span className="inline-flex rounded-md bg-up/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-up">▲{value}</span>;
  if (value < 0)
    return <span className="inline-flex rounded-md bg-down/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-down">▼{Math.abs(value)}</span>;
  return <span className="text-xs text-muted/50">—</span>;
}

function PointsDelta({ value }: { value: number }) {
  if (value > 0) return <span className="text-xs font-medium tabular-nums text-up">+{value}</span>;
  if (value < 0) return <span className="text-xs font-medium tabular-nums text-down">{value}</span>;
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
  const fetching = useRef(false);

  const refresh = useCallback(async () => {
    if (fetching.current) return;
    fetching.current = true;
    try {
      const res = await fetch(apiEndpoint, { cache: "no-store" });
      if (res.ok) setSnapshot(await res.json());
    } catch {
      /* keep last good snapshot */
    } finally {
      fetching.current = false;
      setSecondsLeft(REFRESH_INTERVAL_S);
    }
  }, [apiEndpoint]);

  useEffect(() => {
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
  }, [refresh]);

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
  const updatedAt = new Date(snapshot.lastUpdated).toLocaleTimeString();
  const rangeStart = filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1;
  const rangeEnd = Math.min(filtered.length, safePage * PAGE_SIZE + PAGE_SIZE);
  const inputCls =
    "rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none";
  const btnCls =
    "rounded-lg border border-edge px-2.5 py-1 font-medium text-fg transition hover:bg-surface2 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any of 1000 players…"
          className={`w-56 ${inputCls}`}
        />
        <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputCls}>
          <option value="all">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex cursor-pointer items-center gap-1.5 text-sm text-muted">
          <input type="checkbox" checked={liveOnly} onChange={(e) => setLiveOnly(e.target.checked)} className="accent-accent" />
          In play ({liveCount})
        </label>
        <div className="ml-auto flex items-center gap-3 text-xs text-muted">
          {snapshot.source === "mock" && (
            <span className="rounded-full bg-down/15 px-2 py-0.5 font-medium text-down">Demo data</span>
          )}
          {snapshot.source === "uts" && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 font-medium text-accent">Ranking only</span>
          )}
          <span className="hidden sm:inline">updated {updatedAt} · {secondsLeft}s</span>
          <button onClick={() => void refresh()} className={btnCls}>Refresh</button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-edge bg-surface">
        <table className="min-w-full text-sm">
          <thead className="bg-surface2 text-[11px] uppercase tracking-wide text-muted">
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
            {pageRows.map((p) => (
              <tr
                key={`${p.officialRank}-${p.name}`}
                className={`border-t border-edge transition ${
                  p.tournament?.active ? "bg-accent/[0.035] hover:bg-surface2" : "hover:bg-surface2"
                }`}
              >
                <td className="px-3 py-2.5 text-right font-bold tabular-nums text-fg">{p.liveRank}</td>
                <td className="px-2 py-2.5 text-center"><Movement value={p.movement} /></td>
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{p.flag}</span>
                    <span className="font-semibold text-fg">{p.name}</span>
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center text-xs text-muted">{p.countryCode}</td>
                <td className="px-3 py-2.5 text-right text-xs tabular-nums text-muted">
                  {p.careerHigh ? `#${p.careerHigh}` : "—"}
                </td>
                <td className="px-4 py-2.5 text-right font-bold text-fg">
                  <AnimatedNumber value={p.livePoints} />
                </td>
                <td className="px-2 py-2.5 text-right"><PointsDelta value={p.pointsDelta} /></td>
                <td className="px-3 py-2.5 text-right tabular-nums text-muted">
                  {p.officialPoints.toLocaleString()}
                </td>
                <td className="px-4 py-2.5"><TournamentStatus player={p} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-muted">
                  No players match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>
          Showing {rangeStart}–{rangeEnd} of {filtered.length.toLocaleString()}
          {snapshot.total > snapshot.players.length && ` · ${snapshot.total.toLocaleString()} ranked`}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0} className={btnCls}>
            ← Prev
          </button>
          <span className="tabular-nums">Page {safePage + 1} / {pageCount}</span>
          <button onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))} disabled={safePage >= pageCount - 1} className={btnCls}>
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
