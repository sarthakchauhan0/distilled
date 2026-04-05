import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Distilled by Starky Labs | The Edge Native DevTool",
  description: "Experience the fastest, most efficient building with Distilled by Starky Labs. We deliver token optimization and privacy-first DevTools right at the edge.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://distilled.starkylabs.com",
    title: "Distilled by Starky Labs | The Edge Native DevTool",
    description: "Experience the fastest, most efficient building with Distilled by Starky Labs. We deliver token optimization and privacy-first DevTools right at the edge.",
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
