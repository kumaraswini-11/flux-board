"use client";

import {
  GalleryVerticalEnd,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

// Workspace navigation configuration
const WORKSPACE_NAV_ITEMS = [
  { 
    title: "Home", 
    url: "", // Root workspace URL
    icon: HomeIcon 
  },
  { 
    title: "My Tasks", 
    url: "/tasks", 
    icon: GalleryVerticalEnd 
  },
  {
    title: "Members",
    url: "/members",
    icon: UsersIcon,
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: SettingsIcon 
  },
] as const;

export function WorkspaceNavItems() {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  // Base workspace path
  const baseHref = `/workspaces/${workspaceId}`;

  /**
   * Determines if a navigation item is active based on current pathname
   * @param itemUrl - The URL segment for the nav item
   */
  const isActive = (itemUrl: string): boolean => {
    // Handle root workspace page
    if (itemUrl === "") {
      return pathname === baseHref;
    }
    // Handle sub-pages
    return pathname.startsWith(`${baseHref}${itemUrl}`);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {WORKSPACE_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const href = `${baseHref}${item.url}` as Route;
            const active = isActive(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={active}
                  className={cn(
                    "h-9 px-3 gap-3 transition-colors",
                    active &&
                      "bg-accent/70 text-accent-foreground font-medium",
                  )}
                >
                  {/* prefetch is automatic in Next.js 15+ */}
                  <Link href={href}> 
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}