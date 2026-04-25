"use server";

import { requireAuth } from "@/lib/auth-utils";
import { getAllWorkspacesByUserId } from "@/lib/db/queries";

export async function getWorkspacesAction() {
  try {
    const session = await requireAuth();
    return await getAllWorkspacesByUserId(session.user.id);
  } catch (error) {
    console.log(error);
    return [];
  }
}