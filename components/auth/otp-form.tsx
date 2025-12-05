"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Define the component signature, extending Card props for flexibility
export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  const OTP_LENGTH = 6;

  // 1. Get the email from URL search parameters (e.g., /verify-otp?email=user@example.com)
  const params = useSearchParams();
  const email = params.get("email");

  // 2. State to store the user-entered OTP value
  const [otp, setOtp] = useState("");

  // 3. useTransition hook for managing pending state during OTP verification
  const [isOtpVerifying, startOtpVerificationTransition] = useTransition();

  /**
   * Handles the submission of the OTP form.
   * Uses startOtpVerificationTransition for a non-blocking UI update during the async operation.
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleVerifyOtp = (event: React.FormEvent) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Check if OTP is complete before starting the verification process
    if (otp.length !== OTP_LENGTH) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    startOtpVerificationTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("OTP verified successfully!", otp);
      toast.success("OTP verified successfully! Redirecting...");
    });
  };

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>
          We sent a verification code to your <strong>{email}</strong>. This
          code will expire in next 5 minutes.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="otp-form" onSubmit={handleVerifyOtp}>
          <FieldGroup>
            <Field>
              {/* Field Label: Screen reader only for accessibility */}
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>

              <InputOTP
                maxLength={OTP_LENGTH}
                id="otp"
                value={otp}
                onChange={setOtp}
                required
              >
                {/* InputOTPGroup for styling the slots */}
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  {/* Map over the length to render the required number of slots */}
                  {Array.from({ length: OTP_LENGTH }, (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {/* Description for user guidance */}
              <FieldDescription className="text-center">
                Enter the {OTP_LENGTH}-digit code sent to your email.
              </FieldDescription>
            </Field>

            {/* Submit Button */}
            <Button
              type="submit" // Type submit is best for forms
              form="otp-form" // Explicitly link to the form element
              onClick={handleVerifyOtp}
              disabled={isOtpVerifying || otp.length !== OTP_LENGTH}
            >
              {isOtpVerifying ? "Verifying..." : "Verify"}
            </Button>

            {/* Resend Link */}
            <FieldDescription className="text-center">
              Didn&apos;t receive the code? <a href="#">Resend</a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
