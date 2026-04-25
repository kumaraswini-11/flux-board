import { requireUnAuth } from "@/lib/auth-utils";
import { OTPForm } from "@/components/auth/otp-form";

export default async function ForgotPasswordPage() {
  await requireUnAuth();

  return <OTPForm />;
}
