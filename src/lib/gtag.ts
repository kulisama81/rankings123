// Google Analytics 4 Measurement ID. Public by design (ships to the client);
// overridable per-environment via NEXT_PUBLIC_GA_ID.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-GDM8YNM3SM";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
