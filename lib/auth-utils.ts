import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

/**
 * As per the "better-auth", using  middleware (proxy.ts) is not secure!
 * Middleware is the recommended approach to optimistically redirect users.
 * We recommend handling auth checks in each page/route.
 * 
 * https://www.better-auth.com/docs/integrations/next#server-action-cookies
 * https://www.better-auth.com/docs/integrations/next#how-to-handle-auth-checks-in-each-pageroute
 */

/**
 * Optional: Get current session without redirecting, using headers — SSR only
 * Useful for conditional rendering in server components.
 */
export async function getCurrentSession() {
  return await auth.api.getSession({
    headers: await headers(), // headers" is an async function that allows you to read the HTTP incoming request headers from a Server Component.
  });
}

/**
 * Ensures the user is authenticated.
 * If not, redirects to the sign-in page.
 *
 * Use this in server components, route handlers, or server actions
 * where authentication is required (e.g., /dashboard, /profile).
 */
export async function requireAuth() {
  const session = await getCurrentSession();

  // If session doesn't exist, perform a server-side redirect
  if (!session) {
    redirect("/sign-in"); // According to the docs, no `return` is needed — redirect() throws internally
  }

  // Type-safe return: session is guaranteed to have a user
  return session as NonNullable<typeof session>;
}

/**
 * Ensures the user is NOT authenticated (guest-only routes).
 * If authenticated, redirects to the Home.
 *
 * Use this for public pages like /sign-in, /sign-up, /pricing, etc.
 */
export async function requireUnAuth() {
  const session = await getCurrentSession();

  if (session) {
    redirect("/");
  }

  // Session might be null or may have session without user — both are fine for guest routes
  return session;
}
