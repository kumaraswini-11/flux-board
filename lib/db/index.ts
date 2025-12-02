import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { env } from "@/lib/env";
import * as schema from "./schema";

/*
  If you skip the `schema` in drizzle(), it will still work, but you’ll lose
  all the TypeScript benefits that make Drizzle great. That means you won’t get
  auto-completion, type inference, or type checking.

  Without the schema, there’s no autocomplete or type checking:

  db.select().from(projects)                // projects is `any`
  db.insert(projects).values({ name: 123 }) // No error! (should be string)
  db.select({ project: projects.name })     // Relations don’t exist → runtime error
*/

// Create the Neon HTTP client (no pooling, perfect for serverless)
const sql = neon(env.DATABASE_URL);

// Export the fully typed Drizzle instance
export const db = drizzle({ client: sql, schema, casing: "snake_case" });
