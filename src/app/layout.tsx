import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import Nav from "@/components/Nav";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Distinctive sporty display face for headings / hero (not Inter/Roboto/Arial).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rankings123.com"),
  title: {
    default: "Rankings123 — Live Sports Rankings",
    template: "%s | Rankings123",
  },
  description:
    "Live sports rankings: real-time ATP & WTA tennis rankings during tournaments, FIFA World Cup 2026 group standings, cycling, and more.",
  openGraph: {
    type: "website",
    siteName: "Rankings123",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'dark'}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
      >
        <Analytics />
        <Nav />
        <main>{children}</main>
        <ConsentBanner />
      </body>
    </html>
  );
}
