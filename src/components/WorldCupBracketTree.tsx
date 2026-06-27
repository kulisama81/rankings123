"use client";

import Link from "next/link";
import type { WorldCupBracket, WorldCupMatch } from "@/types";
import { getMatchHalf, type BracketHalf } from "@/lib/worldCupBracketTree";

interface BracketTreeProps {
  bracket: WorldCupBracket;
}

interface CompactMatchCardProps {
  match: WorldCupMatch;
  round: "R32" | "R16" | "QF" | "SF" | "Final";
}

function CompactMatchCard({ match, round }: CompactMatchCardProps) {
  const live = match.state === "in";
  const finished = match.state === "post";
  const isProjected = match.id.startsWith("projected-");
  const showScore = match.homeScore !== null && match.awayScore !== null;
  const homeWon = showScore && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWon = showScore && (match.awayScore ?? 0) > (match.homeScore ?? 0);

  // Smaller cards for R32/R16, slightly larger for later rounds
  const isEarlyRound = round === "R32" || round === "R16";
  const isFinal = round === "Final";

  const cardClassName = `group relative overflow-hidden rounded-lg transition-all ${
    isProjected
      ? "border-2 border-dashed border-muted/60 bg-surface2/50 backdrop-blur-sm shadow-sm"
      : live
        ? "border-2 border-trophy/50 bg-trophy/5 shadow-lg shadow-trophy/10"
        : "border border-surface2 bg-surface hover:border-trophy/40 hover:shadow-md"
  } ${isEarlyRound ? "px-2 py-1.5" : isFinal ? "px-4 py-3" : "px-3 py-2"}`;

  const content = (
    <>
      {/* Live indicator */}
      {live && (
        <div className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-trophy/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-trophy">
          <span className="relative flex h-1 w-1">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trophy opacity-75" />
            <span className="relative inline-flex h-1 w-1 rounded-full bg-trophy" />
          </span>
          Live
        </div>
      )}

      {/* Projected indicator */}
      {isProjected && !live && (
        <div className="absolute right-1.5 top-1.5 rounded-full border border-muted/40 bg-bg/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted backdrop-blur-sm">
          Proj
        </div>
      )}

      {/* Teams */}
      <div className="space-y-1">
        {/* Home team */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span className={`leading-none ${isEarlyRound ? "text-base" : "text-lg"}`} aria-hidden="true">
              {match.homeFlag}
            </span>
            <span
              className={`truncate font-bold ${isEarlyRound ? "text-xs" : "text-sm"} ${
                homeWon ? "text-fg" : finished ? "text-muted" : "text-fg"
              }`}
            >
              {isEarlyRound ? match.homeCode : match.homeName}
            </span>
          </div>
          {showScore && (
            <span
              className={`font-mono font-bold tabular-nums ${isEarlyRound ? "text-sm" : "text-base"} ${
                homeWon ? "text-trophy" : "text-muted"
              }`}
            >
              {match.homeScore}
            </span>
          )}
        </div>

        {/* Away team */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span className={`leading-none ${isEarlyRound ? "text-base" : "text-lg"}`} aria-hidden="true">
              {match.awayFlag}
            </span>
            <span
              className={`truncate font-bold ${isEarlyRound ? "text-xs" : "text-sm"} ${
                awayWon ? "text-fg" : finished ? "text-muted" : "text-fg"
              }`}
            >
              {isEarlyRound ? match.awayCode : match.awayName}
            </span>
          </div>
          {showScore && (
            <span
              className={`font-mono font-bold tabular-nums ${isEarlyRound ? "text-sm" : "text-base"} ${
                awayWon ? "text-trophy" : "text-muted"
              }`}
            >
              {match.awayScore}
            </span>
          )}
        </div>

        {/* Projected seed labels for early rounds */}
        {isProjected && isEarlyRound && (match.homeSeedLabel || match.awaySeedLabel) && (
          <div className="border-t border-surface2/50 pt-1 text-[9px] text-muted">
            {match.homeSeedLabel && <div className="truncate">{match.homeSeedLabel}</div>}
            {match.awaySeedLabel && <div className="truncate">{match.awaySeedLabel}</div>}
          </div>
        )}
      </div>
    </>
  );

  if (isProjected) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link href={`/world-cup/match/${match.id}`} className={cardClassName}>
      {content}
    </Link>
  );
}

interface RoundColumnProps {
  title: string;
  matches: WorldCupMatch[];
  round: "R32" | "R16" | "QF" | "SF" | "Final";
  half: BracketHalf;
}

function RoundColumn({ title, matches, round }: RoundColumnProps) {
  const isFinal = round === "Final";
  const columnWidth = round === "R32" ? "w-32" : round === "R16" ? "w-36" : "w-40";

  return (
    <div className={`flex shrink-0 flex-col ${isFinal ? "w-48" : columnWidth}`}>
      {/* Round title */}
      <div className="mb-3 text-center">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">{title}</h4>
      </div>

      {/* Matches for this round/half */}
      <div className={`flex flex-1 flex-col ${isFinal ? "justify-center" : "justify-around gap-3"}`}>
        {matches.map((match, idx) => (
          <CompactMatchCard key={match.id || idx} match={match} round={round} />
        ))}
      </div>
    </div>
  );
}

export default function WorldCupBracketTree({ bracket }: BracketTreeProps) {
  // Round of 32 is the key column right now — it holds the actual (projected) matchups;
  // R16→Final stay "Winner of R32 Match X" until results come in. (R32 was previously
  // dropped "to save space", which left the tree all-TBD and useless — it's restored here.)
  const r32Stage = bracket.stages.find((s) => s.name === "Round of 32");
  const r16Stage = bracket.stages.find((s) => s.name === "Rd of 16");
  const qfStage = bracket.stages.find((s) => s.name === "Quarterfinals");
  const sfStage = bracket.stages.find((s) => s.name === "Semifinals");
  const finalStage = bracket.stages.find((s) => s.name === "Final");

  // Include ALL matches (confirmed + projected) — CompactMatchCard distinguishes them.
  const r32Matches = r32Stage?.matches ?? [];
  const r16Matches = r16Stage?.matches ?? [];
  const qfMatches = qfStage?.matches ?? [];
  const sfMatches = sfStage?.matches ?? [];
  const finalMatch = finalStage?.matches?.[0];

  if (r32Matches.length === 0 && r16Matches.length === 0) {
    return (
      <div className="rounded-xl border border-surface2 bg-surface p-8 text-center">
        <p className="text-muted">
          The knockout bracket will appear once group stage standings are available.
        </p>
      </div>
    );
  }

  // Split matches by half using the official bracket structure. Derive each match's TRUE
  // index from its "projected-<round>-<n>" id (not array position) so a missing slot never
  // shifts teams into the wrong half.
  const idxOf = (m: WorldCupMatch, fallback: number) => {
    const mt = String(m.id).match(/-(\d+)$/);
    return mt ? Number(mt[1]) : fallback;
  };
  const getMatchesByHalf = (matches: WorldCupMatch[], round: "R32" | "R16" | "QF" | "SF") => {
    const top: WorldCupMatch[] = [];
    const bottom: WorldCupMatch[] = [];
    matches.forEach((match, i) => {
      const half = getMatchHalf(round, idxOf(match, i));
      if (half === "top") top.push(match);
      else if (half === "bottom") bottom.push(match);
    });
    return { top, bottom };
  };

  const r32ByHalf = getMatchesByHalf(r32Matches, "R32");
  const r16ByHalf = getMatchesByHalf(r16Matches, "R16");
  const qfByHalf = getMatchesByHalf(qfMatches, "QF");
  const sfByHalf = getMatchesByHalf(sfMatches, "SF");

  return (
    <div>
      {/* Bracket tree - horizontal scroll on mobile, full view on desktop */}
      <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex min-w-max flex-col gap-8">
          {/* TOP HALF */}
          <div className="rounded-xl border border-surface2/30 bg-[linear-gradient(135deg,rgb(255_255_255/0.01)_0%,transparent_100%)] p-4">
            <div className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-muted/70">
              Top Half
            </div>
            <div className="flex items-center gap-6">
              {r32ByHalf.top.length > 0 && (
                <RoundColumn title="Round of 32" matches={r32ByHalf.top} round="R32" half="top" />
              )}
              <div className="flex items-center text-surface2">
                <svg width="24" height="200" className="overflow-visible">
                  <line x1="0" y1="50" x2="24" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="150" x2="24" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              {r16ByHalf.top.length > 0 && (
                <RoundColumn title="Round of 16" matches={r16ByHalf.top} round="R16" half="top" />
              )}
              <div className="flex items-center text-surface2">
                <svg width="24" height="150" className="overflow-visible">
                  <line x1="0" y1="37" x2="24" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="113" x2="24" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              {qfByHalf.top.length > 0 && (
                <RoundColumn title="Quarterfinals" matches={qfByHalf.top} round="QF" half="top" />
              )}
              <div className="flex items-center text-surface2">
                <svg width="24" height="100" className="overflow-visible">
                  <line x1="0" y1="25" x2="24" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="75" x2="24" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              {sfByHalf.top.length > 0 && (
                <RoundColumn title="Semifinal 1" matches={sfByHalf.top} round="SF" half="top" />
              )}
            </div>
          </div>

          {/* FINAL (centered between halves) */}
          {finalMatch && (
            <div className="flex justify-center">
              <div className="rounded-xl border-2 border-trophy/30 bg-[linear-gradient(135deg,rgb(212_175_55/0.05)_0%,transparent_100%)] p-6">
                <div className="mb-3 text-center">
                  <h3 className="text-2xl font-bold text-trophy">Final</h3>
                  <p className="mt-1 text-xs text-muted">MetLife Stadium, New York/New Jersey</p>
                </div>
                <CompactMatchCard match={finalMatch} round="Final" />
              </div>
            </div>
          )}

          {/* BOTTOM HALF */}
          <div className="rounded-xl border border-surface2/30 bg-[linear-gradient(135deg,rgb(255_255_255/0.01)_0%,transparent_100%)] p-4">
            <div className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-muted/70">
              Bottom Half
            </div>
            <div className="flex items-center gap-6">
              {r32ByHalf.bottom.length > 0 && (
                <RoundColumn title="Round of 32" matches={r32ByHalf.bottom} round="R32" half="bottom" />
              )}
              <div className="flex items-center text-surface2">
                <svg width="24" height="200" className="overflow-visible">
                  <line x1="0" y1="50" x2="24" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="150" x2="24" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              {r16ByHalf.bottom.length > 0 && (
                <RoundColumn title="Round of 16" matches={r16ByHalf.bottom} round="R16" half="bottom" />
              )}
              <div className="flex items-center text-surface2">
                <svg width="24" height="150" className="overflow-visible">
                  <line x1="0" y1="37" x2="24" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="113" x2="24" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              {qfByHalf.bottom.length > 0 && (
                <RoundColumn title="Quarterfinals" matches={qfByHalf.bottom} round="QF" half="bottom" />
              )}
              <div className="flex items-center text-surface2">
                <svg width="24" height="100" className="overflow-visible">
                  <line x1="0" y1="25" x2="24" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="75" x2="24" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              {sfByHalf.bottom.length > 0 && (
                <RoundColumn title="Semifinal 2" matches={sfByHalf.bottom} round="SF" half="bottom" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile guidance */}
      <div className="mt-4 text-center text-xs text-muted sm:hidden">
        ← Scroll horizontally to see the full bracket →
      </div>
    </div>
  );
}
