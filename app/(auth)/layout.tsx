import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/app-logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-4">
        <AppLogo
          className="self-center font-medium rounded-lg"
          imageClassName="size-9 rounded-xl"
        />

        {/* Form Content Area */}
        {children}
      </div>
    </div>
  );
}
