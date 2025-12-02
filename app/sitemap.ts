import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/**
 * Next.js automatically generates /sitemap.xml from this file at build time.
 * Purpose: Helps search engines (Google, Bing) discover and index your pages faster.
 * Improves SEO, crawl efficiency, and makes your SaaS (Fluxboard) look professional.
 *
 * Official Docs: https://nextjs.org/docs/app/api-reference/file-conventions/sitemap
 * Vercel Notes: Deploys seamlessly; use 'force-dynamic' for fresh regenerations on Edge.
 *
 * Structure: Return MetadataRoute.Sitemap array.
 * Each item: { url (required, absolute), lastModified (Date, recommended),
 *              changeFrequency (optional: 'always'|'hourly'|'daily'|'weekly'|'monthly'|'yearly'|'never'),
 *              priority (optional: 0.0-1.0, 1.0=highest) }
 *
 * Best Practices:
 * - Use env var for baseUrl (NEXT_PUBLIC_APP_URL) for dev/prod flexibility.
 * - Keep static for speed; make dynamic for user content (e.g., workspaces via Prisma).
 * - Limit: 50k URLs max (Google policy).
 * - Test: Visit /sitemap.xml after bun build && bun start.
 */

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes (Manually defined)
  const staticRoutes: MetadataRoute.Sitemap = [
    // 1. Core marketing pages – highest priority (public, high traffic)
    {
      url: baseUrl, // Homepage – entry point for all users
      lastModified: new Date(), // Fresh timestamp on each build/deploy
      changeFrequency: "daily", // Updates often (hero, CTAs)
      priority: 1.0, // Top importance for crawlers
    },

    // 2. Legal pages: Low change, builds trust
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },

    // 3. Auth pages: Noindex recommended, but include if public
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.3,
    },

    // 4. App pages: Medium priority (index if public; block via robots if gated)
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/members`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic routes: e.g., workspaces/projects (uncomment & implement with Prisma)
  // const dynamicRoutes = await prisma.workspace.findMany({
  //   select: { id: true, updatedAt: true },
  // }).then(workspaces =>
  //   workspaces.map(ws => ({
  //     url: `${baseUrl}/ws/${ws.id}`,
  //     lastModified: new Date(ws.updatedAt),
  //     changeFrequency: 'daily',
  //     priority: 0.7,
  //   }))
  // );

  // Combine static and dynamic routes
  return [...staticRoutes];
}
