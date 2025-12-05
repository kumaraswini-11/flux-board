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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";

export function SignOutAlertDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle sign-out process
  const handleSignOut = async () => {
    setIsProcessing(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You've been signed out successfully.");
          onOpenChange(false); // Close dialog
          router.push("/sign-in");
        },
        onError: (error) => {
          console.error("Sign out error:", error);
          toast.error("Failed to sign out");
          setIsProcessing(false);
        },
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Sign Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? You can always log back in later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut} disabled={isProcessing}>
            {isProcessing ? "Signing out..." : "Sign Out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
