interface MedalBadgeProps {
  medal: "gold" | "silver" | "bronze";
}

const config = {
  gold:   { label: "Gold",   emoji: "🥇", className: "bg-yellow-100 text-yellow-800" },
  silver: { label: "Silver", emoji: "🥈", className: "bg-gray-100 text-gray-700" },
  bronze: { label: "Bronze", emoji: "🥉", className: "bg-orange-100 text-orange-800" },
};

export default function MedalBadge({ medal }: MedalBadgeProps) {
  const { label, emoji, className } = config[medal];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>
      <span aria-hidden="true">{emoji}</span>
      {label}
    </span>
  );
}
