"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AtpLivePlayer, AtpLiveSnapshot } from "@/types";
import FlagName from "./FlagName";

const REFRESH_INTERVAL_S = 20;

interface AtpLiveTableProps {
  initialSnapshot: AtpLiveSnapshot;
}

function Movement({ value }: { value: number }) {
  if (value > 0) return <span className="font-semibold text-green-600">▲ {value}</span>;
  if (value < 0) return <span className="font-semibold text-red-500">▼ {Math.abs(value)}</span>;
  return <span className="text-gray-300">—</span>;
}

function PointsDelta({ value }: { value: number }) {
  if (value > 0) return <span className="font-medium text-green-600">+{value}</span>;
  if (value < 0) return <span className="font-medium text-red-500">{value}</span>;
  return <span className="text-gray-300">—</span>;
}

function TournamentStatus({ player }: { player: AtpLivePlayer }) {
  const t = player.tournament;
  if (!t) return <span className="text-xs text-gray-300">—</span>;
  if (!t.active) {
    return (
      <span className="text-xs text-gray-400">
        {t.name} · out
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      {t.name} · {t.round}
    </span>
  );
}

export default function AtpLiveTable({ initialSnapshot }: AtpLiveTableProps) {
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
      const res = await fetch("/api/atp/live", { cache: "no-store" });
      if (res.ok) setSnapshot(await res.json());
    } catch {
      // keep showing the last good snapshot
    } finally {
      fetching.current = false;
      setSecondsLeft(REFRESH_INTERVAL_S);
    }
  }, []);

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

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search player or country…"
          className="w-56 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-green-500 focus:outline-none"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-green-500 focus:outline-none"
        >
          <option value="all">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={liveOnly}
            onChange={(e) => setLiveOnly(e.target.checked)}
            className="accent-green-600"
          />
          In play only ({liveCount})
        </label>
        <div className="ml-auto flex items-center gap-3 text-xs text-gray-500">
          {snapshot.source === "mock" && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
              Demo data — live feed unavailable
            </span>
          )}
          <span>
            Updated {updatedAt} · refresh in {secondsLeft}s
          </span>
          <button
            onClick={() => void refresh()}
            className="rounded-lg border border-gray-300 px-2.5 py-1 font-medium text-gray-700 hover:bg-gray-50"
          >
            Refresh now
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-3 text-right">Live</th>
              <th className="px-3 py-3 text-center">+/-</th>
              <th className="px-4 py-3 text-left">Player</th>
              <th className="px-3 py-3 text-center">Age</th>
              <th className="px-3 py-3 text-center">Country</th>
              <th className="px-4 py-3 text-right">Live Pts</th>
              <th className="px-3 py-3 text-right">+/- Pts</th>
              <th className="px-3 py-3 text-right">Official</th>
              <th className="px-4 py-3 text-left">Tournament</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filtered.map((p) => (
              <tr
                key={p.name}
                onClick={() => setPinned(pinned === p.name ? null : p.name)}
                className={`cursor-pointer ${
                  pinned === p.name ? "bg-amber-50" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-3 py-2.5 text-right font-semibold text-gray-900">{p.liveRank}</td>
                <td className="px-3 py-2.5 text-center text-xs">
                  <Movement value={p.movement} />
                </td>
                <td className="px-4 py-2.5 font-medium text-gray-800">
                  <FlagName flag={p.flag} name={p.name} />
                </td>
                <td className="px-3 py-2.5 text-center text-gray-500">{p.age}</td>
                <td className="px-3 py-2.5 text-center text-xs text-gray-500">{p.countryCode}</td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold text-gray-900">
                  {p.livePoints.toLocaleString()}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-xs">
                  <PointsDelta value={p.pointsDelta} />
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-xs text-gray-500">
                  {p.officialPoints.toLocaleString()}
                </td>
                <td className="px-4 py-2.5">
                  <TournamentStatus player={p} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-gray-400">
                  No players match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Live = projected ranking including points earned at this week&apos;s tournaments,
        estimated from completed match results and the ATP points table for each tournament tier.
        Official = last published ATP ranking. Click a row to pin it.
        {snapshot.source === "espn" && " Rankings and results via ESPN."}
      </p>
    </div>
  );
}
