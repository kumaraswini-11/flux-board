import { redirect } from "next/navigation";

import { EditWorkspaceForm } from "@/components/workspace/edit-workspace-form";
import { requireAuth } from "@/lib/auth-utils";
import { getWorkspaceById } from "@/lib/db/queries";
import { sampleWorkspaces } from "@/lib/sample-data";
import { Card } from "@/components/ui/card";

export default async function WorkspaceIdSettingsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  await requireAuth();
 const { workspaceId } = await params;

//  const initialValues = await getWorkspaceById(workspaceId);
//  if(!initialValues) {
//     redirect(`/workspaces/${workspaceId}`)
//  }

// NOTE: JUST FOR NOE USE SMAPLE DATA
  const initialValues = sampleWorkspaces.find((ws) => ws.id === workspaceId);
  if(!initialValues) {
      redirect(`/workspaces/${workspaceId}`)
  }

  return (
    <div className="w-xl">
      <EditWorkspaceForm  
        initialValues={initialValues}
      />
    </div>
  );
}


