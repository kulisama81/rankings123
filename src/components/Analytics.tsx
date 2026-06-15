import Script from "next/script";
import { GA_ID } from "@/lib/gtag";

// GA4 via gtag.js with Google Consent Mode v2. Analytics/ads storage default to
// "denied" (GDPR-safe), and are granted only after the visitor accepts in the
// consent banner. A returning visitor who already accepted is restored to granted.
export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('cookie-consent') === 'granted') {
              gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
              });
            }
          } catch (e) { /* localStorage unavailable */ }
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
