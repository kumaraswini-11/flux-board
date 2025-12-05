import { requireUnAuth } from "@/lib/auth-guards";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  await requireUnAuth();

  return <SignInForm />;
}
