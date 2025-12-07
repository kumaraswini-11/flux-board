import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { CreateWorkspaceModal } from "@/components/workspace/create-workspace-modal";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1">
        <AppHeader />

        {/* Scrollable Content Area*/}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>

      {/* Open Create Workspace Modal */}
      <Suspense fallback={<div>Workspace Modal Loading...</div>}>
        <CreateWorkspaceModal />
      </Suspense>
    </SidebarProvider>
  );
}
