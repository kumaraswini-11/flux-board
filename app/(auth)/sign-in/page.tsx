import { requireUnAuth } from "@/lib/auth-utils";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  await requireUnAuth();

  return <SignInForm />;
}
