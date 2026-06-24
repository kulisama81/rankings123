"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { WorldCupBracket, WorldCupMatch } from "@/types";

interface InteractiveBracketPredictorProps {
  bracket: WorldCupBracket;
}

type Prediction = "home" | "away" | null;
type PredictionMap = Record<string, Prediction>;

// Encode predictions to base64 URL-safe string (browser-compatible)
function encodePredictions(predictions: PredictionMap): string {
  const entries = Object.entries(predictions).filter(([, v]) => v !== null);
  if (entries.length === 0) return "";
  const json = JSON.stringify(entries);
  // Use btoa + base64url conversion (replace +/= with -_)
  return btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// Decode predictions from base64 URL-safe string (browser-compatible)
function decodePredictions(encoded: string): PredictionMap {
  if (!encoded) return {};
  try {
    // Reverse base64url to base64
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    const entries: [string, Prediction][] = JSON.parse(json);
    return Object.fromEntries(entries);
  } catch {
    return {};
  }
}

// Store predictions in localStorage
function savePredictionsToStorage(predictions: PredictionMap) {
  try {
    localStorage.setItem("worldcup-bracket-predictions", JSON.stringify(predictions));
  } catch {
    // Ignore storage errors
  }
}

// Load predictions from localStorage
function loadPredictionsFromStorage(): PredictionMap {
  try {
    const stored = localStorage.getItem("worldcup-bracket-predictions");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function MatchCard({
  match,
  prediction,
  onPredict,
  showComparison,
}: {
  match: WorldCupMatch;
  prediction: Prediction;
  onPredict: (pick: Prediction) => void;
  showComparison: boolean;
}) {
  const isProjected = match.id.startsWith("projected-");
  const finished = match.state === "post";
  const live = match.state === "in";

  // Determine actual winner if match is finished
  const actualWinner: Prediction =
    finished && match.homeScore !== null && match.awayScore !== null
      ? match.homeScore > match.awayScore
        ? "home"
        : match.awayScore > match.homeScore
          ? "away"
          : null
      : null;

  // Correct prediction check
  const isCorrect = showComparison && finished && prediction === actualWinner;
  const isIncorrect = showComparison && finished && prediction !== null && prediction !== actualWinner;

  const homeSelected = prediction === "home";
  const awaySelected = prediction === "away";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all ${
        isProjected
          ? "border-surface2/50 bg-surface/50"
          : live
            ? "border-trophy/40 bg-trophy/5"
            : "border-surface2 bg-surface hover:border-trophy/30"
      } p-3`}
    >
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

      {/* Prediction feedback */}
      {showComparison && finished && (
        <div
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            isCorrect
              ? "bg-green-500/20 text-green-600 dark:text-green-400"
              : isIncorrect
                ? "bg-red-500/20 text-red-600 dark:text-red-400"
                : "bg-muted/20 text-muted"
          }`}
        >
          {isCorrect ? "✓ Correct" : isIncorrect ? "✗ Wrong" : "—"}
        </div>
      )}

      {/* Home team */}
      <button
        onClick={() => !finished && onPredict(homeSelected ? null : "home")}
        disabled={finished}
        className={`mb-2 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-all ${
          homeSelected
            ? "border-trophy bg-trophy/10"
            : finished && actualWinner === "home"
              ? "border-green-500/30 bg-green-500/10"
              : "border-edge bg-surface2 hover:border-trophy/30"
        } ${finished ? "cursor-default" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{match.homeFlag}</span>
          <span className="font-medium text-fg">{match.homeName}</span>
          {match.homeSeedLabel && (
            <span className="text-xs text-muted">({match.homeSeedLabel})</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {match.homeScore !== null && (
            <span className="text-lg font-bold tabular-nums text-fg">{match.homeScore}</span>
          )}
          {homeSelected && !finished && <span className="text-trophy">★</span>}
        </div>
      </button>

      {/* Away team */}
      <button
        onClick={() => !finished && onPredict(awaySelected ? null : "away")}
        disabled={finished}
        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-all ${
          awaySelected
            ? "border-trophy bg-trophy/10"
            : finished && actualWinner === "away"
              ? "border-green-500/30 bg-green-500/10"
              : "border-edge bg-surface2 hover:border-trophy/30"
        } ${finished ? "cursor-default" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{match.awayFlag}</span>
          <span className="font-medium text-fg">{match.awayName}</span>
          {match.awaySeedLabel && (
            <span className="text-xs text-muted">({match.awaySeedLabel})</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {match.awayScore !== null && (
            <span className="text-lg font-bold tabular-nums text-fg">{match.awayScore}</span>
          )}
          {awaySelected && !finished && <span className="text-trophy">★</span>}
        </div>
      </button>

      {/* Match details */}
      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span>{match.statusDetail}</span>
        {match.venue && <span className="truncate">{match.venue}</span>}
      </div>
    </div>
  );
}

function getInitialPredictions(searchParams: ReturnType<typeof useSearchParams>): PredictionMap {
  if (typeof window === "undefined") return {};

  const urlPredictions = decodePredictions(searchParams.get("p") || "");
  if (Object.keys(urlPredictions).length > 0) return urlPredictions;

  return loadPredictionsFromStorage();
}

export default function InteractiveBracketPredictor({
  bracket,
}: InteractiveBracketPredictorProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [predictions, setPredictions] = useState<PredictionMap>(() =>
    getInitialPredictions(searchParams)
  );
  const [showComparison, setShowComparison] = useState(false);

  // Update URL and localStorage when predictions change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const encoded = encodePredictions(predictions);
    const currentParams = new URLSearchParams(searchParams.toString());

    if (encoded) {
      currentParams.set("p", encoded);
    } else {
      currentParams.delete("p");
    }

    const newUrl = currentParams.toString()
      ? `/world-cup/bracket?${currentParams.toString()}`
      : "/world-cup/bracket";

    router.replace(newUrl, { scroll: false });
    savePredictionsToStorage(predictions);
  }, [predictions, router, searchParams]);

  const handlePredict = (matchId: string, pick: Prediction) => {
    setPredictions((prev) => {
      const updated = { ...prev };
      if (pick === null) {
        delete updated[matchId];
      } else {
        updated[matchId] = pick;
      }
      return updated;
    });
  };

  const totalPredictions = Object.keys(predictions).length;

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-edge bg-surface p-4">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-2xl font-bold text-fg">{totalPredictions}</div>
            <div className="text-xs uppercase tracking-wide text-muted">Picks Made</div>
          </div>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="rounded-lg border border-edge bg-surface2 px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface"
          >
            {showComparison ? "Hide" : "Show"} Results Comparison
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPredictions({})}
            className="rounded-lg border border-edge bg-surface2 px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert("Bracket URL copied! Share it with friends.");
            }}
            className="rounded-lg bg-trophy px-4 py-2 text-sm font-bold text-bg transition-colors hover:bg-trophy/90"
          >
            Share Bracket
          </button>
        </div>
      </div>

      {/* Bracket stages */}
      {bracket.stages.map((stage) => (
        <div key={stage.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-fg">{stage.name}</h2>
            {stage.startDate && (
              <span className="text-sm text-muted">
                {new Date(stage.startDate).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
                {stage.endDate && stage.endDate !== stage.startDate && (
                  <>
                    {" – "}
                    {new Date(stage.endDate).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    })}
                  </>
                )}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stage.matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                prediction={predictions[match.id] || null}
                onPredict={(pick) => handlePredict(match.id, pick)}
                showComparison={showComparison}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
