import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { SQLLogger } from "./logger";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const client = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(client, {
  schema,
  casing: "snake_case",
  logger: new SQLLogger(),
});
