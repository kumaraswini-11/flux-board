import {
  CheckIcon,
  ChevronsUpDownIcon,
  GalleryVerticalEndIcon,
  LucideIcon,
  PlusIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export interface Workspace {
  id: string;
  name: string;
  icon?: LucideIcon | string;
  plan: string;
}

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  selectedWorkspace: Workspace;
  onWorkspaceChange: (workspaceId: string) => void;
}

export function WorkspaceSwitcher({
  workspaces,
  selectedWorkspace,
  onWorkspaceChange,
}: WorkspaceSwitcherProps) {
  const handleCreateWorkspace = () => {
    toast("Create workspace", {
      description: "This feature is coming soon!",
    });
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center justify-between px-0 pl-2">
        <span className="text-xs font-medium tracking-wider text-muted-foreground">
          WORKSPACE
        </span>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="size-6 rounded-md hover:bg-primary/10 hover:text-primary transition-all"
          onClick={handleCreateWorkspace}
          aria-label="Create new workspace"
        >
          <PlusIcon className="size-4" />
        </Button>
      </SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className={cn(
                  "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                  "hover:bg-sidebar-accent/50 transition-colors",
                )}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GalleryVerticalEndIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {selectedWorkspace.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {selectedWorkspace.plan}
                  </span>
                </div>
                <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-70" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-60"
              align="start"
              sideOffset={4}
            >
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onSelect={() => onWorkspaceChange(workspace.id)}
                  className="cursor-pointer gap-2"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary/10">
                    <GalleryVerticalEndIcon className="size-4 text-primary" />
                  </div>
                  <div className="grid flex-1">
                    <span className="font-medium">{workspace.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {workspace.plan}
                    </span>
                  </div>
                  {workspace.id === selectedWorkspace.id && (
                    <CheckIcon className="ml-auto size-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
