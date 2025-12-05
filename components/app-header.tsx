"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "flex h-14 shrink-0 items-center justify-between px-4",
        "border-b border-border/50 bg-background/95",
        "backdrop-blur supports-backdrop-filter:bg-background/60",
      )}
    >
      {/* Left: Sidebar Trigger */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />

        {/* Optional: Breadcrumb or page title placeholder */}
        <div className="hidden sm:block">
          <h1 className="text-sm font-medium text-foreground/80">
            Breadcrumb Comming soon...
          </h1>
        </div>
      </div>

      {/* Right: Theme Toggle + Future Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
