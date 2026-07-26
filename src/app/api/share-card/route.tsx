import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { flagEmoji } from "@/lib/flags";
import { SPORT_COLORS, SPORT_LABELS, type ShareCardData, type Sport } from "@/types/share-card";

export const runtime = "edge";

// CDN cache for 24 hours
export const revalidate = 86400;

// Template: Rank Milestone Card
function RankMilestoneCard({ data, width, height }: { data: ShareCardData; width: number; height: number }) {
  const accent = SPORT_COLORS[data.sport];
  const sportLabel = SPORT_LABELS[data.sport];
  const flag = data.countryCode ? flagEmoji(data.countryCode) : "";

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at center, ${accent}15 0%, #0A0E14 60%)`,
        position: "relative",
      }}
    >
      {/* Main content - centered */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* Massive rank number */}
        <div
          style={{
            fontSize: width > 1000 ? "240px" : "180px",
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          #{data.rank}
        </div>

        {/* Player name */}
        <div
          style={{
            fontSize: width > 1000 ? "64px" : "48px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            display: "flex",
          }}
        >
          {data.playerName}
        </div>

        {/* Country flag */}
        {flag && (
          <div
            style={{
              fontSize: width > 1000 ? "48px" : "36px",
              display: "flex",
              gap: "12px",
            }}
          >
            <span>{flag}</span>
            <span>{data.countryCode}</span>
          </div>
        )}

        {/* Points */}
        {data.points && (
          <div
            style={{
              fontSize: width > 1000 ? "32px" : "24px",
              fontWeight: 500,
              color: "#E8E8E8",
              marginTop: "10px",
              display: "flex",
            }}
          >
            {data.points.toLocaleString()} pts
          </div>
        )}

        {/* Movement indicator */}
        {data.movement && data.movement !== 0 && (
          <div
            style={{
              fontSize: width > 1000 ? "28px" : "20px",
              fontWeight: 600,
              color: accent,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{data.movement > 0 ? "▲" : "▼"}</span>
            <span>{Math.abs(data.movement)}</span>
          </div>
        )}

        {/* Sport label */}
        <div
          style={{
            fontSize: width > 1000 ? "24px" : "18px",
            fontWeight: 500,
            color: "#E8E8E8",
            marginTop: "20px",
            display: "flex",
          }}
        >
          {sportLabel}
        </div>

        {/* Date */}
        {data.date && (
          <div
            style={{
              fontSize: width > 1000 ? "20px" : "16px",
              fontWeight: 400,
              color: "#888888",
              display: "flex",
            }}
          >
            {data.date}
          </div>
        )}
      </div>

      {/* Watermark - positioned absolutely */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "60px",
          fontSize: "18px",
          fontWeight: 400,
          color: "#666666",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>rankings123</span>
        <span>⚡</span>
      </div>
    </div>
  );
}

// Template: Match Result Card
function MatchResultCard({ data, width, height }: { data: ShareCardData; width: number; height: number }) {
  const accent = SPORT_COLORS[data.sport];
  const sportLabel = SPORT_LABELS[data.sport];

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at center, ${accent}15 0%, #0A0E14 60%)`,
        position: "relative",
      }}
    >
      {/* Score display */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* Home team */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              fontSize: width > 1000 ? "56px" : "42px",
              fontWeight: 700,
              color: "#FFFFFF",
              width: width > 1000 ? "500px" : "350px",
              textAlign: "right",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {data.homeTeam}
          </div>
          <div
            style={{
              fontSize: width > 1000 ? "120px" : "90px",
              fontWeight: 900,
              color: "#FFFFFF",
              width: width > 1000 ? "150px" : "120px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {data.homeScore}
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            fontSize: width > 1000 ? "28px" : "20px",
            fontWeight: 600,
            color: accent,
            letterSpacing: "0.1em",
            display: "flex",
          }}
        >
          —
        </div>

        {/* Away team */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              fontSize: width > 1000 ? "120px" : "90px",
              fontWeight: 900,
              color: "#FFFFFF",
              width: width > 1000 ? "150px" : "120px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {data.awayScore}
          </div>
          <div
            style={{
              fontSize: width > 1000 ? "56px" : "42px",
              fontWeight: 700,
              color: "#FFFFFF",
              width: width > 1000 ? "500px" : "350px",
              textAlign: "left",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {data.awayTeam}
          </div>
        </div>

        {/* Match status */}
        {data.matchStatus && (
          <div
            style={{
              fontSize: width > 1000 ? "24px" : "18px",
              fontWeight: 500,
              color: "#E8E8E8",
              marginTop: "20px",
              display: "flex",
            }}
          >
            {data.matchStatus}
          </div>
        )}

        {/* Sport label */}
        <div
          style={{
            fontSize: width > 1000 ? "24px" : "18px",
            fontWeight: 500,
            color: "#E8E8E8",
            marginTop: "10px",
            display: "flex",
          }}
        >
          {sportLabel}
        </div>
      </div>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "60px",
          fontSize: "18px",
          fontWeight: 400,
          color: "#666666",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>rankings123</span>
        <span>⚡</span>
      </div>
    </div>
  );
}

// Template: Tournament Winner Card
function TournamentWinnerCard({ data, width, height }: { data: ShareCardData; width: number; height: number }) {
  const accent = SPORT_COLORS[data.sport];
  const flag = data.winnerCountry ? flagEmoji(data.winnerCountry) : "";

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at center, ${accent}20 0%, #0A0E14 60%)`,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Trophy icon */}
        <div style={{ fontSize: width > 1000 ? "100px" : "80px", display: "flex" }}>
          🏆
        </div>

        {/* Tournament name */}
        <div
          style={{
            fontSize: width > 1000 ? "36px" : "28px",
            fontWeight: 600,
            color: accent,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {data.tournamentName}
        </div>

        {/* Winner name */}
        <div
          style={{
            fontSize: width > 1000 ? "80px" : "60px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            display: "flex",
          }}
        >
          {data.winner}
        </div>

        {/* Country flag */}
        {flag && (
          <div style={{ fontSize: width > 1000 ? "48px" : "36px", display: "flex" }}>
            {flag}
          </div>
        )}

        {/* Champion label */}
        <div
          style={{
            fontSize: width > 1000 ? "32px" : "24px",
            fontWeight: 600,
            color: "#E8E8E8",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Champion
        </div>

        {/* Date */}
        {data.date && (
          <div
            style={{
              fontSize: width > 1000 ? "20px" : "16px",
              fontWeight: 400,
              color: "#888888",
              marginTop: "20px",
              display: "flex",
            }}
          >
            {data.date}
          </div>
        )}
      </div>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "60px",
          fontSize: "18px",
          fontWeight: 400,
          color: "#666666",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>rankings123</span>
        <span>⚡</span>
      </div>
    </div>
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const data: ShareCardData = {
      type: (searchParams.get("type") || "rank-milestone") as ShareCardData["type"],
      sport: (searchParams.get("sport") || "atp") as Sport,
      size: (searchParams.get("size") || "og") as "og" | "instagram",
      playerName: searchParams.get("player") || undefined,
      rank: searchParams.get("rank") ? parseInt(searchParams.get("rank")!) : undefined,
      points: searchParams.get("points") ? parseInt(searchParams.get("points")!) : undefined,
      countryCode: searchParams.get("country") || undefined,
      movement: searchParams.get("movement") ? parseInt(searchParams.get("movement")!) : undefined,
      homeTeam: searchParams.get("home") || undefined,
      awayTeam: searchParams.get("away") || undefined,
      homeScore: searchParams.get("homeScore") ? parseInt(searchParams.get("homeScore")!) : undefined,
      awayScore: searchParams.get("awayScore") ? parseInt(searchParams.get("awayScore")!) : undefined,
      matchStatus: searchParams.get("status") || undefined,
      tournamentName: searchParams.get("tournament") || undefined,
      winner: searchParams.get("winner") || undefined,
      winnerCountry: searchParams.get("winnerCountry") || undefined,
      date: searchParams.get("date") || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    // Determine dimensions
    const [width, height] = data.size === "instagram" ? [1080, 1080] : [1200, 630];

    // Select template based on type
    let template;
    switch (data.type) {
      case "match-result":
        template = <MatchResultCard data={data} width={width} height={height} />;
        break;
      case "tournament-winner":
        template = <TournamentWinnerCard data={data} width={width} height={height} />;
        break;
      case "rank-milestone":
      default:
        template = <RankMilestoneCard data={data} width={width} height={height} />;
    }

    // Using default system fonts for now - can be enhanced later with custom font loading
    // TODO: Add Archivo Black + Geist Sans custom fonts (blocked by Satori font loading)
    // TODO: Pre-generation + Vercel Blob caching for top 10 players (requires cron + @vercel/blob)
    // TODO: A/B testing + analytics tracking for social referral lift
    const response = new ImageResponse(template, {
      width,
      height,
    });

    // Add CDN caching headers (24h)
    response.headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200");

    return response;
  } catch (error) {
    console.error("Share card generation error:", error);
    return new Response("Failed to generate share card", { status: 500 });
  }
}
