"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import SportIcon from "./SportIcon";

interface WorldCupFinalsHeroProps {
  finalMatch?: {
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    homeScore: number | null;
    awayScore: number | null;
    state: "pre" | "in" | "post";
    statusDetail: string;
  } | null;
}

type FinalsPhase = "before" | "live" | "after";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  opacity: number;
}

export default function WorldCupFinalsHero({ finalMatch }: WorldCupFinalsHeroProps) {
  const [countdown, setCountdown] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasPlayedConfetti = useRef(false);

  // Determine phase and champion via useMemo (no setState in effect)
  const { phase, champion } = useMemo(() => {
    const now = new Date();
    const finalsKickoff = new Date("2026-07-19T15:00:00-04:00"); // 3PM ET
    const finalsEnd = new Date("2026-07-19T18:00:00-04:00"); // ~6PM ET

    let calculatedPhase: FinalsPhase = "before";
    let calculatedChampion: string | null = null;

    if (finalMatch) {
      if (finalMatch.state === "in") {
        calculatedPhase = "live";
      } else if (finalMatch.state === "post") {
        calculatedPhase = "after";
        // Determine champion from score
        if (finalMatch.homeScore !== null && finalMatch.awayScore !== null) {
          if (finalMatch.homeScore > finalMatch.awayScore) {
            calculatedChampion = finalMatch.homeTeam;
          } else if (finalMatch.awayScore > finalMatch.homeScore) {
            calculatedChampion = finalMatch.awayTeam;
          }
        }
      } else {
        calculatedPhase = "before";
      }
    } else {
      // Fallback time-based logic
      if (now >= finalsEnd) {
        calculatedPhase = "after";
      } else if (now >= finalsKickoff) {
        calculatedPhase = "live";
      } else {
        calculatedPhase = "before";
      }
    }

    return { phase: calculatedPhase, champion: calculatedChampion };
  }, [finalMatch]);

  // Countdown timer (for "before" phase)
  useEffect(() => {
    if (phase !== "before") return;

    const updateCountdown = () => {
      const now = new Date();
      const finalsKickoff = new Date("2026-07-19T15:00:00-04:00");
      const diff = finalsKickoff.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  // Confetti animation
  useEffect(() => {
    // Only run once per session
    if (hasPlayedConfetti.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create 50 particles
    const colors = ["#d4af37", "#ffd700", "#ffed4e"]; // Trophy gold variations
    const particles: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100, // Start from center-top
        y: -10,
        vx: (Math.random() - 0.5) * 4, // Horizontal drift
        vy: Math.random() * 2 + 1, // Initial downward velocity
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
      });
    }

    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    function animate() {
      if (!ctx || !canvas) return;

      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        hasPlayedConfetti.current = true;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Physics
        p.vy += 0.1; // Gravity
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Fade out as particles approach bottom
        p.opacity = Math.max(0, 1 - p.y / canvas.height);

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2); // Rectangle confetti
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, [phase]);

  if (!finalMatch && phase === "before") {
    // No Finals match data and we're not in Finals timeframe
    return null;
  }

  return (
    <div className="relative mb-6">
      {/* Confetti canvas overlay */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Finals Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-trophy/50 bg-gradient-to-br from-trophy/10 via-surface to-surface shadow-[0_0_40px_rgba(212,175,55,0.2)]">
        {/* Gold glow background effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-trophy/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-trophy/20 blur-3xl" />

        <div className="relative px-6 py-8 sm:px-10 sm:py-12">
          {/* Trophy Icon + Title */}
          <div className="mb-6 flex items-center gap-4">
            <div className="text-trophy drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]">
              <SportIcon type="trophy" size={64} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-black leading-none tracking-tight text-fg sm:text-5xl">
                {phase === "before" && "WORLD CUP FINALS"}
                {phase === "live" && "WORLD CUP FINALS — LIVE"}
                {phase === "after" && "WORLD CUP 2026 FINAL RESULTS"}
              </h1>
              {phase === "before" && (
                <p className="mt-2 text-base text-muted sm:text-lg">
                  July 19, 2026 · 3:00 PM ET
                </p>
              )}
            </div>
          </div>

          {/* Match Display */}
          {finalMatch && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 sm:gap-8">
                {/* Home Team */}
                <div className="flex flex-1 items-center justify-end gap-3 text-right">
                  <div>
                    <div className="text-xl font-bold text-fg sm:text-2xl">
                      {finalMatch.homeTeam}
                    </div>
                    {champion === finalMatch.homeTeam && (
                      <div className="mt-1 text-sm font-bold text-trophy">CHAMPION ⭐</div>
                    )}
                  </div>
                  <span className="text-5xl sm:text-6xl">{finalMatch.homeFlag}</span>
                </div>

                {/* Score or VS */}
                <div className="flex flex-col items-center gap-1">
                  {phase === "live" || phase === "after" ? (
                    <>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="font-mono text-5xl font-black tabular-nums text-fg sm:text-7xl">
                          {finalMatch.homeScore ?? 0}
                        </span>
                        <span className="text-3xl font-bold text-muted sm:text-4xl">-</span>
                        <span className="font-mono text-5xl font-black tabular-nums text-fg sm:text-7xl">
                          {finalMatch.awayScore ?? 0}
                        </span>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-trophy sm:text-sm">
                        {finalMatch.statusDetail}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-muted sm:text-3xl">vs</span>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex flex-1 items-center gap-3">
                  <span className="text-5xl sm:text-6xl">{finalMatch.awayFlag}</span>
                  <div>
                    <div className="text-xl font-bold text-fg sm:text-2xl">
                      {finalMatch.awayTeam}
                    </div>
                    {champion === finalMatch.awayTeam && (
                      <div className="mt-1 text-sm font-bold text-trophy">CHAMPION ⭐</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Countdown (before phase only) */}
          {phase === "before" && countdown && (
            <div className="border-t border-trophy/30 pt-6">
              <div className="text-center">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-trophy">
                  Kickoff In
                </div>
                <div className="font-mono text-6xl font-black tabular-nums text-trophy sm:text-7xl">
                  {countdown}
                </div>
              </div>
            </div>
          )}

          {/* Share CTA (after phase only) */}
          {phase === "after" && (
            <div className="border-t border-trophy/30 pt-6">
              <Link
                href="/world-cup/final-2026-predictions"
                className="group flex items-center justify-center gap-2 rounded-xl border border-trophy/40 bg-trophy/10 px-6 py-3 font-semibold text-trophy transition hover:border-trophy hover:bg-trophy/20"
              >
                <span>Share Your Prediction</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}

          {/* Live indicator dot (live phase only) */}
          {phase === "live" && (
            <div className="absolute right-6 top-6 flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trophy opacity-75" />
                <div className="relative inline-flex h-3 w-3 rounded-full bg-trophy" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wide text-trophy">
                LIVE
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
