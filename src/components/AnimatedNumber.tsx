"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Apple Sports-style live number: counts up/down to the new value and briefly
 * flashes green (up) / red (down) when it changes during a refresh.
 */
export default function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    if (value === from) return;
    prev.current = value;

    const dir: "up" | "down" = value > from ? "up" : "down";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- animation trigger on value change
    setFlash(dir);

    const start = performance.now();
    const duration = 600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    const clear = setTimeout(() => setFlash(null), 700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(clear);
    };
  }, [value]);

  const flashCls = flash === "up" ? "text-up" : flash === "down" ? "text-down" : "";
  return (
    <span className={`tabular-nums transition-colors duration-300 ${flashCls} ${className ?? ""}`}>
      {display.toLocaleString()}
    </span>
  );
}
