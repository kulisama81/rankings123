"use client";

import { useEffect, useState } from "react";

const DESIGNS = [
  { key: "court", label: "Court" },
  { key: "broadcast", label: "Broadcast" },
  { key: "classic", label: "Classic" },
] as const;
type Design = (typeof DESIGNS)[number]["key"];

export default function DesignSwitcher() {
  const [design, setDesign] = useState<Design>("court");

  useEffect(() => {
    const current = (document.documentElement.dataset.design as Design) || "court";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the DOM value set pre-paint
    setDesign(current);
  }, []);

  function choose(d: Design) {
    document.documentElement.setAttribute("data-design", d);
    try {
      localStorage.setItem("design", d);
    } catch {
      /* storage unavailable */
    }
    setDesign(d);
  }

  return (
    <div
      className="hidden items-center gap-0.5 rounded-lg bg-surface2 p-0.5 sm:flex"
      role="group"
      aria-label="Site design"
    >
      {DESIGNS.map((d) => (
        <button
          key={d.key}
          onClick={() => choose(d.key)}
          aria-pressed={design === d.key}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
            design === d.key ? "bg-accent text-accentfg" : "text-muted hover:text-fg"
          }`}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}
