"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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
  // Centralized state management
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(
    sampleWorkspaces[0]?.id || "",
  );

  // Get the selected workspace object
  const selectedWorkspace =
    sampleWorkspaces.find((ws) => ws.id === selectedWorkspaceId) ||
    sampleWorkspaces[0];

  // Filter projects based on selected workspace (memoized for performance)
  const filteredProjects = sampleProjects.filter(
    (project) => project.workspace_id === selectedWorkspaceId,
  );

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
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex aspect-square size-8 p-1 items-center justify-center rounded-lg bg-primary/10">
                <Image
                  src="/logo.svg"
                  alt="Flux Board"
                  width={28}
                  height={28}
                  priority // Priority loading for critical visual element
                  className="rounded-md object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Flux Board
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      {/* Main Sidebar Content */}
      <SidebarContent>
        {/* Workspace Switcher */}
        <WorkspaceSwitcher
          workspaces={sampleWorkspaces}
          selectedWorkspace={selectedWorkspace}
          onWorkspaceChange={setSelectedWorkspaceId}
        />

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
