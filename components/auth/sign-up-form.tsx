"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { cn } from "@/lib/utils";
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
// Define the sign-up validation schema
const signUpFormSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password must be at most 36 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Why use the useTransition hook when we can achieve similar results with useState? There are some important differences. For example, if I need to use the revalidatePath function later to revalidate our cache, the normal state hook (useState) doesn’t account for this. It will stop the pending state too early. So, while the code still runs, the pending state won’t work correctly.
  const [isGooglePending, startGoogleTransition] = useTransition();

  // Initialize the TanStack Form with default values and validation
  const signUpForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signUpFormSchema,
      // onDynamic: signUpFormSchema,
    },
    // validationLogic: revalidateLogic({
    //   mode: "submit",
    //   modeAfterSubmission: "blur",
    // }),
    onSubmit: async ({ value, meta }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500));
      console.log("SignUpForm ::", value);
      console.log("signUpFormSchema ::", signUpFormSchema.parse(value));
      console.log("meta ::", meta);
      toast.success("You have signed up!");
    },
  });

  // Handle Google sign-up with transition for smooth UX
  const handleGoogleSignUp = () => {
    startGoogleTransition(async () => {
      // Simulate OAuth flow (replace with real Google sign-up logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Google sign in successful!");
    });
  };

  // Unified pending from form (covers email/password submit)
  const isPending = signUpForm.state.isSubmitting || isGooglePending;

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Get Started</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              signUpForm.handleSubmit();
            }}
          >
            {/* FieldGroup handles the spacing (gap-7) for the whole stack */}
            <FieldGroup>
              {/* 1. Social sign-up Section */}
              <Field>
                <Button
                  variant="outline"
                  type="button" // Important: prevent form submit
                  onClick={handleGoogleSignUp}
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
                  Sign up with Google
                </Button>
                {/* <Button variant="outline" type="button">
                  <Image
                    src="/github.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                  Sign in with GitHub
                </Button> */}
              </Field>

              {/* 2. Separator - Direct child of FieldGroup for correct spacing */}
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {/* 3. Email Field */}
              <signUpForm.Field
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
              <signUpForm.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
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

              {/* 5. Confirm password field */}
              <signUpForm.Field
                name="confirmPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Confirm your password"
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
            <signUpForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  form="signup-form"
                  disabled={!canSubmit || isPending} // Disable if the form is invalid OR if any async transition is running
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              )}
            />
            {/* FieldDescription is also OUTSIDE Subscribe as it doesn't change state */}
            <FieldDescription className="text-center">
              Already have an account? <Link href="/sign-in">Sign in</Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#" tabIndex={isPending ? -1 : 0}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" tabIndex={isPending ? -1 : 0}>
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
