import type { MetadataRoute } from "next";

/**
 * Web App Manifest — automatically served as /manifest.json.
 *
 * Purpose:
 * - Makes Fluxboard installable as a PWA on mobile and desktop.
 * - Provides metadata describing how the app should behave when installed.
 * - Controls splash screens, icons, theme colors, and the overall app-like experience.
 * - Defines essential information such as app name, icons, start URL, display mode, and colors.
 *
 * References:
 * - Next.js docs (Manifest file convention):
 *   https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 *
 * - Web App Manifest spec & PWA requirements:
 *   https://web.dev/articles/manifest
 */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fluxboard",
    short_name: "Flux", // Used when space is limited (homescreen label)
    description:
      "The board where flow never stops. Blazing-fast project management with real-time Kanban, workspaces, and analytics.",
    start_url: "/?source=pwa", // Always start at root; ?source=pwa helps track PWA installs (optional but recommended)
    display: "standalone", // Hides browser UI (recommended for app-like feel)
    orientation: "any",
    background_color: "#fff",
    theme_color: "amber-500",
    lang: "en",
    dir: "ltr",
    categories: ["productivity", "business", "project management"], // Categories help app stores & browsers classify your PWA
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      // Standard PWA sizes (auto-used by Android/Chrome/iOS)
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
