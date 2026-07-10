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
      className="btn-base btn-ghost btn-icon shrink-0 rounded-lg border border-edge text-lg"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
