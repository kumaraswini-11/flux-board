import { CreateWorkspaceForm } from "@/components/workspace/create-workspace-form";

// I used (standalone)/workspaces/create/page.tsx instead of (home)/workspaces/create/page.tsx 
// because I don’t want to use the home layout or display the sidebar.
export default function CreateWorkspacePage() {
  return (
    <div className="w-full lg:max-w-full">
      <CreateWorkspaceForm />
    </div>
  );
}
