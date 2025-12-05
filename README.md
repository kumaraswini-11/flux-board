# Fluxboard

**The board where flow never stops.**  
A beautiful, blazing-fast, modern project management tool built for teams that actually ship.

Live demo → <https://fluxboard.vercel.app>

## Features

- Workspaces & Projects with RBAC (Owner / Admin / Member / Guest)
- Real-time Kanban boards (smooth drag-and-drop via dnd-kit)
- List • Calendar • Timeline views
- Rich tasks: subtasks, comments, attachments, labels, priority, due dates, assignees
- Backlog + Sprint planning
- Activity feed & Analytics (velocity, burndown, member stats)
- Team invites via magic link or email
- Free + Pro plans (powered by Opera Payments)
- Light & Dark mode (default)
- 100 % TypeScript • Fully type-safe end-to-end

## Tech Stack

- **Next.js 16** (App Router + React Server Components)
- **React 19** (React Compiler enabled)
- **TypeScript** (strict)
- **Tailwind CSS** + **shadcn/ui**
- **Better-Auth** (email/password + Google/GitHub + magic links)
- **Prisma ORM** + **Neon Serverless Postgres** + **Prisma Accelerate**
- **Zustand** (lightweight global state)
- **Opera Payments** (payment & subscriptions)
- **Sentry** (error + performance monitoring)
- **UploadThing** (file uploads)
- **Pusher / Supabase Realtime** (instant updates)
- **Bun** runtime (4× faster installs & dev server)
- **Biome** (linting/formatting)
- **CodeRabbit** (automated AI PR reviews)
- **Arcjet**
- **T3 Env**
- **TRPC (TypeScript Remote Procedure Calls)** + **React Query**

## Quick Start

```bash
git clone https://github.com/yourusername/fluxboard.git
cd fluxboard

# Install dependencies (Bun is 4–8× faster than npm/yarn/pnpm)
bun install

# Copy env example and fill your keys
cp .env.example .env.local

# Push Prisma schema and run migrations
bunx prisma db push
bunx prisma generate

# Seed initial data (creates demo workspace + sample tasks)
bun run seed

# Run dev server (Turbopack powered)
bun dev

> Open http://localhost:3000
```

## Referance

- Application logo inspired by → [LogoIpsum](https://logoipsum.com)
- Generated favicons and icons using → [RealFaviconGenerator](https://realfavicongenerator.net/)
- Preview OpenGraph metadata using → [OpenGraph Preview](https://www.opengraph.xyz/)
<!-- - UI Reference video → [YouTube](https://www.youtube.com/watch?v=Av9C7xlV0fA) -->

## License

MIT © 2025 Your Name · Feel free to use commercially or as a starter.
