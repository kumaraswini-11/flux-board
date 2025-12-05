import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-5">
        {/* Brand / Logo Section */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 self-center font-medium",
            "transition-opacity hover:opacity-90 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md",
          )}
        >
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary-foreground">
            <Image
              src="/logo.svg"
              alt="Fluxboard"
              width={24}
              height={24}
              className="size-6"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Fluxboard
          </span>
        </Link>

        {/* Form Content Area */}
        {children}
      </div>
    </div>
  );
}
