import {
  bigint,
  bigserial,
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: bigserial({ mode: "number" }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: boolean().notNull().default(false),
  image: text(),
  createdAt: timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  deletedAt: timestamp({ mode: "date", withTimezone: true }),
});

export const session = pgTable(
  "session",
  {
    id: bigserial({ mode: "number" }).primaryKey(),
    expiresAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp({ mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    ipAddress: text(),
    userAgent: text(),
    userId: bigint({ mode: "number" })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_expires_at_idx").on(table.expiresAt),
  ]
);

export const account = pgTable(
  "account",
  {
    id: bigserial({ mode: "number" }).primaryKey(),
    accountId: varchar({ length: 255 }).notNull(),
    providerId: varchar({ length: 255 }).notNull(),
    userId: bigint({ mode: "number" })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ mode: "date", withTimezone: true }),
    refreshTokenExpiresAt: timestamp({ mode: "date", withTimezone: true }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("account_user_id_idx").on(table.userId)]
);

export const verification = pgTable("verification", {
  id: bigserial({ mode: "number" }).primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
  createdAt: timestamp({ mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ mode: "date", withTimezone: true }).defaultNow(),
});
