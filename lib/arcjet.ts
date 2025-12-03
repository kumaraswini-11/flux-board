import "server-only";
import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";

import { env } from "@/lib/env";

// Create a base Arcjet instance for use by each handler
export const aj = arcjet({
  // Get your site key from https://app.arcjet.com
  // and set it as an environment variable rather than hard coding.
  // See: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
  key: env.ARCJET_KEY,
  characteristics: ["fingerprint"], // Somehow arject track and identify the request, and by default it uses the IP address. But the thing is IP address is easily spoofable.Therefore, in most cases, we really dont wanted to use IP, instead we will use something witch is identifiable and unique to the user. So if dont give this option, it will use IP address by default, but if in futer if i give some thing like user_id, then it will use that instead of IP address to track the request.

  // Define the base rules here. This can also be empty if you want.
  // You could include one or more base rules to run on every request.
  rules: [
    // Protect against common attacks with Arcjet Shield
    shield({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
    }),
  ],
});

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};
