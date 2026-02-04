"use server";
import { db } from "@/config/db";
import { shortLinkTable } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/auth.queries";
import { desc, eq, and, isNull } from "drizzle-orm"; // Import and & isNull

export const getUserLinks = async ({ limit = 5 }) => {
  const user = await getCurrentUser();
  if (!user) return [];

  return await db
    .select()
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.userId, user.id),
        eq(shortLinkTable.isHidden, false),
        isNull(shortLinkTable.deletedAt),
      ),
    )
    .orderBy(desc(shortLinkTable.createdAt))
    .limit(limit);
};
