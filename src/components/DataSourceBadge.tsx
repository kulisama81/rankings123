interface DataSourceBadgeProps {
  source?: "espn" | "mock" | "uts" | "uts+espn" | "wta" | "official";
  className?: string;
  showLiveDot?: boolean;
}

function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
        style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
      />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}

export default function DataSourceBadge({ source, className = "", showLiveDot = false }: DataSourceBadgeProps) {
  if (!source || source === "mock") return null;

  const labels: Record<string, string> = {
    espn: "ESPN Live",
    uts: "UTS Rankings",
    "uts+espn": "UTS + ESPN Live",
    wta: "Official WTA",
    official: "Official",
  };

  const label = labels[source] || source.toUpperCase();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-edge bg-surface2 px-2 py-0.5 text-xs font-medium text-muted ${className}`}
    >
      {showLiveDot && <LiveDot />}
      {label}
    </span>
  );
}
