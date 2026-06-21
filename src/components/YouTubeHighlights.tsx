"use client";

import { useState } from "react";
import Image from "next/image";

interface YouTubeHighlightsProps {
  videoId: string;
  title: string;
}

export default function YouTubeHighlights({ videoId, title }: YouTubeHighlightsProps) {
  const [showIframe, setShowIframe] = useState(false);

  const handlePlay = () => {
    // Check consent - must match ConsentBanner.tsx key
    const hasConsent = typeof window !== "undefined" && localStorage.getItem("cookie-consent") === "granted";

    if (!hasConsent) {
      // No consent - don't load iframe
      console.info("YouTube embed requires cookie consent");
      return;
    }

    // Fire GA4 event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "video_play", {
        video_title: title,
        video_id: videoId,
      });
    }

    setShowIframe(true);
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="mt-8">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
        Watch Highlights
      </h3>
      <div className="relative overflow-hidden rounded-2xl bg-surface2 shadow-sm">
        {/* Fixed 16:9 aspect ratio container */}
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          {!showIframe ? (
            // Facade: thumbnail + play button
            <button
              onClick={handlePlay}
              className="group absolute inset-0 w-full h-full cursor-pointer border-0 bg-transparent p-0 transition"
              aria-label={`Play ${title}`}
            >
              {/* Thumbnail */}
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                unoptimized
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accentfg shadow-lg transition group-hover:scale-110">
                  <svg
                    className="ml-1 h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          ) : (
            // Iframe: loaded on click
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}
