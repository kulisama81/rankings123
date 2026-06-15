"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  WorldCupGroup,
  WorldCupMatch,
  WorldCupSnapshot,
  WorldCupTeam,
} from "@/types";

const REFRESH_INTERVAL_S = 30;

interface WorldCupTableProps {
  initialSnapshot: WorldCupSnapshot;
}

function outlookClasses(outlook: WorldCupTeam["outlook"]): string {
  switch (outlook) {
    case "advanced":
      return "border-l-2 border-green-500";
    case "out":
      return "border-l-2 border-red-300 text-gray-400";
    default:
      return "border-l-2 border-transparent";
  }
}

function GroupCard({ group }: { group: WorldCupGroup }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-800">
        {group.name}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white text-xs uppercase text-gray-400">
            <tr>
              <th className="px-3 py-2 text-right">#</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-2 py-2 text-center" title="Played">P</th>
              <th className="px-2 py-2 text-center" title="Won">W</th>
              <th className="px-2 py-2 text-center" title="Drawn">D</th>
              <th className="px-2 py-2 text-center" title="Lost">L</th>
              <th className="px-2 py-2 text-center" title="Goal difference">GD</th>
              <th className="px-3 py-2 text-right" title="Points">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {group.teams.map((t) => (
              <tr
                key={t.code + t.name}
                className={outlookClasses(t.outlook)}
                title={t.status}
              >
                <td className="px-3 py-2 text-right text-gray-500">{t.rank}</td>
                <td className="px-3 py-2 font-medium text-gray-800">
                  <span className="mr-2" aria-hidden="true">{t.flag}</span>
                  {t.name}
                </td>
                <td className="px-2 py-2 text-center text-gray-500">{t.played}</td>
                <td className="px-2 py-2 text-center text-gray-500">{t.won}</td>
                <td className="px-2 py-2 text-center text-gray-500">{t.drawn}</td>
                <td className="px-2 py-2 text-center text-gray-500">{t.lost}</td>
                <td className="px-2 py-2 text-center text-gray-500">
                  {t.goalDiff > 0 ? `+${t.goalDiff}` : t.goalDiff}
                </td>
                <td className="px-3 py-2 text-right font-mono font-semibold text-gray-900">
                  {t.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MatchRow({ match }: { match: WorldCupMatch }) {
  const live = match.state === "in";
  const finished = match.state === "post";
  const kickoff = new Date(match.date).toLocaleString([], {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  const showScore = match.homeScore !== null && match.awayScore !== null;
  const homeWon = showScore && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWon = showScore && (match.awayScore ?? 0) > (match.homeScore ?? 0);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-sm">
      <div className="w-20 shrink-0 text-xs">
        {live ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-green-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {match.statusDetail}
          </span>
        ) : finished ? (
          <span className="font-medium text-gray-400">{match.statusDetail}</span>
        ) : (
          <span className="text-gray-500">{kickoff}</span>
        )}
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <span className={homeWon ? "font-semibold text-gray-900" : "text-gray-700"}>
          {match.homeName}
        </span>
        <span aria-hidden="true">{match.homeFlag}</span>
      </div>
      <div className="w-14 shrink-0 text-center font-mono font-semibold text-gray-900">
        {showScore ? `${match.homeScore} – ${match.awayScore}` : "v"}
      </div>
      <div className="flex flex-1 items-center gap-2">
        <span aria-hidden="true">{match.awayFlag}</span>
        <span className={awayWon ? "font-semibold text-gray-900" : "text-gray-700"}>
          {match.awayName}
        </span>
      </div>
    </div>
  );
}

export default function WorldCupTable({ initialSnapshot }: WorldCupTableProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL_S);
  const fetching = useRef(false);

  const refresh = useCallback(async () => {
    if (fetching.current) return;
    fetching.current = true;
    try {
      const res = await fetch("/api/worldcup/live", { cache: "no-store" });
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

  const updatedAt = new Date(snapshot.lastUpdated).toLocaleTimeString();
  const liveMatches = snapshot.matches.filter((m) => m.state === "in").length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
        {snapshot.source === "mock" && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
            Demo data — live feed unavailable
          </span>
        )}
        {liveMatches > 0 && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-700">
            {liveMatches} live now
          </span>
        )}
        <div className="ml-auto flex items-center gap-3">
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

      {snapshot.matches.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Fixtures &amp; results
          </h2>
          <div className="grid gap-2">
            {snapshot.matches.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Group standings
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {snapshot.groups.map((g) => (
            <GroupCard key={g.name} group={g} />
          ))}
        </div>
      </section>

      <p className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-1 rounded bg-green-500" /> Advancing
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-1 rounded bg-red-300" /> Eliminated
        </span>
        {snapshot.source === "espn" && <span>Standings and results via ESPN.</span>}
      </p>
    </div>
  );
}
