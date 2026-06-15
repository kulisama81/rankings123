"use client";

import { useEffect, useRef, useState } from "react";

const DESIGNS = [
  { key: "court", label: "Court" },
  { key: "broadcast", label: "Broadcast" },
  { key: "classic", label: "Classic" },
] as const;
type Design = (typeof DESIGNS)[number]["key"];

export default function DesignSwitcher() {
  const [design, setDesign] = useState<Design>("court");
  const applied = useRef(false);

  // Sync initial state from the value the pre-paint script set on <html>.
  useEffect(() => {
    setDesign((document.documentElement.dataset.design as Design) || "court");
  }, []);

  // Apply changes to the DOM + persist (DOM mutation belongs in an effect).
  useEffect(() => {
    if (!applied.current) {
      applied.current = true;
      return; // skip the mount run so we don't clobber the stored choice
    }
    document.documentElement.dataset.design = design;
    try {
      localStorage.setItem("design", design);
    } catch {
      /* storage unavailable */
    }
  }, [design]);

  return (
    <div
      className="hidden items-center gap-0.5 rounded-lg bg-surface2 p-0.5 sm:flex"
      role="group"
      aria-label="Site design"
    >
      {DESIGNS.map((d) => (
        <button
          key={d.key}
          onClick={() => setDesign(d.key)}
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
