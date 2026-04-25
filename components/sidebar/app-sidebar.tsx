"use client";

import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AppLogo } from "@/components/app-logo";

import { WorkspaceSwitcher, Workspace } from "./workspace-switcher";
import { WorkspaceNavItems } from "./workspace-nav-items";
import { NavProjects, Project } from "./nav-projects";
import { NavUser } from "./nav-user";
import { sampleProjects, sampleWorkspaces } from "@/lib/sample-data";

export function AppSidebar() {
  const router = useRouter();
  // const pathname = usePathname(); 
  const workspaceId = useWorkspaceId();

  // Fallback to first workspace if no URL param
  const selectedWorkspaceId = workspaceId || sampleWorkspaces[0]?.id;

  // Get the selected workspace object
  const selectedWorkspace =
    sampleWorkspaces.find((ws) => ws.id === selectedWorkspaceId) ||
    sampleWorkspaces[0];

  // Filter projects based on selected workspace (memoized for performance)
  const filteredProjects = sampleProjects.filter(
    (project) => project.workspace_id === selectedWorkspaceId,
  );

  const handleWorkspaceChange = (newWorkspaceId: string) => {
    // Navigate to the workspace route
    router.push(`/workspaces/${newWorkspaceId}` as Route);
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header – Logo + Brand */}
      <SidebarHeader className={cn("h-14", "border-b border-border/50")}>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            size="lg"
            className="h-11 hover:bg-accent/70 transition-colors"
          >
            <AppLogo />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      {/* Main Sidebar Content */}
      <SidebarContent>
        {/* Workspace Switcher */}
        <Suspense fallback={<div>Loading...</div>}>
        <WorkspaceSwitcher
          workspaces={sampleWorkspaces}
          selectedWorkspace={selectedWorkspace}
          onWorkspaceChange={handleWorkspaceChange}
        />
        </Suspense>

        {/* Primary Navigation (Dashboard, Projects, etc.) */}
        <WorkspaceNavItems />

        {/* Projects Section */}
        <NavProjects
          projects={filteredProjects}
          workspaceId={selectedWorkspaceId}
        />
      </SidebarContent>

      {/* Footer – User Profile */}
      <SidebarFooter className="border-t border-border/50">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
