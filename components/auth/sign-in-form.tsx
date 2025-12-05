"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

// This component is built using shadcn/ui (Field Component), TanStack Form, and Zod v4.

// Define the schema outside the component to prevent re-creation on render
// Define the sign-in validation schema
const signInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(36, "Password must be at most 36 characters"),
});

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  // Why use the useTransition hook when we can achieve similar results with useState? There are some important differences. For example, if I need to use the revalidatePath function later to revalidate our cache, the normal state hook (useState) doesn’t account for this. It will stop the pending state too early. So, while the code still runs, the pending state won’t work correctly.
  const [isGooglePending, startGoogleTransition] = useTransition();

  // Initialize the TanStack Form with default values and validation
  const signInForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInFormSchema,
    },
    onSubmit: async ({ value, meta }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("SignInForm ::", value);
      console.log("signInFormSchema ::", signInFormSchema.parse(value));
      console.log("meta ::", meta);
      toast.success("You have signed in!");
    },
  });

  // Handle Google sign-in with transition for smooth UX
  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      // Simulate OAuth flow (replace with real Google sign-in logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Google sign in successful!");
    });
  };

  // Unified pending from form (covers email/password submit)
  const isPending = signInForm.state.isSubmitting || isGooglePending;

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in with your Google account or email
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signin-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            signInForm.handleSubmit();
          }}
        >
          {/* FieldGroup handles the spacing (gap-7) for the whole stack */}
          <FieldGroup>
            {/* 1. Social Sign-in Section */}
            <Field>
              <Button
                variant="outline"
                type="button" // Important: prevent form submit
                onClick={handleGoogleSignIn}
                disabled={isPending}
              >
                {isGooglePending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                )}
                Sign in with Google
              </Button>
            </Field>

            {/* 2. Separator - Direct child of FieldGroup for correct spacing */}
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>

            {/* 3. Email Field */}
            <signInForm.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="a@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={isPending}
                      required
                    />
                    <FieldDescription>
                      We&apos;ll never share your email.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* 4. Password Field */}
            <signInForm.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm underline-offset-4 hover:underline"
                        tabIndex={isPending ? -1 : 0} // Disable tab index when pending
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isPending}
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        {/* Field is OUTSIDE Subscribe to prevent unnecessary re-renders of the Field wrapper/layout */}
        <Field>
          {/* Subscribe wraps ONLY the elements that need real-time state updates (Button) */}
          <signInForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                form="signin-form"
                disabled={!canSubmit || isPending} // Disable if the form is invalid OR if any async transition is running
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            )}
          />
          {/* FieldDescription is also OUTSIDE Subscribe as it doesn't change state */}
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
