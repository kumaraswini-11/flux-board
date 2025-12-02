import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

/**
 * Next.js automatically serves this file as /robots.txt.
 * Official docs: https://nextjs.org/docs/app/api-reference/file-conventions/robots
 *
 * This configuration:
 * - Blocks AI crawlers (GPTBot, ClaudeBot, Google-Extended, etc.)
 * - Allows standard search engines to index public marketing pages
 * - Disallows access to private app routes (/dashboard, /ws/*, /settings, etc.)
 * - Ensures all references follow HTTPS
 * - Is fully compatible with Vercel, Netlify, and Cloudflare Pages
 *
 * Keep this file STATIC → fastest cold starts and lowest cost.
 * Because robots.txt rarely changes, we avoid using `export const dynamic = "force-dynamic"`.
 * (You can enable it if you truly need runtime behavior.)
 */

export default function robots(): MetadataRoute.Robots {
  return {
    // Basic rules: Apply to all user agents
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/*',
      crawlDelay: 2, // Be nice to crawlers - Seconds between requests – polite to servers (optional, non-standard)
    },

    // Always point to the correct sitemap (Google loves this)
    sitemap: `${env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  }
}