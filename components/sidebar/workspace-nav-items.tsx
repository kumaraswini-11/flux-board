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

const workspaceNavGroups = [
  {
    title: "Workspace Details",
    items: [
      { title: "Home", url: "/", icon: HomeIcon },
      { title: "My Tasks", url: "/tasks", icon: GalleryVerticalEnd },
      {
        title: "Members",
        icon: UsersIcon,
        url: "/members",
      },
      { title: "Settings", url: "/settings", icon: SettingsIcon },
    ],
  },
];

export function WorkspaceNavItems() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <>
      {workspaceNavGroups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;
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
                      <Link href={item.url as Route} prefetch>
                        <Icon className="size-4 shrink-0" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
