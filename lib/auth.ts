import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
// import { twoFactor } from "better-auth/plugins"

import { db } from "./db";
import { env } from "./env";
import { APP_NAME } from "./constants";

// Create and export the Better Auth instance.
// Ensure the instance is named `auth` or exported as the default for proper integration.
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // For Credentials based authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // by default it is true
  },

  // For Social based authentication
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID, // Google OAuth Client ID
      clientSecret: env.GOOGLE_CLIENT_SECRET, // Google OAuth Client Secret
    },
  },

  appName: APP_NAME, // provide your app name. It'll be used as an issuer. This is required to establissh 2FA.
  
  plugins:[
    // twoFactor(),
    
    // make sure this is the last plugin in the array
    nextCookies() 
  ],
  
  // https://www.better-auth.com/docs/guides/optimizing-for-performance
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
  },
});
