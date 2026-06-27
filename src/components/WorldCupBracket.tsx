"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { WorldCupBracket, WorldCupMatch, KnockoutStage } from "@/types";
import WorldCupBracketTree from "./WorldCupBracketTree";

interface WorldCupBracketProps {
  bracket: WorldCupBracket;
}

function MatchCard({ match, compact = false }: { match: WorldCupMatch; compact?: boolean }) {
  const live = match.state === "in";
  const finished = match.state === "post";
  const isProjected = match.id.startsWith("projected-");
  const kickoff = new Date(match.date).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const showScore = match.homeScore !== null && match.awayScore !== null;
  const homeWon = showScore && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWon = showScore && (match.awayScore ?? 0) > (match.homeScore ?? 0);

  const cardClassName = `group relative overflow-hidden rounded-xl border transition-all ${
    isProjected
      ? "border-surface2/50 bg-surface/50 [background:linear-gradient(135deg,rgb(255_255_255/0.01)_0%,transparent_100%)]"
      : live
        ? "border-trophy/40 bg-trophy/5 shadow-trophy/10 [background:linear-gradient(135deg,rgb(212_175_55/0.08)_0%,transparent_100%)]"
        : "border-surface2 bg-surface hover:border-trophy/30 [background:linear-gradient(135deg,rgb(255_255_255/0.02)_0%,transparent_100%)]"
  } ${compact ? "p-2.5" : "p-3"}`;

  const content = (
    <>
      {/* Live indicator */}
      {live && (
        <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-trophy/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-trophy">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trophy opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-trophy" />
          </span>
          Live
        </div>
      )}

      {/* Projected indicator */}
      {isProjected && (
        <div className="absolute right-2 top-2 rounded-full border border-muted/30 bg-bg/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted backdrop-blur-sm">
          Projected
        </div>
      )}

      {/* Match content */}
      <div className="space-y-2">
        {/* Home team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-xl leading-none" aria-hidden="true">
                {match.homeFlag}
              </span>
              <span
                className={`truncate font-bold ${
                  homeWon ? "text-fg" : finished ? "text-muted" : "text-fg"
                }`}
              >
                {match.homeName}
              </span>
            </div>
            {isProjected && match.homeSeedLabel && (
              <span className="ml-8 text-[11px] font-medium text-muted">
                {match.homeSeedLabel}
              </span>
            )}
          </div>
          {showScore && (
            <span
              className={`font-mono text-xl font-bold tabular-nums ${
                homeWon ? "text-trophy" : "text-muted"
              }`}
            >
              {match.homeScore}
            </span>
          )}
        </div>

        {/* Away team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-xl leading-none" aria-hidden="true">
                {match.awayFlag}
              </span>
              <span
                className={`truncate font-bold ${
                  awayWon ? "text-fg" : finished ? "text-muted" : "text-fg"
                }`}
              >
                {match.awayName}
              </span>
            </div>
            {isProjected && match.awaySeedLabel && (
              <span className="ml-8 text-[11px] font-medium text-muted">
                {match.awaySeedLabel}
              </span>
            )}
          </div>
          {showScore && (
            <span
              className={`font-mono text-xl font-bold tabular-nums ${
                awayWon ? "text-trophy" : "text-muted"
              }`}
            >
              {match.awayScore}
            </span>
          )}
        </div>

        {/* Match info */}
        <div className="flex items-center justify-between border-t border-surface2 pt-2 text-xs text-muted">
          <span className="font-mono">{live ? match.statusDetail : kickoff}</span>
          {match.venue && <span className="truncate">{match.venue}</span>}
        </div>
      </div>
    </>
  );

  // Projected matches are not clickable
  if (isProjected) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link href={`/world-cup/match/${match.id}`} className={cardClassName}>
      {content}
    </Link>
  );
}

