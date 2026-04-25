import { emailFrom, resend } from "@/lib/resend";
import OtpEmailTemplate from "@/components/email-templates/otp-email-template";

export async function SendOtpEmail({
    to,
    otp,
  }: {
    to: string;
    otp: string;
  }) {
    const { data, error } = await resend.emails.send({
  from: emailFrom,
    to: to,
    subject: 'FluxBoard - Two Factor Authentication Otp',
    react: <OtpEmailTemplate  otp={otp} />
  });
  }