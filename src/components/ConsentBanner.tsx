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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          We use cookies for analytics to understand how the site is used. You can accept or
          decline — declining keeps analytics off.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide(false)}
            className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            onClick={() => decide(true)}
            className="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
