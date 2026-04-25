import { JoinWorkspaceForm } from "@/components/workspace/join-workspace-form";
import { requireAuth } from "@/lib/auth-utils";
import { sampleWorkspaces } from "@/lib/sample-data";

// any one can visit this page
export default async function WorkspaceIdJoinPage({
    params,
}: {
    params: Promise<{ workspaceId: string; inviteCode: string }>;
}) {
    const { workspaceId, inviteCode } = await params;
    // await requireAuth();

    // get the workspase name fofrm the db by workspaceId
    // const initialValues = await getWorkspaceById(workspaceId);
    const initialValues = sampleWorkspaces.find((ws) => ws.id === workspaceId);

    return (
        <div className="w-full">
            <JoinWorkspaceForm initialValues={initialValues} />
            
        </div>
    );
}