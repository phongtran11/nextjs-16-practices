"use server";

import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

import { and, desc, eq, ilike, isNull, or } from "drizzle-orm";

import { auth } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { session, user } from "@/lib/server/db/schema";

import { createUserSchema, updateUserSchema } from "./schema";

export async function getUsersAction(
  page: number = 1,
  pageSize: number = 10,
  search: string = "",
  showDeleted: boolean = false
) {
  const offset = (page - 1) * pageSize;

  const whereCondition = and(
    // Filter by search term
    search
      ? or(ilike(user.name, `%${search}%`), ilike(user.email, `%${search}%`))
      : undefined,
    // Filter by deleted status
    showDeleted ? undefined : isNull(user.deletedAt)
  );

  const [data, total] = await Promise.all([
    db.query.user.findMany({
      where: whereCondition,
      limit: pageSize,
      offset: offset,
      orderBy: [desc(user.createdAt)],
    }),
    db.$count(user, whereCondition),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function createUserAction(formData: FormData) {
  const t = await getTranslations("Users.Errors");
  const rawData = Object.fromEntries(formData.entries());

  const validated = createUserSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: t("INVALID_DATA") };
  }

  try {
    const { name, email, password } = validated.data;

    // Check if email exists (even soft deleted)
    const existing = await db.query.user.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (existing) {
      return { error: t("EMAIL_EXISTS") };
    }

    // Create using Better Auth API to handle password hashing properly
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    revalidatePath("/[locale]/admin/users", "page");
    return { success: true };
  } catch {
    return { error: t("CREATE_FAILED") };
  }
}

export async function updateUserAction(formData: FormData) {
  const t = await getTranslations("Users.Errors");
  // Handling FormData with ID might need numeric conversion
  const rawData = {
    id: Number(formData.get("id")),
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const validated = updateUserSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: t("INVALID_DATA") };
  }

  try {
    await db
      .update(user)
      .set({
        name: validated.data.name,
        email: validated.data.email,
        updatedAt: new Date(),
      })
      .where(eq(user.id, validated.data.id));

    revalidatePath("/[locale]/admin/users", "page");
    return { success: true };
  } catch {
    return { error: t("UPDATE_FAILED") };
  }
}

export async function deleteUserAction(userId: number) {
  const t = await getTranslations("Users.Errors");
  try {
    await db.transaction(async (ctx) => {
      await ctx
        .update(user)
        .set({ deletedAt: new Date() })
        .where(eq(user.id, userId));

      await ctx.delete(session).where(eq(session.userId, userId));
    });

    revalidatePath("/[locale]/admin/users", "page");
    return { success: true };
  } catch {
    return { error: t("DELETE_FAILED") };
  }
}

export async function restoreUserAction(userId: number) {
  const t = await getTranslations("Users.Errors");
  try {
    await db.update(user).set({ deletedAt: null }).where(eq(user.id, userId));

    revalidatePath("/[locale]/admin/users", "page");
    return { success: true };
  } catch {
    return { error: t("RESTORE_FAILED") };
  }
}
