/**
 * Rankings123 Logo & Wordmark
 * Signature: Live dot integrated into the "1" in "123"
 */

interface LogoProps {
  variant?: "full" | "compact" | "icon";
  className?: string;
}

export default function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "icon") {
    // Favicon/icon version: simplified mark
    return (
      <svg
        viewBox="0 0 32 32"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical bar (the "1") */}
        <rect x="6" y="14" width="4" height="12" rx="1" className="fill-fg" />

        {/* Live dot outer pulse */}
        <circle cx="8" cy="11" r="4" className="fill-accent opacity-60">
          <animate
            attributeName="r"
            values="4;5.5;4"
            dur="1.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Live dot inner solid */}
        <circle cx="8" cy="11" r="2.5" className="fill-accent" />

        {/* "23" simplified */}
        <text
          x="14"
          y="24"
          className="fill-fg font-display"
          fontSize="14"
          fontWeight="700"
        >
          23
        </text>
      </svg>
    );
  }

  if (variant === "compact") {
    // Compact: R123 with integrated dot
    return (
      <svg
        viewBox="0 0 80 32"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* "R" */}
        <text
          x="0"
          y="24"
          className="fill-fg font-display"
          fontSize="20"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          R
        </text>

        {/* Vertical bar (the "1") with integrated dot */}
        <rect x="20" y="12" width="4" height="12" rx="1" className="fill-fg" />

        {/* Live dot outer pulse */}
        <circle cx="22" cy="8" r="4" className="fill-accent opacity-60">
          <animate
            attributeName="r"
            values="4;5.5;4"
            dur="1.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="8" r="2.5" className="fill-accent" />

        {/* "23" */}
        <text
          x="28"
          y="24"
          className="fill-accent font-display"
          fontSize="20"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          23
        </text>
      </svg>
    );
  }

  // Full wordmark: "RANKINGS" + "123" with integrated live dot
  return (
    <svg
      viewBox="0 0 180 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "RANKINGS" - small caps, tracked */}
      <text
        x="0"
        y="12"
        className="fill-fg opacity-70 font-display"
        fontSize="10"
        fontWeight="600"
        letterSpacing="1.5"
      >
        RANKINGS
      </text>

      {/* Vertical bar (the "1") - this is the signature element */}
      <rect x="2" y="20" width="6" height="16" rx="2" className="fill-fg" />

      {/* Live dot outer pulse layer */}
      <circle cx="5" cy="15" r="5" className="fill-accent opacity-60">
        <animate
          attributeName="r"
          values="5;7;5"
          dur="1.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0.2;0.6"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Live dot inner solid layer */}
      <circle cx="5" cy="15" r="3" className="fill-accent" />

      {/* "23" - accent color, oversized */}
      <text
        x="14"
        y="36"
        className="fill-accent font-display"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-1"
      >
        23
      </text>
    </svg>
  );
}
