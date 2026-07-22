"use client";

import { useEffect, useState } from "react";
import SportIcon from "./SportIcon";

interface WorldCupFinalsMobileBadgeProps {
  finalMatch?: {
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    state: "pre" | "in" | "post";
  } | null;
}

export default function WorldCupFinalsMobileBadge({
  finalMatch,
}: WorldCupFinalsMobileBadgeProps) {
  const [show, setShow] = useState(false);
  // Initialize dismissed state from sessionStorage to avoid setState in effect
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("finals-badge-dismissed") === "true";
  });

  useEffect(() => {
    // Only show on mobile
    if (window.innerWidth >= 768) return;

    // Already dismissed, don't attach scroll listener
    if (dismissed) return;

    // Show on first scroll
    const handleScroll = () => {
      if (window.scrollY > 100 && !show && !dismissed) {
        setShow(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [show, dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("finals-badge-dismissed", "true");
  };

  if (!show || dismissed || !finalMatch) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-trophy/50 bg-gradient-to-br from-trophy/15 to-surface p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface2 text-muted transition hover:bg-edge hover:text-fg"
          aria-label="Dismiss"
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="text-trophy drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]">
              <SportIcon type="trophy" size={64} />
            </div>
          </div>

          <h2 className="font-display mb-3 text-2xl font-black tracking-tight text-fg">
            {finalMatch.state === "pre" && "WORLD CUP FINALS"}
            {finalMatch.state === "in" && "FINALS LIVE NOW"}
            {finalMatch.state === "post" && "FINAL RESULTS"}
          </h2>

          <div className="mb-6 flex items-center justify-center gap-3 text-3xl">
            <span>{finalMatch.homeFlag}</span>
            <span className="text-lg font-bold text-muted">vs</span>
            <span>{finalMatch.awayFlag}</span>
          </div>

          <p className="text-sm text-muted">
            {finalMatch.state === "pre" && "The biggest match in football"}
            {finalMatch.state === "in" && "Watch history unfold"}
            {finalMatch.state === "post" && "Champions crowned"}
          </p>

          <button
            onClick={handleDismiss}
            className="mt-6 w-full rounded-lg bg-trophy/20 px-4 py-3 font-semibold text-trophy transition hover:bg-trophy/30"
          >
            Continue to Standings
          </button>
        </div>
      </div>
    </div>
  );
}
