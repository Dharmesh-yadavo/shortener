"use server";
import { db } from "@/config/db";
import { qrCodeTable, shortLinkTable } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/auth.queries";
import { desc, eq, and, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUserLinks = cache(async ({ limit = 5 }) => {
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
});

export const getLinkDetails = cache(async (shortCode: string) => {
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
});

export const getAllQr = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return [];

  return await db
    .select({
      userId: shortLinkTable.userId,
      title: shortLinkTable.title,
      url: shortLinkTable.url,
      shortCode: shortLinkTable.shortCode,
      clicks: shortLinkTable.clicks,
      isActive: shortLinkTable.isActive,
      isHidden: shortLinkTable.isHidden,
      fgColor: qrCodeTable.fgColor,
      bgColor: qrCodeTable.bgColor,
      logoUrl: qrCodeTable.logoUrl,
    })
    .from(shortLinkTable)
    .where(
      and(
        eq(shortLinkTable.userId, user.id),
        isNull(shortLinkTable.deletedAt),
        eq(shortLinkTable.type, "qr"),
      ),
    )
    .innerJoin(qrCodeTable, eq(shortLinkTable.id, qrCodeTable.linkId))
    .orderBy(desc(shortLinkTable.createdAt));
});

export const getQrByShortCode = async (shortCode: string) => {
  const [res] = await db
    .select({
      userId: shortLinkTable.userId,
      linkId: shortLinkTable.id,
      title: shortLinkTable.title,
      url: shortLinkTable.url,
      shortCode: shortLinkTable.shortCode,
      clicks: shortLinkTable.clicks,
      isActive: shortLinkTable.isActive,
      isHidden: shortLinkTable.isHidden,
      createdAt: shortLinkTable.createdAt,
      type: shortLinkTable.type,
      fgColor: qrCodeTable.fgColor,
      bgColor: qrCodeTable.bgColor,
      logoUrl: qrCodeTable.logoUrl,
    })
    .from(shortLinkTable)
    .where(eq(shortLinkTable.shortCode, shortCode))
    .innerJoin(qrCodeTable, eq(shortLinkTable.id, qrCodeTable.linkId));

  return res;
};
