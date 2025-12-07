export default async function WorkspaceIdPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  return (
    <div className="p-6">
      <h1>Workspace ID: {workspaceId}</h1>
      {/* Your workspace content */}
    </div>
  );
}
