import { betterAuth, logger } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";

import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {},
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const user = await db.query.user.findFirst({
            where: (table, { eq }) => eq(table.id, Number(session.userId)),
            columns: {
              deletedAt: true,
            },
          });

          if (user?.deletedAt) {
            logger.error("User is deleted");
            throw new APIError("UNAUTHORIZED", {
              message: "Invalid email or password",
              code: "INVALID_EMAIL_OR_PASSWORD",
            });
          }

          return {
            data: session,
          };
        },
      },
    },
  },
});
