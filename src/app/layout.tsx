import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <Nav />
        <main>{children}</main>
        <ConsentBanner />
      </body>
    </html>
  );
}
