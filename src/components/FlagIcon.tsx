"use client";

import { IOC_TO_ISO2 } from "@/lib/flags";

interface FlagIconProps {
  /**
   * Country code - either IOC 3-letter (e.g., "USA") or ISO 2-letter (e.g., "US")
   */
  code: string;
  /**
   * Size preset or custom dimensions
   */
  size?: "sm" | "md" | "lg" | { width: number; height: number };
  /**
   * Optional CSS class for additional styling
   */
  className?: string;
  /**
   * Country name for accessibility (auto-generated if not provided)
   */
  ariaLabel?: string;
}

/**
 * Premium SVG flag component with subtle depth treatment.
 * Replaces emoji flags with crisp, theme-aware SVG rendering.
 *
 * Design: 4:3 aspect ratio with subtle rounded corners (3px), definition border,
 * and micro depth treatment (inner highlight + soft shadow) for premium feel.
 */
export default function FlagIcon({ code, size = "md", className = "", ariaLabel }: FlagIconProps) {
  // Convert IOC 3-letter to ISO 2-letter if needed
  const iso2 = code.length === 3
    ? (IOC_TO_ISO2[code.toUpperCase()] || "").toLowerCase()
    : code.toLowerCase();

  // Fallback to neutral flag if code is invalid
  if (!iso2) {
    return (
      <span
        className={`inline-block text-muted/40 ${className}`}
        aria-label="Unknown country"
        role="img"
      >
        🏳️
      </span>
    );
  }

  // Size presets (4:3 aspect ratio)
  const dimensions = typeof size === "object"
    ? size
    : size === "sm"
      ? { width: 14, height: 10.5 }
      : size === "lg"
        ? { width: 20, height: 15 }
        : { width: 16, height: 12 }; // md default

  // Generate accessible label from country code if not provided
  const label = ariaLabel || `${iso2.toUpperCase()} flag`;

  return (
    <span
      className={`fi-icon inline-block ${className}`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
      role="img"
      aria-label={label}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/flags/${iso2}.svg`}
        alt=""
        className="fi-flag"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "3px",
          border: "0.5px solid var(--color-border-edge)",
          display: "block",
          // Subtle depth treatment: inner highlight + soft shadow
          boxShadow: "inset 0 0.5px 1px rgba(255,255,255,0.15), 0 0.5px 1px rgba(0,0,0,0.2)",
        }}
      />
    </span>
  );
}
