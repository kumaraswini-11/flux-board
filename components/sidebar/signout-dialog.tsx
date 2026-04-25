"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { Route } from "next";
import { Spinner } from "@/components/spinner";

interface SignOutAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectTo?: string;
}

export function SignOutAlertDialog({
  open,
  onOpenChange,
  redirectTo = "/sign-in",
}: SignOutAlertDialogProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async (e: React.MouseEvent) => {
    // Prevent the dialog from closing immediately so we can handle the async logic
    e.preventDefault();

    setIsPending(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          onOpenChange(false);
          router.push(redirectTo as Route);
          router.refresh(); // Recommended: refreshes server components to clear stale auth state
        },
        onError: (ctx) => {
          console.error("Sign out error:", ctx.error);
          toast.error(
            ctx.error.message || "Failed to sign out. Please try again."
          );
          setIsPending(false);
        },
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will end your current session. You will need to log back in to
            access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Spinner />
                Signing out...
              </>
            ) : (
              "Sign Out"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