function StageView({ stage, matches }: { stage: KnockoutStage; matches: WorldCupMatch[] }) {
  const startDate = matches[0]
    ? new Date(matches[0].date).toLocaleDateString([], { month: "long", day: "numeric" })
    : "";
  const endDate = matches[matches.length - 1]
    ? new Date(matches[matches.length - 1].date).toLocaleDateString([], {
        month: "long",
        day: "numeric",
      })
    : "";

  // Check if any matches are projected
  const hasProjected = matches.some((m) => m.id.startsWith("projected-"));
  const allProjected = matches.every((m) => m.id.startsWith("projected-"));

  // Use list view for wider stages (R32, R16), bracket tree for narrower (QF, SF, Final)
  const useListView = stage === "Round of 32" || stage === "Rd of 16";

  if (matches.length === 0) {
    return (
      <div className="rounded-xl border border-surface2 bg-surface p-8 text-center">
        <p className="text-muted">
          Teams will be confirmed as the group stage concludes.
          {startDate && ` Matches begin ${startDate}.`}
        </p>
      </div>
    );
  }

  if (useListView) {
    return (
      <div>
        <div className="mb-4 flex items-baseline gap-3">
          <h3 className="text-2xl font-bold text-fg">{stage}</h3>
          {startDate && (
            <span className="font-mono text-sm text-muted">
              {startDate}
              {endDate && endDate !== startDate ? ` – ${endDate}` : ""}
            </span>
          )}
        </div>

        {/* Projection notice */}
        {hasProjected && (
          <div className="mb-4 rounded-lg border border-muted/20 bg-surface/50 p-3 text-sm">
            <p className="text-muted">
              {allProjected ? (
                <>
                  <strong className="text-fg">Projected from current group standings.</strong>{" "}
                  Matchups update live as results change and are not yet confirmed. Once teams are
                  officially seeded, confirmed fixtures will replace these projections.
                </>
              ) : (
                <>
                  <strong className="text-fg">Some matchups are projected</strong> from current
                  standings and will update as results change.
                </>
              )}
            </p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    );
  }

  // Bracket tree view for later stages
  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-bold text-trophy">{stage}</h3>
        {startDate && (
          <p className="mt-1 font-mono text-sm text-muted">
            {startDate}
            {endDate && endDate !== startDate ? ` – ${endDate}` : ""}
          </p>
        )}
      </div>

      {/* Projection notice */}
      {hasProjected && (
        <div className="mx-auto mb-6 max-w-2xl rounded-lg border border-muted/20 bg-surface/50 p-3 text-center text-sm">
          <p className="text-muted">
            {allProjected ? (
              <>
                <strong className="text-fg">Projected from current group standings.</strong>{" "}
                Matchups update live as results change and are not yet confirmed.
              </>
            ) : (
              <>
                <strong className="text-fg">Some matchups are projected</strong> from current
                standings.
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <div className="grid gap-4">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} compact={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorldCupBracket({ bracket }: WorldCupBracketProps) {
  // The /world-cup page is ISR-cached, so the server-passed bracket can be STALE (e.g. R32
  // still "TBD" from before the group stage finished). Hydrate from the live (dynamic) API so
  // the bracket always reflects current matchups — mirrors WorldCupTable's live refresh.
  const [data, setData] = useState(bracket);
  const [viewMode, setViewMode] = useState<"tree" | "stages">("tree");
  const [selectedStage, setSelectedStage] = useState<KnockoutStage>(
    bracket.stages[0]?.name ?? "Round of 32"
  );

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/worldcup/bracket", { cache: "no-store" });
        if (res.ok && active) setData(await res.json());
      } catch {
        /* keep last good bracket */
      }
    };
    void load();
    const id = setInterval(() => void load(), 60000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const currentStage = data.stages.find((s) => s.name === selectedStage);

  if (data.stages.length === 0) {
    return (
      <div id="knockout-bracket" className="rounded-xl border border-surface2 bg-surface p-8 text-center">
        <h3 className="mb-2 text-xl font-bold text-fg">Knockout Stage</h3>
        <p className="text-muted">
          The knockout bracket will appear once the group stage concludes and teams advance.
        </p>
      </div>
    );
  }

  return (
    <div id="knockout-bracket">
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-fg">Knockout Stage</h2>
          {/* View mode toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("tree")}
              className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${
                viewMode === "tree"
                  ? "bg-trophy text-base shadow-md shadow-trophy/20"
                  : "border border-surface2 bg-surface text-fg hover:border-trophy/30"
              }`}
              aria-label="Bracket tree view"
            >
              Bracket Tree
            </button>
            <button
              onClick={() => setViewMode("stages")}
              className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${
                viewMode === "stages"
                  ? "bg-trophy text-base shadow-md shadow-trophy/20"
                  : "border border-surface2 bg-surface text-fg hover:border-trophy/30"
              }`}
              aria-label="Stage-by-stage view"
            >
              By Stage
            </button>
          </div>
        </div>

        {/* Stage tabs - only show in stages view mode */}
        {viewMode === "stages" && (
          <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {data.stages.map((stage) => {
              const isSelected = stage.name === selectedStage;
              const hasMatches = stage.matches.length > 0;
              return (
                <button
                  key={stage.name}
                  onClick={() => setSelectedStage(stage.name)}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                    isSelected
                      ? "bg-trophy text-base shadow-md shadow-trophy/20"
                      : hasMatches
                        ? "border border-surface2 bg-surface text-fg hover:border-trophy/30"
                        : "border border-surface2 bg-surface/50 text-muted"
                  }`}
                >
                  {stage.name === "Rd of 16" ? "R16" : stage.name.replace(/^(.+)s$/, "$1")}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bracket tree view (default) */}
      {viewMode === "tree" && <WorldCupBracketTree bracket={data} />}

      {/* Stage-by-stage view (fallback) */}
      {viewMode === "stages" && currentStage && (
        <StageView stage={currentStage.name} matches={currentStage.matches} />
      )}
    </div>
  );
}
