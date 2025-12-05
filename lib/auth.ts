import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "./db";
import { env } from "./env";

// Create and export the Better Auth instance.
// Ensure the instance is named `auth` or exported as the default for proper integration.
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID, // Google OAuth Client ID
      clientSecret: env.GOOGLE_CLIENT_SECRET, // Google OAuth Client Secret
    },
  },
});
