"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { AtpLivePlayer, AtpLiveSnapshot, Tour } from "@/types";
import AnimatedNumber from "./AnimatedNumber";

const REFRESH_INTERVAL_S = 20;

interface LiveRankingTableProps {
  tour: Tour;
  initialSnapshot: AtpLiveSnapshot;
}

function Movement({ value }: { value: number }) {
  if (value > 0)
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md bg-up/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-up">
        ▲{value}
      </span>
    );
  if (value < 0)
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md bg-down/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-down">
        ▼{Math.abs(value)}
      </span>
    );
  return <span className="text-xs text-muted/50">—</span>;
}

function RankBadge({ rank }: { rank: number }) {
  const tint =
    rank === 1
      ? "bg-[#f2c14e]/20 text-[#f2c14e]"
      : rank === 2
        ? "bg-[#c7cdd6]/20 text-[#c7cdd6]"
        : rank === 3
          ? "bg-[#d08b5b]/25 text-[#d99b6c]"
          : "text-muted";
  return (
    <span
      className={`inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg px-1.5 text-sm font-bold tabular-nums ${tint}`}
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
  if (!t) return <span className="text-xs text-muted/40">—</span>;
  if (!t.active) return <span className="text-xs text-muted/70">{t.name} · out</span>;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-fg/80">
      <LiveDot />
      {t.name} · {t.round}
    </span>
  );
}

function Delta({ value }: { value: number }) {
  if (value > 0) return <span className="text-xs font-medium tabular-nums text-up">+{value}</span>;
  if (value < 0) return <span className="text-xs font-medium tabular-nums text-down">{value}</span>;
  return <span className="text-xs text-muted/40">—</span>;
}

export default function LiveRankingTable({ tour, initialSnapshot }: LiveRankingTableProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [liveOnly, setLiveOnly] = useState(false);
  const [pinned, setPinned] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL_S);
  const fetching = useRef(false);

  const refresh = useCallback(async () => {
    if (fetching.current) return;
    fetching.current = true;
    try {
      const res = await fetch(`/api/${tour}/live`, { cache: "no-store" });
      if (res.ok) setSnapshot(await res.json());
    } catch {
      /* keep last good snapshot */
    } finally {
      fetching.current = false;
      setSecondsLeft(REFRESH_INTERVAL_S);
    }
  }, [tour]);

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
      if (liveOnly && !p.tournament?.active) return false;
      if (country !== "all" && p.countryCode !== country) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.countryCode.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [snapshot.players, query, country, liveOnly]);

  const liveCount = snapshot.players.filter((p) => p.tournament?.active).length;
  const updatedAt = new Date(snapshot.lastUpdated).toLocaleTimeString();
  const tabs: { key: Tour; label: string; href: string }[] = [
    { key: "atp", label: "ATP", href: "/atp-live" },
    { key: "wta", label: "WTA", href: "/wta-live" },
  ];
  const inputCls =
    "rounded-lg border border-edge bg-surface px-3 py-1.5 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none";

  return (
    <div>
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
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
          placeholder="Search player or country…"
          className={`w-48 ${inputCls}`}
        />
        <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputCls}>
          <option value="all">All countries</option>
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
          In play ({liveCount})
        </label>
        <div className="ml-auto flex items-center gap-3 text-xs text-muted">
          {snapshot.source === "mock" && (
            <span className="rounded-full bg-down/15 px-2 py-0.5 font-medium text-down">Demo data</span>
          )}
          <span className="hidden sm:inline">
            updated {updatedAt} · {secondsLeft}s
          </span>
          <button
            onClick={() => void refresh()}
            className="rounded-lg border border-edge px-2.5 py-1 font-medium text-fg transition hover:bg-surface2"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Desktop: dense table */}
      <div className="hidden overflow-hidden rounded-2xl border border-edge bg-surface md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-surface2 text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2.5 text-right">#</th>
              <th className="px-2 py-2.5 text-center">+/-</th>
              <th className="px-3 py-2.5 text-left">Player</th>
              <th className="px-2 py-2.5 text-center">Age</th>
              <th className="px-3 py-2.5 text-right">Live Pts</th>
              <th className="px-2 py-2.5 text-right">Δ</th>
              <th className="px-3 py-2.5 text-right">Official</th>
              <th className="px-3 py-2.5 text-left">Tournament</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.name}
                onClick={() => setPinned(pinned === p.name ? null : p.name)}
                className={`cursor-pointer border-t border-edge transition ${
                  pinned === p.name
                    ? "bg-accent/10"
                    : p.tournament?.active
                      ? "bg-accent/[0.035] hover:bg-surface2"
                      : "hover:bg-surface2"
                }`}
              >
                <td className="px-3 py-2 text-right">
                  <RankBadge rank={p.liveRank} />
                </td>
                <td className="px-2 py-2 text-center"><Movement value={p.movement} /></td>
                <td className="px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{p.flag}</span>
                    <span className="font-semibold text-fg">{p.name}</span>
                    <span className="text-xs text-muted">{p.countryCode}</span>
                  </span>
                </td>
                <td className="px-2 py-2 text-center text-muted">{p.age}</td>
                <td className="px-3 py-2 text-right text-[15px] font-bold text-fg">
                  <AnimatedNumber value={p.livePoints} />
                </td>
                <td className="px-2 py-2 text-right"><Delta value={p.pointsDelta} /></td>
                <td className="px-3 py-2 text-right tabular-nums text-muted">
                  {p.officialPoints.toLocaleString()}
                </td>
                <td className="px-3 py-2"><Tournament player={p} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: card rows */}
      <div className="space-y-2 md:hidden">
        {filtered.map((p) => (
          <div
            key={p.name}
            onClick={() => setPinned(pinned === p.name ? null : p.name)}
            className={`rounded-xl border p-3 transition ${
              pinned === p.name ? "border-accent bg-accent/10" : "border-edge bg-surface"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <RankBadge rank={p.liveRank} />
              <Movement value={p.movement} />
              <span className="text-base leading-none">{p.flag}</span>
              <span className="flex-1 font-semibold text-fg">{p.name}</span>
              <AnimatedNumber value={p.livePoints} className="font-bold text-fg" />
            </div>
            <div className="mt-2 flex items-center justify-between pl-[38px] text-xs text-muted">
              <Tournament player={p} />
              <span className="flex items-center gap-2">
                <Delta value={p.pointsDelta} />
                <span className="tabular-nums">{p.countryCode} · {p.age}y</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-edge bg-surface px-4 py-10 text-center text-sm text-muted">
          No players match your filters.
        </p>
      )}

      <p className="mt-3 text-xs text-muted/70">
        Live = projected ranking including points earned at this week&apos;s tournaments, estimated
        from completed results and the {snapshot.tourLabel ?? tour.toUpperCase()} points table.
        Official = last published ranking. Tap a row to pin it.
        {snapshot.source === "espn" && " Data via ESPN."}
      </p>
    </div>
  );
}
