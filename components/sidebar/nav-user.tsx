import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDown,
  CreditCardIcon,
  LogOutIcon,
  SparklesIcon,
} from "lucide-react";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { FALLBACK_IMAGE } from "@/lib/constants";

import { SignOutAlertDialog } from "./signout-dialog";

// Define menu items and action handlers
interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  isPro?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Upgrade to Pro",
    icon: SparklesIcon,
    isPro: true,
    onClick: () => {
      toast.info("Upgrade feature coming soon!", {
        description: "Stay tuned!",
      });
    },
  },
  {
    label: "Account",
    icon: BadgeCheckIcon,
    href: "/account",
  },
  {
    label: "Billing",
    icon: CreditCardIcon,
    href: "/billing",
  },
  {
    label: "Notifications",
    icon: BellIcon,
    href: "/notifications",
  },
];

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);

  // Fetch user details using better-auth
  // const { data: session, isPending } = authClient.useSession();
  // const user = session?.user;
  const user = {
    name: "SitaRam",
    email: "sitaram@purna.com",
    image: FALLBACK_IMAGE,
  };

  const userInitials = user?.name
    ? user.name
        .split(" ") // Split the full name into parts (e.g., "John Doe" → ["John", "Doe"])
        .map((n) => n[0]) // Take the first character of each part (["J", "D"])
        .join("") // Join them together ("JD")
        .toUpperCase() // Convert to uppercase ("JD")
        .slice(0, 2) // Limit to first 2 characters ("JD")
    : "NA"; // If no name, default to "NA"

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors"
                aria-label="User menu"
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage
                    src={user?.image || FALLBACK_IMAGE}
                    alt={user?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>

                <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-70" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "top" : "right"}
              align="end"
            >
              {/* User Info Header */}
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage
                      src={user?.image || FALLBACK_IMAGE}
                      alt={user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Main Menu Items */}
              <DropdownMenuGroup>
                {MENU_ITEMS.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    className={cn(
                      "cursor-pointer transition-colors",
                      item.isPro && "text-primary font-medium",
                    )}
                    onClick={(e) => {
                      if (item.href) {
                        e.preventDefault();
                        router.push(item.href as Route);
                      }
                      item.onClick?.();
                    }}
                  >
                    <item.icon className="mr-1 size-4" />
                    <span>{item.label}</span>
                    {item.isPro && (
                      <Badge className="ml-auto text-xs bg-primary/10 text-primary">
                        Pro
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Sign Out */}
              <DropdownMenuItem
                onClick={() => setIsSignOutDialogOpen(true)}
                className="text-destructive focus:text-destructive focus:bg-destructive/15 cursor-pointer"
              >
                <LogOutIcon className="mr-1 size-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* SignOut Alert Dialog */}
      <SignOutAlertDialog
        open={isSignOutDialogOpen}
        onOpenChange={setIsSignOutDialogOpen}
      />
    </>
  );
}
