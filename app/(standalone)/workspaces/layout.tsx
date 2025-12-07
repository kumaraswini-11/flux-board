import Image from "next/image";
import Link from "next/link";

import { AppLogo } from "@/components/app-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-accent/40 h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        {/* Header Navigation */}
        <nav className="flex items-center justify-between">
          <div className="flex justify-between items-center h-[73px]">
            <AppLogo />
          </div>

          {/* TODO: Will implimnet the UserButton */}
          <ThemeToggle />
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
