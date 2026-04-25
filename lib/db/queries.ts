"use server";

import { InferInsertModel, InferSelectModel, desc, eq } from "drizzle-orm";
import { randomUUID } from "crypto";

import { workspace, project } from "@/lib/db/schema";
import { db } from "@/lib/db";

// Types for better type safety
export type NewWorkspace = InferInsertModel<typeof workspace>;
export type Workspace = InferSelectModel<typeof workspace>;
export type Project = InferSelectModel<typeof project>;

/**
 * Creates a new workspace in the database.
 * @param data The workspace data (name, plan, imageUrl, userId).
 * @returns The created workspace object.
 */
export async function createWorkspace(
  data: Omit<NewWorkspace, "id" | "createdAt" | "updatedAt">,
): Promise<Workspace> {
  const [newWorkspace] = await db
    .insert(workspace)
    .values({
      ...data,
      id: randomUUID(),
    })
    .returning();

  return newWorkspace;
}

/**
 * Retrieves all workspaces owned by a specific user ID.
 * @param userId The ID of the user to retrieve workspaces for.
 * @returns An array of workspace objects or an empty array if none found.
 */
export async function getAllWorkspacesByUserId(
  userId: string,
): Promise<Workspace[]> {
  const result = await db
    .select()
    .from(workspace)
    .where(eq(workspace.userId, userId))
    .orderBy(desc(workspace.updatedAt));

  return result;
}

/**
 * Retrieves a single workspace by its ID.
 * @param workspaceId The ID of the workspace to retrieve.
 * @returns The workspace object or null if not found.
 */
export async function getWorkspaceById(
  workspaceId: string,
): Promise<Workspace | null> {
  const result = await db
    .select()
    .from(workspace)
    .where(eq(workspace.id, workspaceId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Updates an existing workspace by its ID.
 * @param workspaceId The ID of the workspace to update.
 * @param data The fields to update (e.g., name or plan).
 * @returns The updated workspace object or null if the ID was not found.
 */
export async function updateWorkspace(
  workspaceId: string,
  data: Partial<
    Omit<NewWorkspace, "id" | "userId" | "createdAt" | "updatedAt">
  >,
): Promise<Workspace | null> {
  // Drizzle automatically updates `updatedAt` because of your schema definition ($onUpdate)
  const [updatedWorkspace] = await db
    .update(workspace)
    .set(data)
    .where(eq(workspace.id, workspaceId))
    .returning();

  return updatedWorkspace || null;
}

/**
 * Deletes a workspace by its ID.
 * @param workspaceId The ID of the workspace to delete.
 * @returns The deleted workspace object or null if not found.
 */
export async function deleteWorkspace(
  workspaceId: string,
): Promise<Workspace | null> {
  const [deletedWorkspace] = await db
    .delete(workspace)
    .where(eq(workspace.id, workspaceId))
    .returning();

  // Note: Due to `onDelete: "cascade"` in the `member` table definition,
  // all associated member records will also be automatically deleted by the database.
  return deletedWorkspace;
}

export async function getProjectsByWorkspaceId(
  workspaceId: string,
): Promise<Project[]> {
  const result = await db
    .select()
    .from(project)
    .where(eq(project.workspaceId, workspaceId))
    .orderBy(desc(project.updatedAt));

  return result;
}