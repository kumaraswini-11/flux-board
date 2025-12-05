import {
  LucideIcon,
  MoreHorizontalIcon,
  FolderIcon,
  ForwardIcon,
  Trash2Icon,
  PlusIcon,
  FolderGit2Icon,
} from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export interface Project {
  id: string;
  workspace_id: string;
  name: string;
  href: string;
  icon?: LucideIcon | string;
  status?: string;
}

interface NavProjectsProps {
  workspaceId: string;
  projects: Project[];
}

interface ProjectAction {
  label: string;
  icon: LucideIcon;
  onClick: (project: Project) => void;
  destructive?: boolean;
}

// Reusable actions — easy to extend
const PROJECT_ACTIONS: ProjectAction[] = [
  {
    label: "Open Project",
    icon: FolderIcon,
    onClick: (project) => {
      window.open(project.href, "_blank");
      toast.success(`Opened ${project.name}`);
    },
  },
  {
    label: "Share Project",
    icon: ForwardIcon,
    onClick: (project) => {
      navigator.clipboard.writeText(window.location.origin + project.href);
      toast.success(`${project.name} link copied to clipboard!`);
    },
  },
  {
    label: "Delete Project",
    icon: Trash2Icon,
    destructive: true,
    onClick: (project) => {
      if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
        toast.success(`${project.name} deleted`);
        // Add actual delete logic here
      }
    },
  },
];

export function NavProjects({ projects, workspaceId }: NavProjectsProps) {
  const { isMobile } = useSidebar();

  const handleCreateProject = () => {
    toast("Create project", {
      description: "This feature is coming soon!",
      action: { label: "Notify me", onClick: () => {} },
    });
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center justify-between px-0 pl-2">
        <span className="font-medium text-xs tracking-wider">PROJECTS</span>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="size-6 rounded-md hover:bg-primary/10 hover:text-primary transition-all"
          onClick={handleCreateProject}
          aria-label="Create new project"
        >
          <PlusIcon className="size-4" />
        </Button>
      </SidebarGroupLabel>

      <SidebarMenu>
        {!projects || projects.length === 0 ? (
          <SidebarMenuItem>
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <FolderGit2Icon className="size-8 text-muted-foreground/50 mb-2" />
              <span className="text-sm text-muted-foreground">
                No projects yet
              </span>
              <span className="text-xs text-muted-foreground/70 mt-1">
                Create your first project to get started
              </span>
            </div>
          </SidebarMenuItem>
        ) : (
          <>
            {projects.map((project) => (
              <SidebarMenuItem key={project.id}>
                {/* Main project link */}
                <SidebarMenuButton asChild className="group/project">
                  <Link
                    href={project.href as Route}
                    className={cn(
                      "flex items-center gap-2 pr-8 transition-colors",
                      "hover:bg-accent/70 hover:text-accent-foreground"
                    )}
                  >

                     {/* NOTE: I will use emojis, but this is designed to support both emojis and Lucide icons. */}
                    {project.icon ? (
                      typeof project.icon === "string" ? (
                        <span className="shrink-0 text-balance">
                          {project.icon}
                        </span>
                      ) : (
                        <project.icon className="size-4 shrink-0 text-primary/80" />
                      )
                    ) : (
                      <FolderGit2Icon className="size-4 shrink-0 text-primary/80" />
                    )}
                    <span className="truncate text-sm font-medium">
                      {project.name}
                    </span>
                  </Link>
                </SidebarMenuButton>

                {/* Action menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      showOnHover
                      className="opacity-0 group-hover/project:opacity-100 transition-opacity data-[state=open]:opacity-100"
                    >
                      <MoreHorizontalIcon className="size-4" />
                      <span className="sr-only">
                        Project actions for {project.name}
                      </span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                    sideOffset={4}
                    className="w-48 rounded-lg border shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
                      {project.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {PROJECT_ACTIONS.map((action) => (
                      <DropdownMenuItem
                        key={action.label}
                        onClick={(e) => {
                          e.preventDefault();
                          action.onClick(project);
                        }}
                        className={cn(
                          "transition-colors",
                          action.destructive &&
                            "text-destructive focus:text-destructive focus:bg-destructive/10"
                        )}
                      >
                        <action.icon className="size-4" />
                        <span>{action.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}