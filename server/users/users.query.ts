"use server";
import { db } from "@/config/db";
import { shortLinkTable } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/auth.queries";
import { desc, eq, and, isNull } from "drizzle-orm"; // Import and & isNull
import { redirect } from "next/navigation";

export const getUserLinks = async ({ limit = 5 }) => {
  const user = await getCurrentUser();
  if (!user) return [];

  return await db
    .select()
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.userId, user.id),
        isNull(shortLinkTable.deletedAt),
        eq(shortLinkTable.type, "link"),
      ),
    )
    .orderBy(desc(shortLinkTable.createdAt))
    .limit(limit);
};

export const getLinkDetails = async (shortCode: string) => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");

  const [res] = await db
    .select()
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.userId, user.id),
        eq(shortLinkTable.shortCode, shortCode),
        isNull(shortLinkTable.deletedAt),
      ),
    );
  return res;
};
