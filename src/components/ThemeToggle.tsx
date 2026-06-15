"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as "dark" | "light") || "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync state from the DOM theme set pre-paint
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark / light theme"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-edge text-muted transition hover:bg-surface2 hover:text-fg"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
