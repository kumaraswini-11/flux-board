import { requireUnAuth } from "@/lib/auth-guards";
import { OTPForm } from "@/components/auth/otp-form";

export default async function ForgotPasswordPage() {
  await requireUnAuth();

  return <OTPForm />;
}
