# Codebase Decisions & Architecture Notes

This document summarizes all major and minor decisions made during the development of the project — from architectural choices to tool selection and implementation details. It serves as a reference for future development, onboarding, or retrospectives.

1. Two key benefits of using the Next.js `Link` component over a standard `<a>` tag are **prefetching** and **client-side navigation**.
   - **Automatic Prefetching:** The `<Link>` component in Next.js automatically prefetches the linked page's resources when the link becomes visible in the viewport. This happens in the background, allowing the linked page to load almost instantly when the user clicks. Prefetching is enabled by default in production builds and can be disabled using the `prefetch={false}` prop.
   - **Client-Side Navigation:** Unlike a traditional `<a>` tag, which causes a full page reload, the `<Link>` component enables client-side navigation. When a user clicks a `<Link>`, Next.js intercepts the event and loads the new page using JavaScript. This avoids a full page refresh, preserves application state, and results in faster, smoother transitions.

2. I chose `better-auth` for authentication in this project. While `auth.js` is a solid option, I found `better-auth` easier to work with thanks to its clearer documentation and stronger community support. I also considered `kinde`, which is well-suited for B2B production environments. However, since this project targets B2C users and doesn't require advanced features like `multi-factor authentication`, `SSO`, or `roles and permissions`, `better-auth` was a more practical and lightweight choice.

3. I Chose `Prisma` Over `Drizzle` ORM. While both `Prisma` and `Drizzle` are great ORMs, I chose `Prisma` because it is a relatively high-level ORM and generally easier to work with. On the other hand, `Drizzle` is more low-level, which means you need to have a better understanding of SQL to use it effectively. Additionally, at the time of building this project, `Drizzle` was undergoing a major rewrite for its version 1 release, which made `Prisma` a more stable and practical choice.

4. When using Prisma with Next.js, it's important to avoid creating multiple instances of the Prisma Client during development. This can happen because Next.js, by default, hot-reloads and re-executes code on every file change, which can lead to new Prisma Client instances being created repeatedly.
   - 🔗 Learn more: <https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help>

5. I have used `T3 ENV` into this project to manage and validate environment variables in a type-safe, secure, and developer-friendly way.
   - 📄 For more information, visit the official docs: <https://env.t3.gg>

6. Why use the `useTransition` hook instead of just `useState` when both seem to manage similar states? The main difference lies in how they handle pending states during updates, especially when dealing with tasks like cache revalidation.
   - When you use `useState` to track loading or pending states, it immediately stops the pending state as soon as the state update completes. However, if you are using functions like `revalidatePath` to refresh or revalidate cached data after an update, this can happen after the state update finishes. Since `useState` doesn’t know about these extra background tasks, it will stop showing the loading state too early—even though the full process is not finished.
   - On the other hand, `useTransition` is designed for this kind of scenario. It lets you mark certain state updates as “transitions” that may take longer, allowing React to keep track of whether the update is still pending. This means the pending state stays active until all related tasks, including cache revalidation, are completed. As a result, your UI can accurately reflect when work is still in progress, improving user experience by showing loaders or disabling buttons only when necessary.

7. **Use Server Components by default in Next.js whenever possible**. Only add 'use client' when you truly need interactivity or browser-only APIs. This ensures bots can instantly see the full HTML—including the correct URL, title, meta tags, and content—without requiring JavaScript. The result is better SEO, more accurate link previews, a smaller bundle size, and no unnecessary JavaScript downloads or hydration overhead from Client Components.
