import VarificationEmailTemplate from "@/components/email-templates/varification-email-template";
import { emailFrom, resend } from "@/lib/resend";

export async function SendVerificationEmail({
    to,
    varificationUrl,
    userName,
  }: {
    to: string;
    varificationUrl: string;
    userName: string;
  }) {
    const { data, error } = await resend.emails.send({
  from: emailFrom,
    to: to,
    subject: 'FluxBoard - Verify your email address',
    react: <VarificationEmailTemplate userName={userName} varificationUrl={varificationUrl} />
  });
  }