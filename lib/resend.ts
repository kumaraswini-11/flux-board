import "server-only";
import { Resend } from "resend";

import { env } from "@/lib/env";

export const resend = new Resend(env.RESEND_API_KEY);

// As we dont have domain, resend only allows to send mail form 'onboarding@resend.dev'
export const emailFrom = `FluxBoard ${env.EMAIL_FROM}`;
