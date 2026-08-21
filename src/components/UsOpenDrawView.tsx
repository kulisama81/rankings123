"use client";

import { useState, useEffect } from "react";
import type { AtpLiveSnapshot } from "@/types";
import HeroBanner from "./HeroBanner";
import Link from "next/link";

interface UsOpenDrawViewProps {
  atpSnapshot: AtpLiveSnapshot;
  wtaSnapshot: AtpLiveSnapshot;
}

const DRAW_CEREMONY_DATE = new Date("2026-08-27T14:00:00-04:00"); // Aug 27, 2026, 2 PM ET

export default function UsOpenDrawView({
  atpSnapshot,
  wtaSnapshot,
}: UsOpenDrawViewProps) {
  const [activeTour, setActiveTour] = useState<"atp" | "wta">("atp");
  const [timeToDrawCeremony, setTimeToDrawCeremony] = useState("");
  const [isDrawReleased, setIsDrawReleased] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      setIsDrawReleased(now >= DRAW_CEREMONY_DATE);

      if (now < DRAW_CEREMONY_DATE) {
        const diff = DRAW_CEREMONY_DATE.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeToDrawCeremony(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeToDrawCeremony(`${hours}h ${minutes}m`);
        } else {
          setTimeToDrawCeremony(`${minutes}m`);
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Get top 32 seeds (projected) from current rankings
  const activeSnapshot = activeTour === "atp" ? atpSnapshot : wtaSnapshot;
  const projectedSeeds = activeSnapshot.players.slice(0, 32);

  const stats = [
    { label: "Draw Ceremony", value: "Aug 27, 2026 • 2:00 PM ET" },
    { label: "Tournament Start", value: "Aug 30, 2026" },
    {
      label: "Status",
      value: isDrawReleased ? "Draw Released" : "Pre-Draw",
    },
    { label: "Format", value: "128-player singles draw" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroBanner
        sport="tennis"
        title="US Open 2026 Draw"
        subtitle="Men's & Women's Singles Brackets • USTA Billie Jean King National Tennis Center"
        stats={stats}
      />

      {/* Tour Toggle */}
      <div className="mb-8 flex justify-center gap-2">
        <button
          onClick={() => setActiveTour("atp")}
          aria-pressed={activeTour === "atp"}
          aria-label="View ATP Men's draw"
          className={`btn-base rounded-lg font-medium ${
            activeTour === "atp" ? "btn-primary" : "btn-secondary"
          }`}
        >
          ATP Men
        </button>
        <button
          onClick={() => setActiveTour("wta")}
          aria-pressed={activeTour === "wta"}
          aria-label="View WTA Women's draw"
          className={`btn-base rounded-lg font-medium ${
            activeTour === "wta" ? "btn-primary" : "btn-secondary"
          }`}
        >
          WTA Women
        </button>
      </div>

      {/* Pre-draw: Countdown */}
      {!isDrawReleased && (
        <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            Draw Ceremony Countdown
          </div>
          <div className="mb-4 text-5xl font-bold text-accent sm:text-6xl">
            {timeToDrawCeremony || "Loading..."}
          </div>
          <p className="text-muted-hover">
            The official US Open singles draw will be released on{" "}
            <strong className="text-fg">August 27, 2026 at 2:00 PM ET</strong>. Check back
            then for the full bracket.
          </p>
        </div>
      )}

      {/* Post-draw: Link to official draw */}
      {isDrawReleased && (
        <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <h2 className="type-subtitle mb-3 text-fg">
            🎾 Official Draw Released
          </h2>
          <p className="mb-4 text-muted-hover">
            The US Open 2026 singles draw has been released. View the complete bracket and
            match schedule on the official tournament website.
          </p>
          <a
            href="https://www.usopen.org/draws/2026"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-primary inline-block rounded-lg px-6 py-2 font-semibold"
          >
            View Official Draw →
          </a>
        </div>
      )}

      {/* Betting Preview Link */}
      <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <h2 className="type-subtitle mb-3 text-fg">
          Championship Betting Preview
        </h2>
        <p className="mb-4 text-muted-hover">
          Expert analysis of betting favorites, value picks, and title paths for both the
          men&apos;s and women&apos;s draws. Updated with latest form and odds.
        </p>
        <Link
          href="/articles/us-open-2026-betting-favorites"
          className="btn-base btn-primary inline-block rounded-lg px-6 py-2 font-semibold"
        >
          View Full Betting Analysis →
        </Link>
      </div>

      {/* Projected Seeding */}
      <div className="mb-8 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="type-subtitle mb-4 text-fg">
          Projected Seeding (Top 32)
        </h2>
        <p className="mb-4 text-sm text-muted">
          Seeding is based on ATP/WTA rankings as of the week before the tournament. Players
          ranked 1-32 typically receive seeds and are placed in the draw to avoid early-round
          matchups with other top players.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {projectedSeeds.map((player, idx) => (
            <div
              key={player.name}
              className="flex items-center justify-between rounded-lg border border-edge bg-bg px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-fg">{player.name}</div>
                  <div className="text-xs text-muted">
                    {player.countryCode} • #{player.officialRank}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Draw Format Explainer */}
      <div className="mb-8 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="type-subtitle mb-4 text-fg">
          How the Draw Works
        </h2>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-muted-hover">
            The US Open singles draw consists of 128 players in a single-elimination
            knockout format. The top 32 players are seeded based on their ATP/WTA rankings
            and placed strategically to avoid meeting until later rounds.
          </p>
          <ul className="mt-3 space-y-2 text-muted-hover">
            <li>
              <strong className="text-fg">Seeding:</strong> Seeds 1-32 are distributed
              across the draw. Top seeds (#1-4) are placed in separate quarters to avoid
              meeting until semifinals.
            </li>
            <li>
              <strong className="text-fg">Protected Sections:</strong> Seeds 5-8, 9-16, and
              17-32 are similarly distributed to maintain competitive balance.
            </li>
            <li>
              <strong className="text-fg">Unseeded Players:</strong> The remaining 96
              players (those ranked 33+) are randomly drawn into the bracket, potentially
              facing top seeds in Round 1.
            </li>
            <li>
              <strong className="text-fg">Draw Ceremony:</strong> Held one week before the
              tournament, the ceremony places all players and determines first-round
              matchups.
            </li>
          </ul>
        </div>
      </div>

      {/* Related Links */}
      <div className="rounded-2xl border border-edge bg-surface p-6">
        <h2 className="type-subtitle mb-4 text-fg">
          US Open 2026 Coverage
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/us-open-2026"
            className="btn-base btn-secondary rounded-lg px-4 py-3 text-left"
          >
            <div className="font-semibold text-fg">Live Scores & Rankings</div>
            <div className="text-sm text-muted">Real-time tournament updates</div>
          </Link>
          <Link
            href="/articles/us-open-2026-betting-favorites"
            className="btn-base btn-secondary rounded-lg px-4 py-3 text-left"
          >
            <div className="font-semibold text-fg">Betting Preview</div>
            <div className="text-sm text-muted">Favorites & value picks</div>
          </Link>
          <Link
            href="/atp-live"
            className="btn-base btn-secondary rounded-lg px-4 py-3 text-left"
          >
            <div className="font-semibold text-fg">ATP Live Rankings</div>
            <div className="text-sm text-muted">Current men&apos;s rankings</div>
          </Link>
          <Link
            href="/wta-live"
            className="btn-base btn-secondary rounded-lg px-4 py-3 text-left"
          >
            <div className="font-semibold text-fg">WTA Live Rankings</div>
            <div className="text-sm text-muted">Current women&apos;s rankings</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
