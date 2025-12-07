import { and, desc, eq } from "drizzle-orm";
// import { cache } from "react";

import { db } from "@/lib/db";
import { workspace } from "@/lib/db/schema";

/**
 * 'cache' lets you cache the result of a data fetch or computation.
 * 'cache' is only for use with React Server Components.
 * cache(fn) returns a memoized version of fn: when you call the returned function with the same arguments as a previous call, it returns the previously stored result instead of recomputing.
 *
 * DOUTE:
 * - I m not sure 'cache' will happenn automaticcaly through 'react compiler' or not, like useMemo,useCallback.
 * - Now on Next.js 16, "use cache" directive is present. So here withc one is better to use?
 */

// Fetches workspaces for a given user ID, sorted by most recently updated (descending).
export async function getWorkspacesByUserId(userId: string) {
  const workspaces = await db
    .select()
    .from(workspace)
    .where(eq(workspace.userId, userId))
    .orderBy(desc(workspace.updatedAt));
  return workspaces;
}

// Deletes a workspace by ID, but only if it belongs to the specified user.
export async function deleteWorkspace(workspaceId: string, userId: string) {
  const deletedWorkspace = await db
    .delete(workspace)
    .where(and(eq(workspace.id, workspaceId), eq(workspace.userId, userId)))
    .returning({ name: workspace.name });
  return deletedWorkspace;
}
