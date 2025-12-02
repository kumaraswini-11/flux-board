import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { env } from "@/lib/env";
import "./globals.css";

// 1. Optimize Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Best practice for LCP (Largest Contentful Paint)
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// 2. Viewport (Correct location for Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allows reasonable zoom for accessibility
  userScalable: true, // Enables scaling (remove if PWA zoom issues)
  colorScheme: "dark",
  themeColor: [
    // Added: For mobile browser tinting (docs recommend media queries)
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// 3. Metadata
export const metadata: Metadata = {
  // Critical: Fixes OG/Twitter image URLs in production (Vercel, custom domain, etc.)
  metadataBase: env.NEXT_PUBLIC_BASE_URL,

  // Branded title template: Default for root, "%s | Fluxboard" for child pages (50–60 chars optimal)
  title: {
    default: "Fluxboard – Blazing-Fast Project Management",
    template: "%s | Fluxboard", // Auto-applies to all child pages
  },

 // Compelling meta description: 150–160 chars, keyword-focused for snippets
  description: 'Real-time Kanban boards, unlimited workspaces, and powerful analytics. The fastest way modern teams ship products — without the Jira complexity.',

  // Optional but helpful for discoverability
  keywords: [
    "kanban",
    "project management",
    "real-time collaboration",
    "saas",
    "nextjs",
    "productivity",
    "agile",
    "workflow",
  ],

  // Open Graph: Core for social previews (FB, LinkedIn, Discord etc.); share siteName & locale for consistency
  openGraph: {
    title: "Fluxboard – Blazing-Fast Project Management",
    description: "The board where flow never stops. Real-time, beautiful, and built for speed.",
    url: env.NEXT_PUBLIC_BASE_URL,
    siteName: "Fluxboard",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",        // Auto-prefixed to full URL via metadataBase → https://flux-board.com/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Fluxboard Dashboard – Clean Kanban with Real-Time Sync",
      },
    ],
  },

  // Twitter Card (X) – Use summary_large_image for best visibility
  twitter: {
    card: "summary_large_image",
    title: "Fluxboard – Blazing-Fast Project Management",
    description: "The board where flow never stops. Real-time, beautiful, and fast.",
    creator: "@fluxboard",         
    images: ["/og-image.jpg"],     
  },

  // Robots: Allow full indexing/follow; generous Google directives for rich results (no limits on snippets/videos)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",   // Shows big rich previews in Google
      "max-snippet": -1,              // No snippet length limit
    },
  },

  // Canonical URL – Critical for SEO (prevents duplicate content)
  alternates: {
    canonical: env.NEXT_PUBLIC_BASE_URL,
  },

  // Optional: For PWA/cross-platform: Add multiple sizes via numbered files (e.g., icon.32.png) and auto-injected via /manifest.json
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 4. suppressHydrationWarning is REQUIRED for next-themes to work without errors
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
