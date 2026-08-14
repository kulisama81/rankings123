"use client";

import { useState } from "react";
import type { ShareCardData, Sport } from "@/types/share-card";

interface ShareButtonProps {
  type: ShareCardData["type"];
  sport: Sport;
  data: {
    playerName?: string;
    rank?: number;
    points?: number;
    countryCode?: string;
    movement?: number;
    homeTeam?: string;
    awayTeam?: string;
    homeScore?: number;
    awayScore?: number;
    matchStatus?: string;
    tournamentName?: string;
    winner?: string;
    winnerCountry?: string;
  };
  size?: "og" | "instagram";
  variant?: "icon" | "button";
}

export function ShareButton({ type, sport, data, size = "og", variant = "icon" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const generateShareUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({
      type,
      sport,
      size,
      ...(data.playerName && { player: data.playerName }),
      ...(data.rank && { rank: data.rank.toString() }),
      ...(data.points && { points: data.points.toString() }),
      ...(data.countryCode && { country: data.countryCode }),
      ...(data.movement && { movement: data.movement.toString() }),
      ...(data.homeTeam && { home: data.homeTeam }),
      ...(data.awayTeam && { away: data.awayTeam }),
      ...(data.homeScore !== undefined && { homeScore: data.homeScore.toString() }),
      ...(data.awayScore !== undefined && { awayScore: data.awayScore.toString() }),
      ...(data.matchStatus && { status: data.matchStatus }),
      ...(data.tournamentName && { tournament: data.tournamentName }),
      ...(data.winner && { winner: data.winner }),
      ...(data.winnerCountry && { winnerCountry: data.winnerCountry }),
    });

    return `${baseUrl}/api/share-card?${params.toString()}`;
  };

  const handleShare = async () => {
    const shareUrl = generateShareUrl();
    const shareText = data.playerName
      ? `${data.playerName} ranked #${data.rank} - Live on Rankings123`
      : data.winner
        ? `${data.winner} wins ${data.tournamentName}!`
        : `${data.homeTeam} ${data.homeScore} - ${data.awayScore} ${data.awayTeam}`;

    // Try native share API on mobile
    if (navigator.share && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: shareText,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fall through to copy
      }
    }

    // Desktop: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (variant === "icon") {
    return (
      <div className="relative">
        <button
          onClick={handleShare}
          className="p-2 rounded-lg bg-surface-2 hover:bg-surface-3 transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(var(--accent),0.3)] active:scale-95"
          aria-label="Share ranking"
          title="Share"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          )}
        </button>

        {/* Copy confirmation toast */}
        {copied && (
          <div className="absolute top-full right-0 mt-2 bg-green-600 text-bg-primary text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            Link copied! ✓
          </div>
        )}
      </div>
    );
  }

  // Button variant
  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-accent text-bg-primary font-medium rounded-lg hover:brightness-110 transition-all hover:shadow-[0_0_20px_rgba(var(--accent),0.4)] active:scale-95"
    >
      {copied ? "Link Copied! ✓" : "Share"}
    </button>
  );
}
