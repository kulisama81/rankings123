"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
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
      return "border-l-2 border-up";
    case "out":
      return "border-l-2 border-down/50 text-muted";
    default:
      return "border-l-2 border-transparent";
  }
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
        style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

function GroupCard({ group }: { group: WorldCupGroup }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
      <div className="border-b border-edge bg-surface2 px-4 py-2.5 text-sm font-bold tracking-tight text-fg">
        {group.name}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wide text-muted">
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
          <tbody>
            {group.teams.map((t) => (
              <tr
                key={t.code + t.name}
                className={`border-t border-edge ${outlookClasses(t.outlook)}`}
                title={t.status}
              >
                <td className="px-3 py-2 text-right tabular-nums text-muted">{t.rank}</td>
                <td className="px-3 py-2 font-semibold">
                  <Link
                    href={`/world-cup/team/${t.code.toLowerCase()}`}
                    className="inline-flex items-center text-fg hover:text-accent transition-colors"
                  >
                    <span className="mr-2 text-base leading-none" aria-hidden="true">{t.flag}</span>
                    {t.name}
                  </Link>
                </td>
                <td className="px-2 py-2 text-center tabular-nums text-muted">{t.played}</td>
                <td className="px-2 py-2 text-center tabular-nums text-muted">{t.won}</td>
                <td className="px-2 py-2 text-center tabular-nums text-muted">{t.drawn}</td>
                <td className="px-2 py-2 text-center tabular-nums text-muted">{t.lost}</td>
                <td className="px-2 py-2 text-center tabular-nums text-muted">
                  {t.goalDiff > 0 ? `+${t.goalDiff}` : t.goalDiff}
                </td>
                <td className="px-3 py-2 text-right font-bold tabular-nums text-fg">{t.points}</td>
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
    <Link
      href={`/world-cup/match/${match.id}`}
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition hover:border-accent/60 ${
        live ? "border-accent/40 bg-accent/[0.04]" : "border-edge bg-surface"
      }`}
    >
      <div className="w-20 shrink-0 text-xs">
        {live ? (
          <span className="inline-flex items-center gap-1.5 font-bold text-accent">
            <LiveDot />
            {match.statusDetail}
          </span>
        ) : finished ? (
          <span className="font-medium text-muted">{match.statusDetail}</span>
        ) : (
          <span className="text-muted">{kickoff}</span>
        )}
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <span className={homeWon ? "font-bold text-fg" : "text-fg/80"}>{match.homeName}</span>
        <span className="text-base leading-none" aria-hidden="true">{match.homeFlag}</span>
      </div>
      <div className="w-14 shrink-0 text-center font-bold tabular-nums text-fg">
        {showScore ? `${match.homeScore} – ${match.awayScore}` : "v"}
      </div>
      <div className="flex flex-1 items-center gap-2">
        <span className="text-base leading-none" aria-hidden="true">{match.awayFlag}</span>
        <span className={awayWon ? "font-bold text-fg" : "text-fg/80"}>{match.awayName}</span>
      </div>
    </Link>
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
      /* keep last good snapshot */
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

  // Group matches by date
  const today = new Date();
  const todayStr = today.toDateString();
  const todaysMatches = snapshot.matches.filter((m) => new Date(m.date).toDateString() === todayStr);

  // Group remaining matches (excluding today's) by date for the full schedule
  const matchesByDate = new Map<string, WorldCupMatch[]>();
  snapshot.matches
    .filter((m) => new Date(m.date).toDateString() !== todayStr)
    .forEach((match) => {
      const dateKey = new Date(match.date).toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      if (!matchesByDate.has(dateKey)) {
        matchesByDate.set(dateKey, []);
      }
      matchesByDate.get(dateKey)!.push(match);
    });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted">
        {snapshot.source === "mock" && (
          <span className="rounded-full bg-down/15 px-2 py-0.5 font-medium text-down">Demo data</span>
        )}
        {liveMatches > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 font-medium text-accent">
            <LiveDot /> {liveMatches} live now
          </span>
        )}
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:inline">updated {updatedAt} · {secondsLeft}s</span>
          <button
            onClick={() => void refresh()}
            className="rounded-lg border border-edge px-2.5 py-1 font-medium text-fg transition hover:bg-surface2"
          >
            Refresh
          </button>
        </div>
      </div>

      {todaysMatches.length > 0 && (
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-lg font-bold text-fg">Today&apos;s Matches</h2>
            <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
              {todaysMatches.length}
            </span>
          </div>
          <div className="grid gap-2">
            {todaysMatches.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {snapshot.matches.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            Full Schedule
          </h2>
          <div className="space-y-6">
            {Array.from(matchesByDate.entries()).map(([dateKey, matches]) => (
              <div key={dateKey}>
                <h3 className="mb-2 text-sm font-semibold text-muted">{dateKey}</h3>
                <div className="grid gap-2">
                  {matches.map((m) => (
                    <MatchRow key={m.id} match={m} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Group standings
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {snapshot.groups.map((g) => (
            <GroupCard key={g.name} group={g} />
          ))}
        </div>
      </section>

      <p className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-1 rounded bg-up" /> Advancing
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-1 rounded bg-down/60" /> Eliminated
        </span>
        {snapshot.source === "espn" && <span>Standings &amp; results via ESPN.</span>}
      </p>
    </div>
  );
}
