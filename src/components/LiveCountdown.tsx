"use client";

import { useEffect, useState } from "react";

interface Props {
  targetTime: Date;
  label?: string;
}

export default function LiveCountdown({ targetTime, label = "Expected finish" }: Props) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        setTimeRemaining("Race finished");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  if (!timeRemaining) return null;

  return (
    <div className="rounded-2xl border border-edge bg-surface p-6">
      <p className="mb-2 text-sm uppercase tracking-wide text-muted">{label}</p>
      <p className={`text-3xl font-bold ${isPast ? "text-muted" : "text-accent"}`}>
        {timeRemaining}
      </p>
    </div>
  );
}
