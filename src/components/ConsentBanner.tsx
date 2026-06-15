"use client";

import { useEffect, useState } from "react";

// Minimal GDPR consent banner. Shows until the visitor chooses; the choice is
// persisted and flips Google Consent Mode (analytics/ads storage) accordingly.
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("cookie-consent");
    } catch {
      /* localStorage unavailable */
    }
    if (!stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount read; hydration-safe (banner is hidden on the server)
      setVisible(true);
    }
  }, []);

  function decide(granted: boolean) {
    try {
      localStorage.setItem("cookie-consent", granted ? "granted" : "denied");
    } catch {
      /* localStorage unavailable */
    }
    window.gtag?.(
      "consent",
      "update",
      granted
        ? {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
            analytics_storage: "granted",
          }
        : { ad_storage: "denied", analytics_storage: "denied" }
    );
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-edge bg-surface/95 px-4 py-4 shadow-lg backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          We use cookies for analytics to improve the site (on by default). You can opt out
          anytime, or accept to also allow ads.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide(false)}
            className="rounded-lg border border-edge px-4 py-1.5 text-sm font-medium text-fg transition hover:bg-surface2"
          >
            Decline
          </button>
          <button
            onClick={() => decide(true)}
            className="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-accentfg transition hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
