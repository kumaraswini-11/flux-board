import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins"

import { db } from "./db";
import { env } from "./env";
import { APP_NAME } from "./constants";
import {SendVerificationEmail} from '@/components/send-verification-email';
import { SendOtpEmail } from "@/components/send-otp-email";

// Create and export the Better Auth instance.
// Ensure the instance is named `auth` or exported as the default for proper integration.
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // For Credentials based authentication
  emailAndPassword: {
    enabled: true,
  requireEmailVerification:true,
  },

  // Doute: Not sure its required as we alredy have this with arcjet config
  // rateLimit:{
  //   enabled:true,
  //   max:5,
  //   window:120, // max 5 request on 2 minutes
  // },

  emailVerification:{
    sendOnSignUp:true,
   autoSignInAfterVerification:true, // sign in the user automatically after they successfully verify their email
   sendVerificationEmail: async ({ user, url, token }, request) => {
    // If you dont have a domain resend will not allow you to send mail to any email. 
    // so in devlopment mode you send mail only to your registered email in resend.
      void SendVerificationEmail({
        to: user.email,
        varificationUrl:url,
        userName:user.name,
      });
  }
},

  // For Social based authentication
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID, // Google OAuth Client ID
      clientSecret: env.GOOGLE_CLIENT_SECRET, // Google OAuth Client Secret
      prompt:"select_account" // 
    },
  },

  appName: APP_NAME, // provide your app name. It'll be used as an issuer. This is required to establissh 2FA.
  
  plugins:[
    twoFactor({
      otpOptions:{
        async sendOTP({user,otp}){
          SendOtpEmail({
            to: user.email,
            otp,
          });
        }
      }
    }),
    
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
