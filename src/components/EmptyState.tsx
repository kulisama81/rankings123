"use client";

import { useEffect, useState } from "react";

type EmptyStateIcon = "search" | "filter" | "calendar" | "trophy" | "generic";

interface EmptyStateProps {
  icon?: EmptyStateIcon;
  headline: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Minimal line-art icons (2px stroke, accent-colored) - designed to animate in once
function EmptyIcon({ type }: { type: EmptyStateIcon }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const iconClass = animate ? "opacity-100 scale-100" : "opacity-0 scale-95";
  const pathClass = "stroke-accent";

  switch (type) {
    case "search":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className={`transition-all duration-700 ease-out ${iconClass}`}
          style={{ transitionDelay: "100ms" }}
        >
          <circle
            cx="20"
            cy="20"
            r="12"
            strokeWidth="2.5"
            className={pathClass}
            style={{
              strokeDasharray: 75,
              strokeDashoffset: animate ? 0 : 75,
              transition: "stroke-dashoffset 1s ease-out 200ms",
            }}
          />
          <path
            d="M29 29L38 38"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={pathClass}
            style={{
              strokeDasharray: 13,
              strokeDashoffset: animate ? 0 : 13,
              transition: "stroke-dashoffset 0.6s ease-out 800ms",
            }}
          />
        </svg>
      );

    case "filter":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className={`transition-all duration-700 ease-out ${iconClass}`}
          style={{ transitionDelay: "100ms" }}
        >
          <path
            d="M8 12h32M12 24h24M18 36h12"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={pathClass}
            style={{
              strokeDasharray: 96,
              strokeDashoffset: animate ? 0 : 96,
              transition: "stroke-dashoffset 1.2s ease-out 200ms",
            }}
          />
          <circle cx="20" cy="12" r="3" strokeWidth="2.5" className={pathClass} />
          <circle cx="28" cy="24" r="3" strokeWidth="2.5" className={pathClass} />
          <circle cx="24" cy="36" r="3" strokeWidth="2.5" className={pathClass} />
        </svg>
      );

    case "calendar":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className={`transition-all duration-700 ease-out ${iconClass}`}
          style={{ transitionDelay: "100ms" }}
        >
          <rect
            x="8"
            y="12"
            width="32"
            height="28"
            rx="4"
            strokeWidth="2.5"
            className={pathClass}
            style={{
              strokeDasharray: 120,
              strokeDashoffset: animate ? 0 : 120,
              transition: "stroke-dashoffset 1.2s ease-out 200ms",
            }}
          />
          <path
            d="M8 20h32"
            strokeWidth="2.5"
            className={pathClass}
            style={{
              strokeDasharray: 32,
              strokeDashoffset: animate ? 0 : 32,
              transition: "stroke-dashoffset 0.6s ease-out 900ms",
            }}
          />
          <path d="M16 8v8M32 8v8" strokeWidth="2.5" strokeLinecap="round" className={pathClass} />
        </svg>
      );

    case "trophy":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className={`transition-all duration-700 ease-out ${iconClass}`}
          style={{ transitionDelay: "100ms" }}
        >
          <path
            d="M24 28c6 0 10-4 10-10V10H14v8c0 6 4 10 10 10z"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={pathClass}
            style={{
              strokeDasharray: 60,
              strokeDashoffset: animate ? 0 : 60,
              transition: "stroke-dashoffset 1.2s ease-out 200ms",
            }}
          />
          <path
            d="M24 28v8M18 36h12"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={pathClass}
            style={{
              strokeDasharray: 20,
              strokeDashoffset: animate ? 0 : 20,
              transition: "stroke-dashoffset 0.6s ease-out 900ms",
            }}
          />
          <path d="M14 10h-4a4 4 0 000 8h4M34 10h4a4 4 0 010 8h-4" strokeWidth="2.5" className={pathClass} />
        </svg>
      );

    case "generic":
    default:
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className={`transition-all duration-700 ease-out ${iconClass}`}
          style={{ transitionDelay: "100ms" }}
        >
          <circle
            cx="24"
            cy="24"
            r="16"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            className={pathClass}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: animate ? 0 : 100,
              transition: "stroke-dashoffset 1.2s ease-out 200ms",
            }}
          />
        </svg>
      );
  }
}

export default function EmptyState({
  icon = "generic",
  headline,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[320px] items-center justify-center px-4 py-12">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <div className="mb-2">
          <EmptyIcon type={icon} />
        </div>
        <h3 className="text-lg font-semibold text-fg">{headline}</h3>
        {description && <p className="text-sm text-muted">{description}</p>}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/60 hover:bg-surface2"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
