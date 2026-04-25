import { SignUpForm } from "@/components/auth/sign-up-form";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function SignUpPage() {
  await requireUnAuth();

  return <SignUpForm />;
}
