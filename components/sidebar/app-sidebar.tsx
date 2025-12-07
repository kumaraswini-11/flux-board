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

const sampleWorkspaces: Workspace[] = [
  { id: "ws_mkt_001", name: "Acme Inc.", plan: "Pro" },
  { id: "ws_mkt_002", name: "Marketing Hub", plan: "Free" },
  { id: "ws_dev_003", name: "Dev Workspace", plan: "Enterprise" },
  { id: "ws_sales_004", name: "Sales Ops", plan: "Free" },
  { id: "ws_sales_005", name: "Sample WS 5", plan: "Pro" },
];

const sampleProjects: Project[] = [
  {
    id: "prj_001",
    workspace_id: "ws_mkt_001",
    name: "Website Redesign",
    href: "/projects/website",
    status: "active",
  },
  {
    id: "prj_002",
    workspace_id: "ws_mkt_001",
    name: "Social Campaign Q4",
    href: "/projects/social-q4",
    status: "planning",
  },
  {
    id: "prj_003",
    workspace_id: "ws_dev_003",
    name: "Mobile App Backend",
    href: "/projects/mobile-app",
    status: "active",
  },
  {
    id: "prj_004",
    workspace_id: "ws_dev_003",
    name: "API Documentation",
    href: "/projects/api-docs",
    status: "complete",
  },
  {
    id: "prj_005",
    workspace_id: "ws_sales_004",
    name: "Lead Scoring System",
    href: "/projects/lead-scoring",
    status: "active",
  },
  {
    id: "prj_006",
    workspace_id: "ws_mkt_002",
    name: "Sales Campaign Q4",
    href: "/projects/sales-campaign-q4",
    status: "active",
  },
  {
    id: "prj_007",
    workspace_id: "ws_mkt_001",
    name: "Sales Campaign Q5",
    href: "/projects/sales-campaign-q5",
    status: "active",
  },
  {
    id: "prj_008",
    workspace_id: "ws_mkt_002",
    name: "Sales Campaign Q6",
    href: "/projects/sales-campaign-q6",
    status: "active",
  },
  {
    id: "prj_009",
    workspace_id: "ws_sales_005",
    name: "Sales Campaign Q7",
    href: "/projects/sales-campaign-q7",
    status: "active",
  },
  {
    id: "prj_010",
    workspace_id: "ws_mkt_002",
    name: "Sales Campaign Q8",
    href: "/projects/sales-campaign-q8",
    status: "active",
  },
  {
    id: "prj_011",
    workspace_id: "ws_sales_005",
    name: "Sales Campaign Q9",
    href: "/projects/sales-campaign-q9",
    status: "active",
  },
  {
    id: "prj_012",
    workspace_id: "ws_sales_004",
    name: "Sales Campaign Q10",
    href: "/projects/sales-campaign-q10",
    status: "active",
  },
];

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
