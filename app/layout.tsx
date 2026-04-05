import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Distilled | Compute Less. Create More.",
  description: "Stop paying the \"redundancy tax.\" Distilled is the stealth intelligence layer that prunes AI context locally, slashing token costs and latency before the prompt ever leaves your machine.",
  keywords: [
    "AI Efficiency",
    "Token Optimization",
    "Privacy-First DevTools",
    "Edge Compute",
    "Starky Labs",
    "Distilled",
    "Software Application"
  ],
  authors: [{ name: "Starky Labs", url: "https://distilled.starkylabs.com" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://distilled.starkylabs.com",
    title: "Distilled | Compute Less. Create More.",
    description: "Stop paying the \"redundancy tax.\" Distilled is the stealth intelligence layer that prunes AI context locally, slashing token costs and latency before the prompt ever leaves your machine.",
    siteName: "Distilled by Starky Labs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Distilled by Starky Labs",
    "operatingSystem": "Cross-platform",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Distilled by Starky Labs is a privacy-first DevTool focusing on AI efficiency and token optimization through edge compute.",
    "publisher": {
      "@type": "Organization",
      "name": "Starky Labs",
      "url": "https://distilled.starkylabs.com"
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
